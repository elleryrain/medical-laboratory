import styled from "styled-components";
import { useStaffStore } from '@/store/StaffPageStore';
import ArrowUp from "@svg/ArrowUp.svg?react"
import ArrowDown from "@svg/ArrowDown.svg?react"
import { useState } from "react";

const TypesWorkPageCardStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 7px;
    background: #1C1C1C;
    border-radius: 15px;
    padding: 25px;
`;

const ImgNameButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const ImgNameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`

const Image = styled.img`
    width: 55px;
    height: 55px;
    object-fit: cover;
    border-radius: 1000px;
`

const NameTypeWork = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1000px;
    width: 60px;
    height: 50px;
    background: #333333;
    cursor: pointer;
`

const NameProstheticsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`

const NameProsthetics = styled.div`
    color: white;
    font-size: 16px;
    font-weight: 500;
`

const NameTypeProsthetics = styled.div`
    color: white;
    font-size: 20px;
    font-weight: 500;
`

const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const NameStagesTableContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px 0 9px 0;
    border-bottom: 1px solid white;
`

const NameStagesTable = styled.span`
    color: white;
    font-size: 16px;
    font-weight: 500;
`

const NameStagesTableRightContainer = styled.div`
    display: flex;
    gap: 60px;
`

const NameTypeWorkStage = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px 0 9px 0;
    border-bottom: 1px solid white;
`

const StageName = styled.span`
    color: white;
    font-size: 20px;
    font-weight: 500;
`

const StagePriceContainer = styled.div`
    display: flex;
    gap: 60px;
`

const StageNameMaterial = styled.span`
    color: white;
    font-size: 20px;
    font-weight: 500;
`

const StagePriceMaterial = styled.span`
    color: white;
    width: 84px;
    text-align: right;
    font-size: 20px;
    font-weight: 500;
`

const StageTotalPrice = styled.span`
    color: white;
    width: 77px;
    text-align: right;
    font-size: 20px;
    font-weight: 500;
`

const TotalPriceNameContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px 0 9px 0;
`

const TotalPriceName = styled.span`
    color: white;
    font-size: 20px;
    font-weight: 500;
`

const TotalPriceContainer = styled.div`
    display: flex;
    gap: 60px;
`

const TotalPricePieceMaterial = styled.span`
    color: white;
    font-size: 20px;
    font-weight: 500;
`

const TotalPriceMaterial = styled.span`
    color: white;
    font-size: 20px;
    font-weight: 500;
    width: 84px;
    text-align: right;
`

const TotalPrice = styled.span`
    color: white;
    font-size: 20px;
    font-weight: 500;
    width: 77px;
    text-align: right;
`

export function TypesWorkPageCard() {
    const typesWork = useStaffStore((state) => state.typesWork)
    const typesWorkStages = useStaffStore((state) => state.typesWorkStages)

    const [openCards, setOpenCards] = useState<Record<number, boolean>>({})

    const toggleCard = (id: number) => {
        setOpenCards((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }))
    }

    return (
        <>
            {typesWork.map((work) => {
                const isOpen = openCards[work.id]
                const stages = typesWorkStages.filter(stage => stage.typeWorkId === work.id)

                return (
                    <TypesWorkPageCardStyled key={work.id}>
                        <ImgNameButtonContainer>
                            <ImgNameContainer>
                                <Image src={work.imgUrl} />
                                <NameTypeWork>{work.nameTypeWork}</NameTypeWork>
                            </ImgNameContainer>
                            <ButtonContainer onClick={() => toggleCard(work.id)}>
                                {isOpen ? <ArrowUp /> : <ArrowDown />}
                            </ButtonContainer>
                        </ImgNameButtonContainer>
                        {isOpen && (
                            <>
                                <NameProstheticsContainer>
                                    <NameProsthetics>Вид протезирования</NameProsthetics>
                                    <NameTypeProsthetics>{work.typesProsthetics}</NameTypeProsthetics>
                                </NameProstheticsContainer>
                                <TableContainer>
                                    <NameStagesTableContainer>
                                        <NameStagesTable>Этапы</NameStagesTable>
                                        <NameStagesTableRightContainer>
                                            <NameStagesTable>Материал, шт</NameStagesTable>
                                            <NameStagesTable>Материал</NameStagesTable>
                                            <NameStagesTable>Итоговая</NameStagesTable>
                                        </NameStagesTableRightContainer>
                                    </NameStagesTableContainer>
                                    {stages.map((stage) => (
                                        <>
                                            <NameTypeWorkStage key={stage.id}>
                                                <StageName>{stage.nameTypeWorkStage}</StageName>
                                                <StagePriceContainer>
                                                    {stage.nameMaterial === "Нет" ?
                                                        <StageNameMaterial>Нет</StageNameMaterial>
                                                        : <StageNameMaterial>{stage.nameMaterial}, {stage.pricePiece} ₽/{stage.namePiece}</StageNameMaterial>
                                                    }
                                                    <StagePriceMaterial>{stage.priceMaterial} ₽</StagePriceMaterial>
                                                    <StageTotalPrice>{stage.totalPrice} ₽</StageTotalPrice>
                                                </StagePriceContainer>
                                            </NameTypeWorkStage>
                                        </>
                                    ))}
                                    <TotalPriceNameContainer>
                                        <TotalPriceName>Итого</TotalPriceName>
                                        <TotalPriceContainer>
                                            <TotalPricePieceMaterial>{stages.reduce((acc, stage) => acc + stage.pricePiece, 0)} ₽</TotalPricePieceMaterial>
                                            <TotalPriceMaterial>{stages.reduce((acc, stage) => acc + stage.priceMaterial, 0)} ₽</TotalPriceMaterial>
                                            <TotalPrice>{stages.reduce((acc, stage) => acc + stage.totalPrice, 0)} ₽</TotalPrice>
                                        </TotalPriceContainer>
                                    </TotalPriceNameContainer>
                                </TableContainer>
                            </>
                        )}
                    </TypesWorkPageCardStyled>
                )
            })}
        </>
    )
}