import { CalendarRange } from '@/components/calendarRange/CalendarRange';
import { useState, useEffect, useRef, FC } from 'react';
import { DateRange } from 'react-day-picker';
import {
  startOfWeek,
  endOfWeek,
  startOfDay,
  isSameDay,
  format,
} from 'date-fns';
import { ru } from 'date-fns/locale';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface CouriersTimeFilterProps {
  onDateRangeChange: (dateRange: DateRange) => void;
}

export const CouriersTimeFilter: FC<CouriersTimeFilterProps> = ({
  onDateRangeChange,
}) => {
  const [activeButton, setActiveButton] = useState<'day' | 'week'>('week');
  const [showCalendar, setShowCalendar] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapperRef, () => setShowCalendar(false), showCalendar);

  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const today = new Date();
    return {
      from: startOfWeek(today, { weekStartsOn: 1 }),
      to: endOfWeek(today, { weekStartsOn: 1 }),
    };
  });

  useEffect(() => {
    onDateRangeChange(dateRange);
  }, [dateRange]);

  const handleDayClick = () => {
    if (activeButton === 'day') {
      setShowCalendar(true);
    } else {
      const today = new Date();
      const newDateRange: DateRange = {
        from: startOfDay(today),
        to: undefined,
      };
      setActiveButton('day');
      setShowCalendar(false);
      setDateRange(newDateRange);
      onDateRangeChange(newDateRange);
    }
  };

  const handleWeekClick = () => {
    if (activeButton === 'week') {
      setShowCalendar(true);
    } else {
      const today = new Date();
      const weekStart = startOfWeek(today, { weekStartsOn: 1 });
      const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
      const newDateRange: DateRange = { from: weekStart, to: weekEnd };
      setActiveButton('week');
      setShowCalendar(false);
      setDateRange(newDateRange);
      onDateRangeChange(newDateRange);
    }
  };

  const handleCalendarChange = (newDateRange: DateRange | undefined) => {
    const updatedDateRange = newDateRange || dateRange;
    setDateRange(updatedDateRange);
    onDateRangeChange(updatedDateRange);
    if (updatedDateRange?.from) {
      if (
        !updatedDateRange.to ||
        isSameDay(updatedDateRange.from, updatedDateRange.to)
      ) {
        setActiveButton('day');
      } else {
        setActiveButton('week');
      }
    }
  };

  const dayLabel = (() => {
    if (activeButton !== 'day') {
      return 'День' as const;
    }
    const isSingle =
      dateRange.from &&
      (!dateRange.to || isSameDay(dateRange.from, dateRange.to));
    if (!isSingle) {
      return 'День' as const;
    }
    const singleDate = dateRange.from;
    const today = new Date();
    const todayStart = startOfDay(today);
    if (singleDate && isSameDay(singleDate, todayStart)) {
      return 'День' as const;
    } else if (singleDate) {
      const formatted = format(singleDate, 'dd MMM', { locale: ru });
      return { type: 'custom' as const, text: formatted, mode: 'day' as const };
    }
    return 'День' as const;
  })();

  const weekLabel = (() => {
    if (activeButton !== 'week') {
      return 'Неделя' as const;
    }
    if (
      !dateRange.from ||
      !dateRange.to ||
      isSameDay(dateRange.from, dateRange.to)
    ) {
      return 'Неделя' as const;
    }
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
    if (
      dateRange.from &&
      dateRange.to &&
      isSameDay(dateRange.from, weekStart) &&
      isSameDay(dateRange.to, weekEnd)
    ) {
      return 'Неделя' as const;
    } else if (dateRange.from && dateRange.to) {
      const fromFormatted = format(dateRange.from, 'dd MMM', { locale: ru });
      const toFormatted = format(dateRange.to, 'dd MMM', { locale: ru });
      const formatted = `${fromFormatted} - ${toFormatted}`;
      return {
        type: 'custom' as const,
        text: formatted,
        mode: 'week' as const,
      };
    }
    return 'Неделя' as const;
  })();

  const renderButtonContent = (
    label: string | { type: 'custom'; text: string; mode: 'day' | 'week' },
  ) => {
    if (typeof label === 'string') {
      return label;
    }
    const { text, mode } = label;
    const handleReset = () => {
      const today = new Date();
      if (mode === 'day') {
        setDateRange({ from: startOfDay(today), to: undefined });
      } else {
        setDateRange({
          from: startOfWeek(today, { weekStartsOn: 1 }),
          to: endOfWeek(today, { weekStartsOn: 1 }),
        });
      }
      setShowCalendar(false);
    };
    return (
      <>
        <span
          onClick={(e) => {
            e.stopPropagation();
            setShowCalendar(true);
          }}
          className="cursor-pointer"
        >
          {text}
        </span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            handleReset();
          }}
          className="cursor-pointer ml-1"
        >
          ×
        </span>
      </>
    );
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="flex gap-[15px]">
        <button
          className={`px-2.5 py-2 rounded-[10px] text-[20px] font-medium cursor-pointer flex items-center ${
            activeButton === 'week'
              ? 'bg-[#E8E8E8] text-black border border-[#E8E8E8]'
              : 'bg-[#292929] text-white border border-[#393939]'
          }`}
          onClick={handleWeekClick}
        >
          {renderButtonContent(weekLabel)}
        </button>
        <button
          className={`px-2.5 py-2 rounded-[10px] text-[20px] font-medium cursor-pointer flex items-center ${
            activeButton === 'day'
              ? 'bg-[#E8E8E8] text-black border border-[#E8E8E8]'
              : 'bg-[#292929] text-white border border-[#393939]'
          }`}
          onClick={handleDayClick}
        >
          {renderButtonContent(dayLabel)}
        </button>
      </div>
      {showCalendar && (
        <CalendarRange
          classname="absolute z-10 right-28 top-11"
          onDateRangeChange={handleCalendarChange}
          initialDateRange={dateRange}
        />
      )}
    </div>
  );
};
