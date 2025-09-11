import { CalendarRange } from '@/components/calendarRange/CalendarRange';
import { useState, useEffect, useRef, FC } from 'react';
import { DateRange } from 'react-day-picker';
import { startOfWeek, endOfWeek, startOfDay } from 'date-fns';
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
      setShowCalendar(!showCalendar);
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
      setShowCalendar(!showCalendar);
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
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="flex gap-[15px]">
        <button
          className={`px-2.5 py-2 rounded-[10px] text-[20px] font-medium cursor-pointer ${
            activeButton === 'week'
              ? 'bg-[#E8E8E8] text-black border border-[#E8E8E8]'
              : 'bg-[#292929] text-white border border-[#393939]'
          }`}
          onClick={handleWeekClick}
        >
          Неделя
        </button>
        <button
          className={`px-2.5 py-2 rounded-[10px] text-[20px] font-medium cursor-pointer ${
            activeButton === 'day'
              ? 'bg-[#E8E8E8] text-black border border-[#E8E8E8]'
              : 'bg-[#292929] text-white border border-[#393939]'
          }`}
          onClick={handleDayClick}
        >
          День
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
