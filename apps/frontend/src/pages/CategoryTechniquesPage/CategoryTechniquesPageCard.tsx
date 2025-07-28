import { useStaffStore } from '@/store/StaffPageStore';
import ArrowUp from "@svg/ArrowUp.svg?react"
import ArrowDown from "@svg/ArrowDown.svg?react"
import { useState } from "react"
import styled from "styled-components"

const CategoryTechniquesPageCardStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
    width: 100%;
    background: #1C1C1C;
    border-radius: 25px;
    height: fit-content;
    padding: 17px 30px 17px 17px;
`

const CardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CardCounterNameContainer = styled.div`
    display: flex;
    gap: 25px;
`

const CardCounter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 86px;
    height: 86px;
    background-color: #E9E9E9;
    border-radius: 10px;
    font-size: 40px;
    line-height: 48.76px;
    font-weight: 500;
`

const CardNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const CardName = styled.span`
    color: white;
    font-size: 32px;
    font-weight: 500;
`

const CardCount = styled.div`
    color: #C5C5C5;
    font-size: 20px;
    font-weight: 500;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 60px;
    border-radius: 1000px;
    background: #333333;
    cursor: pointer;
`

const OpenCardInfo = styled.div<{ isOpen: boolean }>`
    display: ${props => props.isOpen ? "flex" : "none"};
`

const OpenCardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 0 10px 23px 23px;
    width: 100%;
`

const OpenCardImgNameContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
`

const OpenCardImg = styled.img`
    height: 75px;
    width: 75px;
    object-fit: cover;
    border-radius: 1000px;
`

const OpenCardName = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 500;
`

const OpenCardInfoButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background: #333333;
    height: 69px;
    border-radius: 1000px;
    color: white;
    font-size: 24px;
    font-weight: 500;
    cursor: pointer;
    margin-top: 20px;
`

export function CategoryTechniquesPageCard() {
    const CategoryTechniques = useStaffStore((state) => state.categoryTechniques)
    const Techniques = useStaffStore((state) => state.techniques)

    const [openCards, setOpenCards] = useState<Record<number, boolean>>({})

    const toggleCard = (id: number) => {
        setOpenCards((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }))
    }
    return (
        <CategoryTechniquesPageCardStyled>
            {CategoryTechniques.map((category) => {
                const isOpen = openCards[category.id]
                const techniques = Techniques.filter(technique => technique.categoryId === category.id)
                return (
                    <Card key={category.id}>
                        <CardContainer>
                            <CardCounterNameContainer>
                                <CardCounter>{category.id + 1}</CardCounter>
                                <CardNameContainer>
                                    <CardName>{category.nameCategory}</CardName>
                                    <CardCount>{techniques.length} техника</CardCount>
                                </CardNameContainer>
                            </CardCounterNameContainer>
                            <ButtonContainer onClick={() => toggleCard(category.id)}>
                                {isOpen ? <ArrowUp /> : <ArrowDown />}
                            </ButtonContainer>
                        </CardContainer>
                        <OpenCardInfo isOpen={isOpen}>
                            <OpenCardContainer>
                                {techniques.map((technique) => (
                                    <OpenCardImgNameContainer key={technique.id}>
                                        <OpenCardImg src={technique.imgUrl} />
                                        <OpenCardName>{technique.lastName} {technique.firstName} {technique.middleName}</OpenCardName>
                                    </OpenCardImgNameContainer>
                                ))}
                                <OpenCardInfoButton>Информация о видах работы</OpenCardInfoButton>
                            </OpenCardContainer>
                        </OpenCardInfo>
                    </Card>
                )
            })}
        </CategoryTechniquesPageCardStyled>
    )
}