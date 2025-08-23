import { FC } from 'react';
import Plus from '@svg/plus.svg?react';
import { InWorkFilterItem } from './InWorkFilterItem';

interface InWorkFilterProps {
  title: string;
}

export const InWorkFilter: FC<InWorkFilterProps> = ({ title }) => {
  return (
    <div className="flex gap-5">
      <span className="text-[40px] font-medium text-white">{title}</span>
      <div className="flex ml-2.5 gap-5">
        <InWorkFilterItem />
      </div>
      <div className="flex items-center justify-center h-[49px] w-[49px] border-2 border-[#DDDDDD] rounded-full cursor-pointer">
        <Plus stroke="white" />
      </div>
    </div>
  );
};
