import { OrdersStatus } from './ordersStatus/OrdersStatus';
import { InWork } from './inWork/InWork';
import { Couriers } from './couriers/Сouriers';
import { TaskSchedule } from './taskSchedule/TaskSchedule';
import { AddShift } from './addShift/addShift';
import { useState, useCallback } from 'react';
import { useModal } from '@/hooks/useModal';
import { Modal } from '@/components/modal/Modal';

export function MainPage() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div
      className='flex flex-col w-full pt-2.5 gap-10 overflow-hidden'
    >
      <OrdersStatus toggleModal={openModal} />

      <InWork />
      <div className="flex gap-5 justify-between mr-[50px]">
        <TaskSchedule />
        <Couriers />
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} title="Новый наряд">
        <AddShift toggleModal={closeModal}/>
      </Modal>
    </div>
  );
}
