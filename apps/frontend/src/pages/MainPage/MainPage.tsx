import styled from '@emotion/styled';
import { OrdersStatus } from './ordersStatus/OrdersStatus';
import { InWork } from './inWork/InWork';
import { Couriers } from './couriers/Сouriers';
import { TaskSchedule } from './taskSchedule/TaskSchedule';
import { AddShift } from './addShift/addShift';
import { useState, useCallback } from 'react';

const MainPageStyled = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 10px;
  overflow: hidden;
  gap: ${(props) => (props.$isOpen ? '18px' : '33px')};
`;

const TaskAndCouriersContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin-right: 50px;
`;

const AddShiftContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
`;

export function MainPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return (
    <MainPageStyled $isOpen={isOpen}>
      <OrdersStatus toggleModal={toggleModal} />
      {isOpen ? (
        <AddShiftContainer>
          <AddShift toggleModal={toggleModal} />
        </AddShiftContainer>
      ) : (
        <>
          <InWork />
          <TaskAndCouriersContainer>
            <TaskSchedule />
            <Couriers />
          </TaskAndCouriersContainer>
        </>
      )}
    </MainPageStyled>
  );
}
