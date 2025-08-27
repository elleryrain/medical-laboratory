import Plus from '@svg/plus.svg?react';
import { StatusItem } from './StatusItem';
import { FC } from 'react';

interface OrdersStatusProps {
  toggleModal: () => void;
}

export const OrdersStatus: FC<OrdersStatusProps> = ({ toggleModal }) => {
  return (
    <div className="mr-[50px]">
      <div className="flex justify-between items-center w-full">
        <div
          className="flex px-5 py-2.5 bg-white rounded-full gap-5 items-center justify-center cursor-pointer h-[70px]"
          onClick={() => toggleModal()}
        >
          <div className="flex items-center justify-center h-[50px] w-[50px] bg-[#dcdcdc] rounded-full">
            <Plus stroke="black" className="h-8 w-8 bg-transparent" />
          </div>
          <h1 className="text-[24px] font-medium">Добавить наряд</h1>
        </div>
        <div className="flex gap-[65px]">
          <StatusItem
            color={'#BDFF67'}
            currentNumber={23}
            todayNumber={13}
            text={'В работе'}
          />
          <StatusItem
            color={'#BDFF67'}
            currentNumber={13}
            todayNumber={4}
            text={'выполнено'}
          />
          <StatusItem
            color={'#FF9699'}
            currentNumber={4}
            todayNumber={2}
            text={'дедлайн'}
          />
        </div>
      </div>
    </div>
  );
};
