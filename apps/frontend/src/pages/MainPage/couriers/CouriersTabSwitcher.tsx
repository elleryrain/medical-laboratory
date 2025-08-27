import { useState } from 'react';

export const CouriersTabSwitcher = () => {
  const [isBring, setIsBring] = useState(true);

  return (
    <div className="flex bg-[#292929] rounded-[15px] justify-between">
      <button
        className={`w-[309px] h-[63px] rounded-[12px] text-[24px] font-medium leading-[29.26px] text-center m-1 cursor-pointer focus:outline-none ${
          isBring ? 'bg-[#E8E8E8] text-black' : 'bg-transparent text-white'
        }`}
        onClick={() => setIsBring(true)}
      >
        Привез
      </button>
      <button
        className={`w-[309px] h-[63px] rounded-[12px] text-[24px] font-medium leading-[29.26px] text-center m-1 cursor-pointer focus:outline-none ${
          !isBring ? 'bg-[#E8E8E8] text-black' : 'bg-transparent text-white'
        }`}
        onClick={() => setIsBring(false)}
      >
        Отвез
      </button>
    </div>
  );
}
