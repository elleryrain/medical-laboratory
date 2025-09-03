import { CalendarRange } from '@/components/calendar/calendarRange';
import { useState } from 'react';

export function CouriersTimeFilter() {
  const [activeButton, setActiveButton] = useState('Неделя');

  return (
    <div className="relative">
      <div className="flex gap-[15px]">
        <button
          className={`px-2.5 py-2 rounded-[10px] text-[20px] font-medium cursor-pointer ${
            activeButton === 'Неделя'
              ? 'bg-[#E8E8E8] text-black border border-[#E8E8E8]'
              : 'bg-[#292929] text-white border border-[#393939]'
          }`}
          onClick={() => setActiveButton('Неделя')}
        >
          Неделя
        </button>
        <button
          className={`px-2.5 py-2 rounded-[10px] text-[20px] font-medium cursor-pointer ${
            activeButton === 'День'
              ? 'bg-[#E8E8E8] text-black border border-[#E8E8E8]'
              : 'bg-[#292929] text-white border border-[#393939]'
          }`}
          onClick={() => setActiveButton('День')}
        >
          День
        </button>
      </div>
      <CalendarRange classname='absolute z-10 right-28 top-11'/>
    </div>
  );
}
