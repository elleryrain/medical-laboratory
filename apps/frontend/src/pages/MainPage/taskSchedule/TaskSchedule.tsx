import Plus from '@svg/plus.svg?react';
import { TaskScheduleList } from './TaskScheduleList';

export function TaskSchedule() {
  return (
    <div className="flex flex-col gap-[30px] max-w-[944px] w-full bg-[#1c1c1c] p-[35px] rounded-[45px]">
      <div className="flex justify-between items-end">
        <div className="flex gap-[25px]">
          <h1 className="text-[40px] font-medium leading-[48.76px] text-white">
            Задачи на день
          </h1>
          <div className="flex items-center justify-center w-[49px] h-[49px] border-2 border-[#dddddd] rounded-full cursor-pointer bg-transparent">
            <Plus stroke="#DDDDDD" />
          </div>
        </div>
        <button className="bg-transparent border-none text-white text-[24px] font-medium cursor-pointer pb-[5px]">
          Править
        </button>
      </div>
      <TaskScheduleList />
    </div>
  );
}
