import styled from '@emotion/styled';
import { routes } from '../../config/routes';
import { useNavigate } from 'react-router-dom';
import ArrowLeft from '@svg/ArrowLeft.svg?react';
import Plus from '@svg/plus.svg?react';
import { TypesWorkPageCard } from './TypesWorkPageCard';
import { useState } from 'react';
import { AddTypesWork } from './addTypesWork/AddTypesWork';

const TypesWorkPageStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin-right: 50px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TypesWorkPageCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const BackButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  height: 54px;
`;

const TitleText = styled.span`
  color: white;
  font-size: 40px;
  font-weight: 500;
`;

const AddButton = styled.div`
  display: flex;
  padding: 10px 20px 10px 10px;
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
  cursor: pointer;

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

const AddTypeWorkContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
`;

export function TypesWorkPage() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <TypesWorkPageStyled>
      <Header>
        <BackButtonContainer>
          <ArrowLeft onClick={() => navigate(routes.staff)} cursor="pointer" />
          <TitleText>Вид работы</TitleText>
        </BackButtonContainer>
        <AddButton onClick={() => setIsOpen(true)}>
          <AddButtonSvgContainer>
            <Plus stroke="black" />
          </AddButtonSvgContainer>
          <AddButtonText>Добавить вид работы</AddButtonText>
        </AddButton>
      </Header>
      {isOpen ? (
        <AddTypeWorkContainer>
          <AddTypesWork toggleModal={toggleModal} />
        </AddTypeWorkContainer>
      ) : (
        <TypesWorkPageCardContainer>
          <TypesWorkPageCard />
        </TypesWorkPageCardContainer>
      )}
    </TypesWorkPageStyled>
  );
}
