import BgSvg1 from '@svg/background-card1.svg?react';
import BgSvg2 from '@svg/background-card2.svg?react';
import { InWorkButton } from './InWorkButton';
import { InWorkCardItems } from './InWorkCardItems';
import './css/InWorkCardItem.css';

export function InWorkCardItem() {
  return (
    <div className="relative">
      <div className="relative inline-block p-9 rounded-[45px] overflow-hidden h-[414px] gradient-border">
        <div className="flex flex-col items-end pr-[50px] pt-[30px] gap-[60px] absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <BgSvg1 />
          <BgSvg2 />
        </div>
        <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[60px] z-[1] pointer-events-none bg-[rgba(28,28,28,0.79)]" />
        <div className="relative text-white z-[3]">
          <InWorkCardItems />
        </div>
      </div>
      <div className="absolute right-0 -top-3 flex gap-2.5 mr-[25px] items-end z-[4]">
        <InWorkButton />
        <InWorkButton />
      </div>
    </div>
  );
}
