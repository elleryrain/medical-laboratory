import styled from "styled-components";
import Delete from "@img/Delete.svg?react";
import Plus from "@img/plus.svg?react";
import { useStore } from "../../../store/StaffPageStore";
import { useState } from "react";

const AddCategoryTechniquesStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1C1C1C;
  width: fit-content;
  padding: 35px 30px 30px 30px;
  border-radius: 30px;
  width: 690px;
  gap: 30px;
`

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const HeaderTitle = styled.h1`
  color: white;
  font-size: 32px;
  font-weight: 500;
`

const CloseButton = styled(Delete)`
  height: 32px;
  width: 32px;
  position: absolute;
  right: 0px;
  top: 8px;
  cursor: pointer;
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
`

const Input = styled.input`
    background: #333333;
    border-radius: 15px;
    outline: none;
    border: none;
    height: 71px;
    color: white;
    font-size: 24px;
    font-weight: 500;
    padding: 0 23px;

    &::placeholder {
        color: #B9B9B9;
    }
`

const TechniquesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`

const TechniquesTitle = styled.span`
    color: white;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
`

const TechniquesInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    padding-bottom: 10px;
`

const TechniquesInputWrapper = styled.div`
    display: flex;
    gap: 30px;
    align-items: center;
`

const TechniquesInputImage = styled.img`
    height: 75px;
    width: 75px;
    border-radius: 1000px;
`

const TechniquesInputName = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const TechniquesAddButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 75px;
    width: 75px;
    border-radius: 1000px;
    border: 2px dashed white;
    cursor: pointer;
`

const PaymentTypeOfWorkContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
`

const PaymentTypeOfWorkTitle = styled.span`
    color: white;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
`

const TypeOfWorkContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

const NameTypeOfWork = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const InputTypeOfWorkContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 85px;
    background-color: #333333;
    border-radius: 15px;
    padding: 0 15px 0 20px;
`

const InputTypeOfWorkStageContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`

const InputTypeOfWorkStageCount = styled.span`
    color: white;
    font-size: 20px;
    font-weight: 400;
`

const InputTypeOfWorkStageName = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const InputTypeOfWorkNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    background: #292929;
    border-radius: 15px;
    height: 75px;
    padding: 7px 15px;
    max-width: 194px;
`

const InputTypeOfWorkName = styled.span`
    color: white;
    font-size: 20px;
    font-weight: 400;
`

const InputTypeOfWorkPriceContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 5px;
`

const InputTypeOfWork = styled.input`
    width: 100%;
    background: transparent;
    border: none;
    color: white;
    font-size: 24px;
    font-weight: 500;
    text-align: right;
    outline: none;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
	    display: none;
    }
    
`

const InputTypeOfWorkPrice = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const SubmitButton = styled.div`
  width: 100%;
  height: 71px;
  border-radius: 15px;
  background: #BDFF67;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  font-size: 24px;
  font-weight: 500;
  cursor: pointer;
`

export function AddCategoryTechniques({ toggleModal }: { toggleModal: () => void }) {

    const techniques = useStore(state => state.techniques)
    const typesWork = useStore(state => state.typesWork)
    const typesWorkStages = useStore(state => state.typesWorkStages)

    const [count, setCount] = useState(1)

    const addCountHandler = () => {
        setCount(count + 1)
    }

    return (
        <AddCategoryTechniquesStyled>
            <Header>
                <HeaderTitle>Добавить категорию</HeaderTitle>
                <CloseButton onClick={toggleModal} />
            </Header>
            <Main>
                <Input placeholder="Название категории" />
                <TechniquesContainer>
                    <TechniquesTitle>Техники</TechniquesTitle>

                    <TechniquesInputContainer>
                        {techniques.slice(0, count).map(technique => (
                            <TechniquesInputWrapper key={technique.id}>
                                <TechniquesInputImage src={technique.imgUrl} />
                                <TechniquesInputName>{technique.lastName} {technique.firstName} {technique.middleName}</TechniquesInputName>
                            </TechniquesInputWrapper>
                        ))}
                        <TechniquesAddButton onClick={addCountHandler}><Plus stroke="white" /></TechniquesAddButton>
                    </TechniquesInputContainer>
                </TechniquesContainer>
                <PaymentTypeOfWorkContainer>
                    <PaymentTypeOfWorkTitle>Оплата за вид работы</PaymentTypeOfWorkTitle>
                    {typesWork.map(typeWork => (
                        <TypeOfWorkContainer key={typeWork.id}>
                            <NameTypeOfWork>{typeWork.nameTypeWork}</NameTypeOfWork>
                            <InputContainer>
                                {typesWorkStages.filter(stage => stage.typeWorkId === typeWork.id).map((stage, index) => (
                                    <InputTypeOfWorkContainer key={stage.id}>
                                        <InputTypeOfWorkStageContainer>
                                            <InputTypeOfWorkStageCount>{index + 1} этап</InputTypeOfWorkStageCount>
                                            <InputTypeOfWorkStageName>{stage.nameTypeWorkStage}</InputTypeOfWorkStageName>
                                        </InputTypeOfWorkStageContainer>
                                        <InputTypeOfWorkNameContainer>
                                            <InputTypeOfWorkName>Оплата техника</InputTypeOfWorkName>
                                            <InputTypeOfWorkPriceContainer>
                                                <InputTypeOfWork defaultValue={stage.totalPrice} type="number" step="10" />
                                                <InputTypeOfWorkPrice>₽</InputTypeOfWorkPrice>
                                            </InputTypeOfWorkPriceContainer>
                                        </InputTypeOfWorkNameContainer>
                                    </InputTypeOfWorkContainer>
                                ))}
                            </InputContainer>
                        </TypeOfWorkContainer>
                    ))}
                </PaymentTypeOfWorkContainer>
            </Main>
            <SubmitButton>Сохранить</SubmitButton>
        </AddCategoryTechniquesStyled>
    )
}