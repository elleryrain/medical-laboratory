import styled from '@emotion/styled';
import Plus from '@svg/plus.svg?react';
import { StatusItem } from './StatusItem';

const OrdersStatusStyled = styled.div`
  margin-right: 50px;
`;

const OrdersStatusStyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const AddButton = styled.div`
  display: flex;
  padding: 10px 20px 10px 20px;
  background-color: white;
  border-radius: 1000px;
  gap: 20px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 70px;
`;

const AddButtonSvgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  background-color: #dcdcdc;
  border-radius: 1000px;

  > svg {
    height: 32px;
    width: 32px;
    background: transparent;
  }
`;

const AddButtonText = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

const StatusItemContainer = styled.div`
  display: flex;
  gap: 65px;
`;

export function OrdersStatus({ toggleModal }: { toggleModal: () => void }) {
  return (
    <OrdersStatusStyled>
      <OrdersStatusStyledContainer>
        <AddButton onClick={() => toggleModal()}>
          <AddButtonSvgContainer>
            <Plus stroke="black" />
          </AddButtonSvgContainer>
          <AddButtonText>Добавить наряд</AddButtonText>
        </AddButton>
        <StatusItemContainer>
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
        </StatusItemContainer>
      </OrdersStatusStyledContainer>
    </OrdersStatusStyled>
  );
}
