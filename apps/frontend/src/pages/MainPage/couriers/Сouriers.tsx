import Plus from '@svg/plus.svg?react';
import { CouriersTimeFilter } from './CouriersTimeFilter';
import { CouriersTabSwitcher } from './CouriersTabSwitcher';
import { CouriersCardList } from './CouriersCardList';
import { useCourierTasks } from '@/hooks/useCourierTask';
import { GetCourierTasksParams } from '@/api/generated/model';

export const Couriers = () => {

  const {isAuthenticated, isLoading, createTask, createTaskStatus, getTasks, togglePaid, togglePaidStatus} = useCourierTasks()

  const params: GetCourierTasksParams ={
    startDate: '01-01-2023:14:30',
    finishDate: '12-12-2025:10:00',
    type: 'pickup'
  }  

  const { data: tasks, isLoading: tasksLoading, error: tasksError } = getTasks(params);
  console.log(tasks, tasksError, tasksLoading);

  return (
    <div className="flex flex-col gap-6 max-w-[716px] bg-[#1c1c1c] rounded-[45px] p-8 h-fit">
      <div className="flex justify-between items-end">
        <div className="flex gap-6">
          <h1 className="text-[40px] font-medium leading-[48.76px] text-white">
            Курьеры
          </h1>
          <div className="flex items-center justify-center w-[49px] h-[49px] border-2 border-[#dddddd] rounded-full cursor-pointer bg-transparent select-none">
            <Plus stroke="#DDDDDD" />
          </div>
        </div>
        <CouriersTimeFilter />
      </div>
      <CouriersTabSwitcher />
      <CouriersCardList data={tasks || []} togglePaid={togglePaid}/>
    </div>
  );
}
