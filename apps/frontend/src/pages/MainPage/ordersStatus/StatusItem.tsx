import Arrow from '@svg/StatusArrowUp.svg?react';
import { FC } from 'react';
import styled from '@emotion/styled';

interface IStatusItemProps {
  color: string;
  currentNumber: number;
  todayNumber: number;
  text: string;
}

const StatusItemStyled = styled.div`
  display: flex;
  gap: 15px;
`;

const StatusCurrentNumberStyled = styled.span`
  font-size: 70px;
  font-weight: 500;
  color: white;
`;

const StatusItemContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-end;
`;

const StatusItemToDayContainerStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 1px 10px 0 8px;
  border-radius: 1000px;
`;

const StatusItemToDayNumberStyled = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

const StatusItemTextStyled = styled.span`
  font-size: 24px;
  color: #c5c5c5;
`;

export const StatusItem: FC<IStatusItemProps> = ({
  color,
  currentNumber,
  todayNumber,
  text,
}) => {
  return (
    <StatusItemStyled>
      <StatusCurrentNumberStyled>{currentNumber}</StatusCurrentNumberStyled>
      <StatusItemContainerStyled>
        <StatusItemToDayContainerStyled style={{ backgroundColor: color }}>
          <Arrow />
          <StatusItemToDayNumberStyled>
            {todayNumber}
          </StatusItemToDayNumberStyled>
        </StatusItemToDayContainerStyled>
        <StatusItemTextStyled>{text}</StatusItemTextStyled>
      </StatusItemContainerStyled>
    </StatusItemStyled>
  );
};
