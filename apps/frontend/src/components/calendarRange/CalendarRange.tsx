import { FC, useEffect, useState } from 'react';
import { type DateRange } from 'react-day-picker';
import { Calendar } from '@/components/ui/calendar';
import { ru } from 'date-fns/locale';

interface ICalendarRangeProps {
  classname?: string;
  onDateRangeChange: (dateRange: DateRange | undefined) => void;
  initialDateRange?: DateRange | undefined;
}

export const CalendarRange: FC<ICalendarRangeProps> = ({
  classname,
  onDateRangeChange,
  initialDateRange,
}) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    initialDateRange,
  );

  useEffect(() => {
    onDateRangeChange(dateRange);
  }, [dateRange, onDateRangeChange]);

  return (
    <div className={`flex min-w-0 flex-col gap-2 ${classname}`}>
      <Calendar
        mode="range"
        defaultMonth={dateRange?.from}
        selected={dateRange}
        onSelect={setDateRange}
        numberOfMonths={1}
        min={1}
        weekStartsOn={1}
        locale={ru}
        className="rounded-lg border shadow-sm"
      />
    </div>
  );
};
