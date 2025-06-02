import styled from "styled-components"
import { useStore } from "../../store/WarehousePageStore"
import { useState } from "react"
import ArrowUp from "@img/ArrowUp.svg?react"
import ArrowDown from "@img/ArrowDown.svg?react"

const WarehousePageStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
    width: 100%;
    margin-right: 50px;
    height: fit-content;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    gap: 35px;
    background: #1C1C1C;
    border-radius: 25px;
    padding: 25px 30px 25px 35px;
    height: fit-content;
`

const CardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CardName = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const CardButtonTotalContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 50px;
`

const CardTotalCount = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const CardButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 60px;
    border-radius: 1000px;
    background: #333333;
    cursor: pointer;
`

const OpenCard = styled.div<{$isOpen: boolean}>`
    display: ${props => props.$isOpen ? "flex" : "none"};
    flex-direction: column;
    gap: 35px;
`

const OpenCardInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
`

const OpenCardUnUsedNameContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const OpenCardUnUsedName = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const OpenCardUnUsedCount = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const OpenCardInUseNameContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const OpenCardInUseName = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const OpenCardInUseCount = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const OpenCardButton = styled.div`
    background: #FFFFFF;
    width: 248px;
    height: 55px;
    border-radius: 1000px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-bottom: 5px;
    font-size: 24px;
    font-weight: 500;
`

export function WarehousePage() {
    const warehouseStore = useStore()

    const [openCards, setOpenCards] = useState<Record<number, boolean>>({})

    const toggleCard = (id: number) => {
        setOpenCards((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }))
    }
    return (
        <WarehousePageStyled>
            {warehouseStore.items.map(item => {
                const isOpen = openCards[item.id]
                return (
                    <Card key={item.id}>
                        <CardContainer>
                            <CardName>{item.name}</CardName>
                            <CardButtonTotalContainer>
                                <CardTotalCount>{item.total} шт</CardTotalCount>
                                <CardButton onClick={() => toggleCard(item.id)}>
                                    {isOpen ? <ArrowUp /> : <ArrowDown />}
                                </CardButton>
                            </CardButtonTotalContainer>
                        </CardContainer>
                        <OpenCard $isOpen={isOpen}>
                            <OpenCardInfo>
                                <OpenCardUnUsedNameContainer>
                                    <OpenCardUnUsedName>Неиспользованных</OpenCardUnUsedName>
                                    <OpenCardUnUsedCount>{item.unused} шт</OpenCardUnUsedCount>
                                </OpenCardUnUsedNameContainer>
                                <OpenCardInUseNameContainer>
                                    <OpenCardInUseName>В работе</OpenCardInUseName>
                                    <OpenCardInUseCount>{item.inUse} шт</OpenCardInUseCount>
                                </OpenCardInUseNameContainer>
                            </OpenCardInfo>
                            <OpenCardButton>Править</OpenCardButton>
                        </OpenCard>
                    </Card>
                )
            })}
        </WarehousePageStyled>
    )
}