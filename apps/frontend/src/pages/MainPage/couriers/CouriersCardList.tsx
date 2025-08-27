import { FC } from 'react';
import { CouriersOrderCard } from './CouriersOrderCard';
import { CourierTask, TogglePaidStateBody } from '@/api/generated/model';

interface ICouriersCardListProps {
  data: CourierTask[];
  togglePaid: (data: TogglePaidStateBody) => Promise<CourierTask | void> | undefined;
}

export const CouriersCardList: FC<ICouriersCardListProps> = ({ data, togglePaid }) => {
  return (
    <div className="grid grid-cols-2 gap-5 mt-[5px]">
      {data.length ? (
        data.map((task) => (
          <CouriersOrderCard key={task.id} {...task} togglePaid={togglePaid} />
        ))
      ) : (
        <div className="text-center text-white">Задачи отсутствуют</div>
      )}
    </div>
  );
};