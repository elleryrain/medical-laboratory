import * as React from "react"
import { FC } from "react"
import { type DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"

interface ICalendarRangeProps {
    classname?: string
}

export const CalendarRange:FC<ICalendarRangeProps> = ({classname}) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 5, 26),
  })

  return (
    <div className={`flex min-w-0 flex-col gap-2 ${classname}`}>
      <Calendar
        mode="range"
        defaultMonth={dateRange?.from}
        selected={dateRange}
        onSelect={setDateRange}
        numberOfMonths={1}
        min={1}
        className="rounded-lg border shadow-sm"
      />
      <div className="text-muted-foreground text-center text-xs">
        A minimum of 5 days is required
      </div>
    </div>
  )
}