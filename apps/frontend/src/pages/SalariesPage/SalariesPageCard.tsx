import { Button } from '@/components/button/Button';
import SalaryChart from './SalaryProgressBar';
import WeeklyProgress from './WeeklyProgress';
import { Penalties, useSalariesStore } from '@/store/SalariesPageStore';
import { Modal } from '@/components/modal/Modal';
import { useModal } from '@/hooks/useModal';
import { PenaltiesModal } from './PenaltiesModal';
import { useEffect } from 'react';

export type SalaryStatus = {
  id: number;
  paymentDate: string;
  employeeId: number;
  isPaid: boolean;
};

interface ISalariesPageCardProps {
  imgUrl: string;
  firstname: string;
  lastname: string;
  middlename: string;
  category: string;
  fixedSalary: number;
  penalties: Penalties[];
  bonuses: number;
  techniqueId: number;
  salaryStatus: SalaryStatus[];
  employeeId: number;
}

export const SalariesPageCard = ({
  imgUrl,
  firstname,
  lastname,
  middlename,
  category,
  fixedSalary,
  penalties,
  bonuses,
  techniqueId,
  salaryStatus,
  employeeId,
}: ISalariesPageCardProps) => {
  const { addSalaryStatus } = useSalariesStore();
  const currentSalaryStatus = salaryStatus.filter(
    (s) => s.employeeId === employeeId,
  );
  const hasPaymentStatus =
    currentSalaryStatus.length > 0 ? currentSalaryStatus[0] : null;
  const isPaid = hasPaymentStatus?.isPaid || false;
  const paymentDate = hasPaymentStatus?.paymentDate || null;
  const buttonText = isPaid && paymentDate ? paymentDate : 'Выплатить';
  const getNewSalaryStatusId = () => {
    return salaryStatus.length > 0
      ? Math.max(...salaryStatus.map((s) => s.id)) + 1
      : 0;
  };
  const { isOpen, openModal, closeModal } = useModal();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSavePenalties = (updatedPenalties: Penalties[]) => {
    // Здесь можно отправить данные на бэкенд или обновить Zustand
    console.log('Обновленные штрафы:', updatedPenalties);
    // Пример: updatePenaltiesInStore(updatedPenalties);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU');
  };

  const handlePayClick = () => {
    if (!isPaid) {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      const newStatus: SalaryStatus = {
        id: getNewSalaryStatusId(),
        paymentDate: formattedDate,
        employeeId: employeeId,
        isPaid: true,
      };
      addSalaryStatus(newStatus);
      console.log('Добавлен новый статус:', newStatus);
    } else {
      console.log('Уже оплачено, статус:', hasPaymentStatus?.id);
    }
  };
  const penaltiesSum = penalties.reduce(
    (total, penalty) => total + penalty.amount,
    0,
  );

  return (
    <>
      <div className="bg-[#1C1C1C] w-[815px] px-[35px] pt-[35px] pb-[30px] rounded-[45px]">
        <div className="flex gap-5">
          <img src={imgUrl} className="h-[90px] w-[90px] rounded-full" />
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-2xl font-medium">
              {lastname} {firstname} {middlename}
            </h1>
            <p className="text-[#B5B5B5]">{category}</p>
          </div>
        </div>
        <p className="text-2xl text-[#B5B5B5] font-normal mt-[25px] mb-3">
          {new Date().toLocaleDateString('ru-RU', { month: 'long' })}
        </p>
        <div className="flex justify-between gap-[140px] items-center">
          <p className="text-5xl font-medium text-nowrap">
            {formatNumber(fixedSalary + bonuses - penaltiesSum)} ₽
          </p>
          <SalaryChart
            fixedSalary={fixedSalary}
            bonuses={bonuses}
            penalties={penaltiesSum}
          />
        </div>
        <p className="text-[#B5B5B5] mt-3 mb-5 text-2xl font-normal">
          Заработано
        </p>
        <div className="flex flex-wrap gap-2.5">
          <div className="flex bg-[#2D2D2D] justify-between items-center pl-0.5 pr-3 py-0.5 rounded-full gap-2">
            <div className="w-[40px] h-[40px] bg-[#4DC5E2] rounded-full"></div>
            <p className="font-normal text-[20px]">Фиксированная</p>
            <p className="font-medium text-[20px] text-nowrap">
              {formatNumber(fixedSalary)} ₽
            </p>
          </div>
          <div className="flex bg-[#2D2D2D] justify-between items-center pl-0.5 pr-3 py-0.5 rounded-full gap-2">
            <div className="w-[40px] h-[40px] bg-[#65D691] rounded-full"></div>
            <p className="font-normal text-[20px]">Наряды</p>
            <p className="font-medium text-[20px] text-nowrap">
              {formatNumber(bonuses)} ₽
            </p>
          </div>
          <div
            className="flex bg-[#2D2D2D] justify-between items-center pl-0.5 pr-3 py-0.5 rounded-full gap-2 cursor-pointer"
            onClick={() => {
              openModal();
            }}
          >
            <div className="w-[40px] h-[40px] bg-[#ED4C66] rounded-full"></div>
            <p className="font-normal text-[20px]">Штрафы</p>
            <p className="font-medium text-[20px] text-nowrap">
              {formatNumber(penaltiesSum)} ₽
            </p>
          </div>
        </div>
        <p className="text-[#B5B5B5] mt-5 mb-3 text-2xl font-normal">
          Выполненные наряды
        </p>
        <WeeklyProgress techniqueId={techniqueId} />
        <Button
          title={isPaid ? `Выплачено ${buttonText}` : buttonText}
          theme={isPaid ? 'salaryPaid' : 'salaryNotPaid'}
          onClick={handlePayClick}
          className="mt-15 mx-auto"
        />
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} title="Штрафы">
        <PenaltiesModal
          penalties={penalties}
          employeeId={employeeId}
          onSave={handleSavePenalties}
        />
      </Modal>
    </>
  );
};
