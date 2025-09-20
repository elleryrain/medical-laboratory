import { useState, useRef, useEffect } from 'react';
import React from 'react';
import { Calendar } from '../ui/calendar';
import { ru } from 'date-fns/locale';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { format } from 'date-fns';

interface ICustomInputProps {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'currency' | 'date' | 'time';
  required?: boolean;
  className?: string;
  height?: number;
}

export const CustomInput = ({
  value = '',
  onChange,
  placeholder,
  type = 'text',
  required,
  className,
  height = 71,
}: ICustomInputProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date() : undefined,
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [valueDate, setValueDate] = React.useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hourInputRef = useRef<HTMLInputElement>(null);
  const minuteInputRef = useRef<HTMLInputElement>(null);
  const [timeState, setTimeState] = useState({
    hours: value ? (value as string).split(':')[0] || '' : '',
    minutes: value ? (value as string).split(':')[1] || '' : '',
  });

  useOutsideClick(wrapperRef, () => setOpen(false), open);

  useEffect(() => {
    if (type === 'time' && value) {
      const [hours, minutes] = (value as string).split(':');
      setTimeState({ hours: hours || '', minutes: minutes || '' });
    } else if (type === 'date' && value) {
      const newDate = new Date(value);
      setDate(newDate);
      setMonth(newDate);
      setValueDate(value);
    } else if (type === 'date') {
      setDate(undefined);
      setMonth(undefined);
      setValueDate('');
    }
  }, [value, type]);

  const findModalScrollableParent = (
    element: HTMLElement | null,
  ): HTMLElement | null => {
    if (!element) return null;
    let parent = element.parentElement;
    while (parent) {
      const { overflowY } = window.getComputedStyle(parent);
      if (overflowY === 'auto' || overflowY === 'scroll') {
        return parent;
      }
      parent = parent.parentElement;
    }
    return null;
  };

  const scrollToCalendar = () => {
    if (wrapperRef.current && open) {
      const modal = findModalScrollableParent(wrapperRef.current);
      if (modal && wrapperRef.current) {
        const calendar = wrapperRef.current.querySelector('.calendar-class');
        if (calendar) {
          const calendarRect = calendar.getBoundingClientRect();
          const modalRect = modal.getBoundingClientRect();
          const offsetTop = calendarRect.top - modalRect.top + modal.scrollTop;

          modal.scrollTo({
            top: offsetTop - 20,
            behavior: 'smooth',
          });
        }
      }
    }
  };

  useEffect(() => {
    if (open) {
      setTimeout(scrollToCalendar, 0);
    }
  }, [open]);

  const getTypeStyles = () => {
    const baseStyle = `text-2xl font-medium px-[20px] py-[21px]`;

    switch (type) {
      case 'text':
      default:
        return {
          typeInput: 'text',
          style: `${baseStyle} ${
            isTyping || (typeof value === 'string' && value.length > 0)
              ? 'text-white'
              : 'text-[#B9B9B9]'
          }`,
        };
      case 'currency':
        return {
          typeInput: 'number',
          style: `${baseStyle} `,
        };
      case 'date':
        return {
          typeInput: 'date',
          style: `${baseStyle} no-calendar-picker ${
            hasClicked ? 'text-white' : 'text-[#B9B9B9]'
          }`,
        };
      case 'time':
        return {
          typeInput: 'text',
          style: `${baseStyle} ${
            isTyping || (typeof value === 'string' && value.length > 0)
              ? 'text-white'
              : 'text-[#B9B9B9]'
          }`,
        };
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping(true);
    onChange?.(e);
  };

  const handleHourInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/[^0-9]/g, '');
    if (inputValue.length > 2) inputValue = inputValue.slice(0, 2);
    if (inputValue && parseInt(inputValue) > 23) inputValue = '23';

    setTimeState((prev) => ({ ...prev, hours: inputValue }));
    setIsTyping(true);

    if (inputValue.length === 2 && minuteInputRef.current) {
      minuteInputRef.current.focus();
      minuteInputRef.current.select();
    }

    if (onChange && inputValue && timeState.minutes) {
      const timeValue = `${inputValue}:${timeState.minutes}`;
      onChange({
        target: { value: timeValue },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleMinuteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/[^0-9]/g, '');
    if (inputValue.length > 2) inputValue = inputValue.slice(0, 2);
    if (inputValue && parseInt(inputValue) > 59) inputValue = '59';

    setTimeState((prev) => ({ ...prev, minutes: inputValue }));
    setIsTyping(true);

    if (onChange && timeState.hours && inputValue) {
      const timeValue = `${timeState.hours}:${inputValue}`;
      onChange({
        target: { value: timeValue },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue) {
      const newDate = new Date(inputValue);
      if (!isNaN(newDate.getTime())) {
        setDate(newDate);
        setMonth(newDate);
        setValueDate(inputValue);
        onChange?.(e);
      }
    } else {
      setDate(undefined);
      setMonth(undefined);
      setValueDate('');
      onChange?.(e);
    }
    setIsTyping(true);
  };

  return (
    <>
      <style>
        {`
          .no-calendar-picker::-webkit-calendar-picker-indicator {
            display: none;
          }
        `}
      </style>
      {type === 'date' ? (
        <div className="relative" ref={wrapperRef}>
          <input
            type={getTypeStyles().typeInput}
            id="date"
            value={valueDate}
            placeholder={placeholder}
            className={`${className} rounded-[15px] bg-[#333333] outline-none ${getTypeStyles().style}`}
            style={{ height: `${height}px` }}
            onChange={handleDateInputChange}
            onFocus={() => {
              setOpen(true);
              setHasClicked(true);
            }}
          />
          {open && (
            <Calendar
              mode="single"
              buttonVariant={'ghost'}
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              locale={ru}
              textSize="xl"
              cellSize={51}
              onSelect={(selectedDate) => {
                if (selectedDate) {
                  const formattedDate = format(selectedDate, 'yyyy-MM-dd');
                  setDate(selectedDate);
                  setValueDate(formattedDate);
                  setMonth(selectedDate);
                  if (onChange) {
                    const event = {
                      target: { value: formattedDate },
                    } as React.ChangeEvent<HTMLInputElement>;
                    onChange(event);
                  }
                }
                setOpen(false);
              }}
              className="absolute left-0 calendar-class rounded-[30px] border-2 border-solid border-[#2E2E2E]"
              style={{ top: `${height + 8}px` }}
            />
          )}
        </div>
      ) : type === 'time' ? (
        <div
          className={`${getTypeStyles().style} ${className} flex gap-2 rounded-[15px] bg-[#333333]`}
          style={{ height: `${height}px` }}
        >
          <input
            type="text"
            value={timeState.hours}
            onChange={handleHourInputChange}
            placeholder={placeholder}
            required={required}
            maxLength={2}
            ref={hourInputRef}
            className="outline-none placeholder:text-[#B9B9B9] w-full text-center"
          />
          <span className="text-white self-center">:</span>
          <input
            type="text"
            value={timeState.minutes}
            onChange={handleMinuteInputChange}
            placeholder={placeholder}
            required={required}
            maxLength={2}
            ref={minuteInputRef}
            className="outline-none placeholder:text-[#B9B9B9] w-full text-center"
          />
        </div>
      ) : (
        <input
          className={`${className} w-full placeholder:text-[#B9B9B9] rounded-[15px] bg-[#333333] outline-none ${getTypeStyles().style}`}
          style={{ height: `${height}px` }}
          placeholder={placeholder}
          required={required}
          type={getTypeStyles().typeInput}
          value={value}
          onChange={handleInputChange}
        />
      )}
    </>
  );
};
