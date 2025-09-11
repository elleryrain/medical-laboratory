import Plus from '@svg/plus.svg?react';
import { CouriersTimeFilter } from './CouriersTimeFilter';
import { CouriersTabSwitcher } from './CouriersTabSwitcher';
import { CouriersCardList } from './CouriersCardList';
import { useCourierTasks } from '@/hooks/useCourierTask';
import { GetCourierTasksParams } from '@/api/generated/model';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { format, set, startOfWeek, endOfWeek } from 'date-fns';
import { Modal } from '@/components/modal/Modal';
import { useModal } from '@/hooks/useModal';
import { AddCouriersModal } from './AddCouriersModal';

export const Couriers = () => {
  const {
    isLoading,
    createTask,
    createTaskStatus,
    getTasks,
    togglePaid,
    togglePaidStatus,
  } = useCourierTasks();
  const { isOpen, openModal, closeModal } = useModal();
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const today = new Date();
    return {
      from: startOfWeek(today, { weekStartsOn: 1 }),
      to: endOfWeek(today, { weekStartsOn: 1 }),
    };
  });
  const [typeDelivery, setTypeDelivery] = useState<'pickup' | 'delivery'>(
    'delivery',
  );

  const formatDate = (
    date: Date | undefined,
    isFinishDate: boolean = false,
  ): string => {
    if (!date) return '';
    if (isFinishDate) {
      const adjustedDate = set(date, { hours: 23, minutes: 59 });
      return format(adjustedDate, 'dd-MM-yyyy:HH:mm');
    }
    return format(date, 'dd-MM-yyyy:HH:mm');
  };

  const params: GetCourierTasksParams = {
    startDate: formatDate(dateRange?.from),
    type: typeDelivery,
    ...(dateRange?.to && { finishDate: formatDate(dateRange.to, true) }),
  };

  const {
    data: tasks,
    isLoading: tasksLoading,
    error: tasksError,
  } = getTasks(params);

  useEffect(() => {
    console.log(tasks, tasksError, tasksLoading);
  }, [tasks]);

  return (
    <div>
      <div className="flex flex-col gap-6 max-w-[716px] bg-[#1c1c1c] rounded-[45px] p-8 h-fit">
        <div className="flex justify-between items-end">
          <div className="flex gap-6">
            <h1 className="text-[40px] font-medium leading-[48.76px] text-white">
              Курьеры
            </h1>
            <div className="flex items-center justify-center w-[49px] h-[49px] border-2 border-[#dddddd] rounded-full cursor-pointer bg-transparent select-none" onClick={openModal}>
              <Plus stroke="#DDDDDD" />
            </div>
          </div>
          <CouriersTimeFilter onDateRangeChange={setDateRange} />
        </div>
        <CouriersTabSwitcher onTypeDeliveryChange={setTypeDelivery} />
        <CouriersCardList data={tasks || []} togglePaid={togglePaid} />
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} title='Новая доставка курьера' size='s'>
        <AddCouriersModal toggleModal={closeModal}/>
      </Modal>
    </div>
  );
};
