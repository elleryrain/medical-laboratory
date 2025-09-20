import React, { useState, useEffect } from 'react';
import { useInWorkCardStore } from '@/store/InWorkCardStore';
import ArrowLeft from '@svg/ArrowLeftNoTail.svg?react';

// Тип для данных по дню
interface DayData {
  totalOrders: number;
  completedOrders: number;
  earnings: number;
}

// Тип для пропсов компонента
interface WeeklyProgressProps {
  techniqueId: number; // ID техника для фильтрации
}

// Тип для даты или диапазона дат (для режима месяца)
interface DateRange {
  start: Date;
  end: Date;
}

const WeeklyProgress = ({ techniqueId }: WeeklyProgressProps) => {
  // Состояние с типами
  const [currentDate, setCurrentDate] = useState<Date>(new Date('2025-07-07'));
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const { cards } = useInWorkCardStore();

  // Получаем начало недели (понедельник)
  const getWeekStart = (date: Date): Date => {
    const start = new Date(date);
    const day =
      start.getDate() - start.getDay() + (start.getDay() === 0 ? -6 : 1);
    start.setDate(day);
    start.setHours(0, 0, 0, 0);
    return start;
  };

  // Получаем даты для текущего периода (неделя или месяц)
  const getPeriodDates = (): (Date | DateRange)[] => {
    const dates: (Date | DateRange)[] = [];
    const start = new Date(currentDate);
    if (viewMode === 'week') {
      start.setDate(
        start.getDate() - start.getDay() + (start.getDay() === 0 ? -6 : 1),
      );
      for (let i = 0; i < 7; i++) {
        const date = new Date(start);
        date.setDate(start.getDate() + i);
        dates.push(date);
      }
    } else {
      const firstDay = new Date(start.getFullYear(), start.getMonth(), 1);
      const lastDay = new Date(start.getFullYear(), start.getMonth() + 1, 0);
      let current = new Date(firstDay);
      while (current <= lastDay) {
        const weekStart = new Date(current);
        weekStart.setDate(
          current.getDate() -
            current.getDay() +
            (current.getDay() === 0 ? -6 : 1),
        );
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        if (weekEnd > lastDay) weekEnd.setDate(lastDay.getDate());
        dates.push({ start: new Date(weekStart), end: new Date(weekEnd) });
        current.setDate(current.getDate() + 7);
      }
    }
    return dates;
  };

  const periodDates = getPeriodDates();

  // Навигация по периодам
  const navigate = (direction: 'prev' | 'next'): void => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (viewMode === 'week') {
        newDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
      } else {
        newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      }
      return newDate;
    });
  };

  // Агрегация данных по дням
  const getDayData = (dateOrRange: Date | DateRange): DayData => {
    if ('start' in dateOrRange) {
      const startStr = dateOrRange.start
        .toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        .split('.')
        .reverse()
        .join('.');
      const endStr = dateOrRange.end
        .toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        .split('.')
        .reverse()
        .join('.');
      const weekCards = cards.filter(
        (card: { techniqueId: number; date: string }) =>
          card.techniqueId === techniqueId &&
          card.date >= startStr &&
          card.date <= endStr,
      );
      return {
        totalOrders: weekCards.length,
        completedOrders: weekCards.filter(
          (card: { workStatus: string }) => card.workStatus === 'Завершено',
        ).length,
        earnings: weekCards.reduce(
          (sum: number, card: { numberCard: number }) =>
            sum + (card.numberCard * 100 || 0),
          0,
        ),
      };
    } else {
      const dateStr = dateOrRange
        .toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        })
        .split('.')
        .reverse()
        .join('.');
      const dayCards = cards.filter(
        (card: { date: string; techniqueId: number }) =>
          card.date === dateStr && card.techniqueId === techniqueId,
      );
      return {
        totalOrders: dayCards.length,
        completedOrders: dayCards.filter(
          (card: { workStatus: string }) => card.workStatus === 'Завершено',
        ).length,
        earnings: dayCards.reduce(
          (sum: number, card: { numberCard: number }) =>
            sum + (card.numberCard * 100 || 0),
          0,
        ),
      };
    }
  };

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  // Обработчик движения мыши для обновления позиции подсказки
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
    // Сбрасываем таймаут при движении, чтобы не показывать подсказку
    setShowTooltip(false);
  };

  // Показываем подсказку после задержки, если курсор остановился
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (hoveredIndex !== null) {
      timer = setTimeout(() => {
        setShowTooltip(true);
      }, 300); // Задержка 300ms
    } else {
      setShowTooltip(false);
    }
    return () => clearTimeout(timer); // Очищаем таймаут при уходе курсора
  }, [hoveredIndex, tooltipPosition]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU');
  };

  return (
    <div className="bg-transparent p-4 rounded-lg text-white">
      <div className="flex w-full justify-between items-center">
        <div className="flex items-start gap-5">
          <button
            onClick={() => setViewMode('week')}
            className={`cursor-pointer text-[20px] font-normal bg-transparent 
            ${viewMode === 'week' ? "text-white after:content-[''] after:block after:border after:border-white after:mt-1" : 'text-[#B5B5B5]'} hover:text-white transition-colors`}
          >
            Неделя
          </button>
          <button
            onClick={() => setViewMode('month')}
            className={`cursor-pointer text-[20px] font-normal bg-transparent
            ${viewMode === 'month' ? "text-white after:content-[''] after:block after:border after:border-white after:mt-1" : 'text-[#B5B5B5]'} hover:text-white transition-colors`}
          >
            Месяц
          </button>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('prev')}
            className="rounded-full border-2 border-[#616161] flex items-center justify-center cursor-pointer"
          >
            <ArrowLeft className="h-[34px] w-[34px] pr-0.5" />
          </button>
          <button
            onClick={() => navigate('next')}
            className="rounded-full border-2 border-[#616161] flex items-center justify-center cursor-pointer"
          >
            <ArrowLeft className="rotate-180 h-[34px] w-[34px] pr-0.5" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-[45px]">
        <div className="relative h-[190px] flex flex-col justify-end">
          <div className="flex justify-between h-[130px]">
            {periodDates.map((date, index) => {
              const dayData = getDayData(date);
              const completionPercentage =
                dayData.totalOrders > 0
                  ? (dayData.completedOrders / dayData.totalOrders) * 100
                  : 0;
              const barHeight = Math.min(
                (completionPercentage / 100) * 122,
                122,
              );

              let barClass = 'bg-gradient-to-b from-[#732A35] to-[#732A35/0]';
              let barClassStatic = 'bg-[#ED4C66]';

              if (dayData.totalOrders === 0) {
                barClass = 'bg-gradient-to-b from-[#323232] to-[#323232/0]';
                barClassStatic = 'bg-[#424242]';
              } else {
                if (completionPercentage >= 70) {
                  barClass = 'bg-gradient-to-b from-[#366B4A] to-[#366B4A/0]';
                  barClassStatic = 'bg-[#65D691]';
                } else if (completionPercentage > 30) {
                  barClass = 'bg-gradient-to-b from-[#915442] to-[#915442/0]';
                  barClassStatic = 'bg-[#FD9474]';
                }
              }

              // Извлекаем цвет из barClassStatic для текста
              const getColorFromClass = (className: string) => {
                const colorMatch = className.match(/#([0-9A-Fa-f]{6})/);
                return colorMatch ? `#${colorMatch[1]}` : '#FFFFFF'; // Значение по умолчанию белый, если цвет не найден
              };
              const textColor = getColorFromClass(barClassStatic);

              return (
                <div
                  key={index}
                  className="flex-1 relative"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onMouseMove={handleMouseMove}
                >
                  <div className="relative w-full h-full">
                    <div
                      className={`absolute bottom-6 w-full min-h-6 ${barClass} transition-all duration-300`}
                      style={{ height: `${barHeight}px` }}
                    >
                      <div className="absolute top-[-36px] w-full flex flex-col items-center gap-1">
                        <span
                          className="transform text-xl font-normal"
                          style={{ top: `-${4 + 12}px` }}
                        >
                          {dayData.completedOrders}
                        </span>
                        <div className={`${barClassStatic} h-2 w-full`}></div>
                      </div>
                    </div>
                  </div>
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-base font-medium text-[#B5B5B5] text-nowrap">
                    {viewMode === 'week'
                      ? (date as Date)
                          .toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'short',
                          })
                          .replace('.', '')
                      : `${(date as DateRange).start.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }).replace('.', '')} - ${(date as DateRange).end.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }).replace('.', '')}`}
                  </span>
                  {hoveredIndex === index && showTooltip && (
                    <span
                      className="fixed bg-[#292929] text-white text-base font-normal px-[15px] py-[11px] rounded-[15px] z-10"
                      style={{
                        top: `${tooltipPosition.y - 110}px`,
                        left: `${tooltipPosition.x - 75}px`,
                        transform: 'translateX(-50%)',
                      }}
                    >
                      <div className="flex flex-col gap-2 text-base font-normal w-[230px]">
                        <div className="flex justify-between">
                          <span>Работ выполнено</span>
                          <span>{dayData.completedOrders}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>План</span>
                          <div>
                            <span style={{ color: textColor }}>
                              {dayData.completedOrders}
                            </span>
                            <span>/</span>
                            <span className="text-[#B5B5B5]">
                              {dayData.totalOrders}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span>Заработано</span>
                          <span className="text-base font-medium">
                            {formatNumber(dayData.earnings)} ₽
                          </span>
                        </div>
                      </div>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-6 text-xl font-normal">
          <span className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#65D691] inline-block"></span>{' '}
            План выполнен
          </span>
          <span className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#FD9474] inline-block"></span>{' '}
            Частично выполнен
          </span>
          <span className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#ED4C66] inline-block"></span>{' '}
            Не выполнен
          </span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyProgress;
