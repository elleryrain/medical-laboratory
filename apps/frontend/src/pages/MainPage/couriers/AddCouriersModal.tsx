import { useState } from 'react';
import { Button } from '@/components/button/Button';
import { CustomInput } from '@/components/input/CustomInput';
import CustomSelect from '@/components/select/CustomSelect';
import { useGetAllPlaces } from '@/hooks/useGetAllPlaces';
import type { GetAllPlaces200Item } from '@/api/generated/model';
import { useCourierTasks } from '@/hooks/useCourierTask';
import { format } from 'date-fns';

interface IAddCouriersModal {
  toggleModal: () => void;
}

export const AddCouriersModal = ({toggleModal}: IAddCouriersModal) => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    courierName: '',
    orderNumber: '',
    date: '',
    time: '',
  });

  const { isAuthenticated, isLoading, places } = useGetAllPlaces();
  const { createTask, createTaskStatus } = useCourierTasks();

  const handleSelectChange = (field: string) => (option: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: option,
    }));
  };

  const handleInputChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = async () => {
    if (
      !formData.from ||
      !formData.to ||
      !formData.courierName ||
      !formData.orderNumber
    ) {
      console.error('Заполните все обязательные поля');
      return;
    }

    const startPlace = places?.find(
      (place: GetAllPlaces200Item) => place.name === formData.from,
    );
    const finishPlace = places?.find(
      (place: GetAllPlaces200Item) => place.name === formData.to,
    );

    if (!startPlace || !finishPlace) {
      console.error('Место отправления или назначения не найдено');
      return;
    }

    const finishDate =
      formData.date && formData.time
        ? format(
            new Date(`${formData.date}T${formData.time}`),
            'dd-MM-yyyy:HH:mm',
          )
        : format(new Date(), 'dd-MM-yyyy:HH:mm');

    const taskData = {
      startPlaceId: startPlace.id || 0,
      finishPlaceId: finishPlace.id || 0,
      courierName: formData.courierName,
      serviceId: parseInt(formData.orderNumber) || 0,
      finishDate,
    };

    try {
      await createTask(taskData);
      console.log('Задача успешно создана:', taskData);
      setFormData({
        from: '',
        to: '',
        courierName: '',
        orderNumber: '',
        date: '',
        time: '',
      });
      toggleModal()
    } catch (error) {
      console.error('Ошибка при создании задачи:', error);
    }
  };

  const placeOptions = places
    ? places.map((place: GetAllPlaces200Item) => place.name || '')
    : [];

  if (isLoading || isAuthenticated === null) {
    return <div>Загрузка...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <CustomSelect
            options={placeOptions}
            height={75}
            placeholder="Откуда"
            onSelect={handleSelectChange('from')}
            value={formData.from}
          />
          <CustomSelect
            options={placeOptions}
            height={75}
            placeholder="Куда"
            onSelect={handleSelectChange('to')}
            value={formData.to}
          />
          <CustomInput
            placeholder="Имя курьера"
            height={75}
            value={formData.courierName}
            onChange={handleInputChange('courierName')}
          />
          <CustomInput
            placeholder="Номер наряда"
            height={75}
            value={formData.orderNumber}
            onChange={handleInputChange('orderNumber')}
          />
        </div>
        <div className="grid grid-cols-2 gap-x-5 items-center">
          <div className="flex gap-[15px]">
            <CustomInput
              type="date"
              placeholder="дд.мм.гггг"
              className="w-43.5"
              value={formData.date}
              onChange={handleInputChange('date')}
            />
            <CustomInput
              type="time"
              className="w-33"
              placeholder="00"
              value={formData.time}
              onChange={handleInputChange('time')}
            />
          </div>
          <h1 className="text-xl text-[#B9B9B9] font-normal">
            Можно не заполнять, поставим текущее время
          </h1>
        </div>
      </div>
      <Button
        title={createTaskStatus === 'pending' ? 'Добавление...' : 'Добавить'}
        theme="saveButtonModal"
        className="w-full rounded-[15px] h-[71px]"
        onClick={handleSubmit}
        disabled={createTaskStatus === 'pending'}
      />
    </div>
  );
};
