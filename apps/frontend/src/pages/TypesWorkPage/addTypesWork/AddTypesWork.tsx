import { useState } from "react"
import styled from "styled-components"
import Delete from "@img/Delete.svg?react"
import Plus from "@img/plus.svg?react"
import DragPoints from "@img/DragPoints.svg?react"
import DeleteRedCircle from "@img/DeleteRedCircle.svg?react"
import { AddTypesWorkSelect } from "./AddTypesWorkSelect"
import { useWarehouseStore } from '@/store/WarehousePageStore';
import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, useSortable, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const AddTypesWorkStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #1c1c1c;
    width: 690px;
    padding: 35px 30px 30px 30px;
    border-radius: 30px;
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

const ToggleInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 35px;
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
      color: #b9b9b9;
    }
`

const ToggleButtonContainer = styled.div`
    display: flex;
    background: #292929;
    height: 71px;
    padding: 4px;
    border-radius: 15px;
`

const ToggleButton = styled.div<{ $isRemovable: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 50%;
    color: ${(props) => (props.$isRemovable ? "black" : "white")};
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;
    background: ${(props) => (props.$isRemovable ? "white" : "transparent")};
    border-radius: ${(props) => (props.$isRemovable ? "12px" : "0")};
`

const StagesOfWorkContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 35px;
`

const StagesOfWorkTitle = styled.div`
    color: white;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
`

const StagesOfWorkDragItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`

const StagesOfWorkAddButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 71px;
    gap: 17px;
    color: white;
    font-size: 24px;
    font-weight: 500;
    border: 2px dashed white;
    border-radius: 15px;
    cursor: pointer;
`

const DragItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const DragItemNameInputContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

const DragItemNameInputWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
    background: #333333;
    padding: 21px 22px 22px 22px;
    border-radius: 15px;
    width: 100%;
`

const DragPointsStyled = styled(DragPoints)`
    cursor: pointer;
`

const DragInputContainer = styled.div`
    display: flex;
    gap: 7px;
    width: 100%;
`

const DragInputCount = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const DragInputName = styled.input`
    color: white;
    font-size: 24px;
    font-weight: 500;
    background: transparent;
    border: none;
    outline: none;
    width: 100%;

    &::placeholder {
      color: #b9b9b9;
    }
`

const DragItemDeleteButton = styled(DeleteRedCircle)`
    cursor: pointer;
`

const DragPriceInputContainer = styled.div`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
`

const DragPriceInputWrapper = styled.div`
    display: flex;
    gap: 15px;
`

const PriceInputContainer = styled.div`
    display: flex;
    flex-direction: column;
    background: #292929;
    border-radius: 12px;
    border: 1px solid #555555;
    padding: 8px 10px;

    &:nth-child(1) {
      width: 130px;
    }
    &:nth-child(2) {
      width: 110px;
    }
`

const PriceInputName = styled.span`
    color: white;
    font-size: 14px;
    font-weight: 500;
`

const PriceInputWrapper = styled.div`
    display: flex;
    gap: 5px;
`

const PriceInput = styled.input`
    color: white;
    font-size: 24px;
    font-weight: 500;
    height: 29px;
    width: 100%;
    border: none;
    background: transparent;
    outline: none;
    text-align: right;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      display: none;
    }
`

const PriceInputCurrency = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const SubmitButton = styled.div`
    width: 100%;
    height: 71px;
    border-radius: 15px;
    background: #bdff67;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;
`

function SortableStageItem({
    stage,
    index,
    onDelete,
    priceInputs,
    wareHouseItems,
}: {
    stage: { id: string }
    index: number
    onDelete: () => void
    priceInputs: { name: string; placeholder: string }[]
    wareHouseItems: { name: string }[]
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: stage.id })
    const style = { transform: CSS.Transform.toString(transform), transition }

    return (
        <DragItemContainer ref={setNodeRef} style={style} {...attributes}>
            <DragItemNameInputContainer>
                <DragItemNameInputWrapper>
                    <DragPointsStyled {...listeners} />
                    <DragInputContainer>
                        <DragInputCount>{index + 1}.</DragInputCount>
                        <DragInputName placeholder="Название этапа" />
                    </DragInputContainer>
                </DragItemNameInputWrapper>
                <DragItemDeleteButton onClick={onDelete} />
            </DragItemNameInputContainer>

            <DragPriceInputContainer>
                <DragPriceInputWrapper>
                    {priceInputs.map((input, idx) => (
                        <PriceInputContainer key={idx}>
                            <PriceInputName>{input.name}</PriceInputName>
                            <PriceInputWrapper>
                                <PriceInput type="number" step="10" placeholder={input.placeholder} />
                                <PriceInputCurrency>₽</PriceInputCurrency>
                            </PriceInputWrapper>
                        </PriceInputContainer>
                    ))}
                </DragPriceInputWrapper>
                <AddTypesWorkSelect
                    options={wareHouseItems.map((item) => item.name)}
                    label="Исчисляемый материал"
                    defaultOption="Нет"
                />
            </DragPriceInputContainer>
        </DragItemContainer>
    )
}

export function AddTypesWork({ toggleModal }: { toggleModal: () => void }) {
    const [isRemovable, setIsRemovable] = useState(true)
    const [stagesOfWork, setStagesOfWork] = useState<{ id: string }[]>([{ id: "stage-1" }])
    const wareHouseItems = useWarehouseStore((state) => state.items)
    const priceInputs = [
        { name: "Итоговая цена", placeholder: "Цена" },
        { name: "Материал", placeholder: "Цена" },
    ]

    function handleDragEnd(event: any) {
        const { active, over } = event
        if (!over) return
        if (active.id !== over.id) {
            setStagesOfWork((prev) => {
                const oldIndex = prev.findIndex((item) => item.id === active.id)
                const newIndex = prev.findIndex((item) => item.id === over.id)
                return arrayMove(prev, oldIndex, newIndex)
            })
        }
    }

    const handleDeleteStage = (idx: number) => {
        setStagesOfWork(stagesOfWork.filter((_, i) => i !== idx))
    }

    const handleAddStage = () => {
        const newStageId = `stage-${Math.random().toString(36).slice(2, 9)}`
        setStagesOfWork([...stagesOfWork, { id: newStageId }])
    }

    return (
        <AddTypesWorkStyled>
            <Header>
                <HeaderTitle>Новый вид работы</HeaderTitle>
                <CloseButton onClick={toggleModal} />
            </Header>
            <Main>
                <ToggleInputContainer>
                    <Input placeholder="Название позиции" />
                    <ToggleButtonContainer>
                        <ToggleButton onClick={() => setIsRemovable(true)} $isRemovable={isRemovable}>
                            Съемное
                        </ToggleButton>
                        <ToggleButton onClick={() => setIsRemovable(false)} $isRemovable={!isRemovable}>
                            Несъемное
                        </ToggleButton>
                    </ToggleButtonContainer>
                </ToggleInputContainer>
                <StagesOfWorkContainer>
                    <StagesOfWorkTitle>Этапы работы</StagesOfWorkTitle>
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext
                            items={stagesOfWork.map((stage) => stage.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <StagesOfWorkDragItemsContainer>
                                {stagesOfWork.map((stage, idx) => (
                                    <SortableStageItem
                                        key={stage.id}
                                        stage={stage}
                                        index={idx}
                                        onDelete={() => handleDeleteStage(idx)}
                                        priceInputs={priceInputs}
                                        wareHouseItems={wareHouseItems}
                                    />
                                ))}
                            </StagesOfWorkDragItemsContainer>
                        </SortableContext>
                    </DndContext>
                    <StagesOfWorkAddButton onClick={handleAddStage}>
                        <Plus stroke="white" />
                        Добавить этап
                    </StagesOfWorkAddButton>
                </StagesOfWorkContainer>
            </Main>
            <SubmitButton>Сохранить</SubmitButton>
        </AddTypesWorkStyled>
    )
}