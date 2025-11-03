import Ellipse from '@svg/CouriersCardEllipse.svg?react';
import Clipboard from '@svg/Clipboard.svg?react';
import Check from '@svg/CheckArrow.svg?react';
import { FC, useEffect, useState } from 'react';
import { CourierTask, TogglePaidStateBody } from '@/api/generated/model';
import { format } from 'date-fns';
import { useGetAllPlaces } from '@/hooks/useGetAllPlaces';

interface CouriersOrderCardProps extends CourierTask {
  togglePaid: (
    data: TogglePaidStateBody,
  ) => Promise<CourierTask | void> | undefined;
}

export const CouriersOrderCard: FC<CouriersOrderCardProps> = ({
  courierName,
  finishDate,
  finishPlaceId,
  id = 0,
  paid = false,
  startPlaceId,
  togglePaid,
}) => {
  const [optimisticPaid, setOptimisticPaid] = useState(paid);
  const [isToggling, setIsToggling] = useState(false);
  const { isAuthenticated, isLoading, places } = useGetAllPlaces();

  const handleTogglePaid = async () => {
    if (!togglePaid || isToggling) return;

    setOptimisticPaid(!optimisticPaid);
    setIsToggling(true);

    try {
      await togglePaid({ id });
      console.log('Статус оплаты обновлён');
    } catch (error) {
      setOptimisticPaid(paid);
      console.error('Ошибка при обновлении статуса:', error);
    } finally {
      setIsToggling(false);
    }
  };

  useEffect(() => {
    setOptimisticPaid(paid);
  }, [paid]);

  const startPlace = places?.find((place) => place.id === startPlaceId)?.name || 'Unknown';
  const finishPlace = places?.find((place) => place.id === finishPlaceId)?.name || 'Unknown';

  const formattedDate = finishDate
    ? format(new Date(finishDate), 'dd.MM | HH:mm')
    : 'N/A';

  return (
    <div className="flex flex-col gap-5 rounded-[30px] border-2 border-[#2e2e2e] bg-[#292929] p-5 max-w-[314px]">
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col items-center gap-[15px]">
          <span className="text-[24px] font-medium whitespace-nowrap text-white">
            {courierName || 'Unknown Courier'}
          </span>
          <Ellipse />
        </div>
        <div className="flex flex-col gap-2.5 items-center px-1.5">
          <span className="text-[24px] font-medium text-white">
            {finishPlace}
          </span>
          <div className="flex w-full justify-between text-[#cacaca]">
            <span className="text-[20px] font-normal">
              {formattedDate}
            </span>
            <span className="text-[20px] font-normal">{id}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-[15px] px-1.5 h-11">
        <span
          className={`flex items-center border-2 border-[#5d5d5d] rounded-[10px] text-[20px] font-medium px-[15px] py-2.5 text-white whitespace-nowrap ${
            optimisticPaid ? 'line-through' : ''
          }`}
        >
          267 ₽
        </span>
        <div
          className={`flex justify-center items-center rounded-[10px] text-[20px] font-medium w-full cursor-pointer select-none ${
            isToggling
              ? 'bg-gray-400 cursor-not-allowed'
              : optimisticPaid
                ? 'bg-transparent border border-[#BDFF67]'
                : 'bg-[#BDFF67] text-black'
          }`}
          onClick={handleTogglePaid}
        >
          {optimisticPaid ? <Check stroke="#BDFF67" /> : 'Оплата'}
        </div>
        <div className="flex justify-center items-center border-2 border-[#5d5d5d] rounded-[10px] min-w-[46px] cursor-pointer">
          <Clipboard />
        </div>
      </div>
    </div>
  );
};