import styled from "styled-components";
import Plus from '@img/Plus.svg?react'
import { SalariesPageCard } from "./SalariesPageCard";

const SalariesPageStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    width: 100%;
    margin-right: 50px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const HeaderNameMonthContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 30px;
`

const HeaderName = styled.span`
    color: white;
    font-size: 40px;
    font-weight: 500;
`

const HeaderMonth = styled.span`
    color: white;
    font-size: 24px;
    font-weight: 400;
    padding: 10px 20px;
    background: #2D2D2D;
    border-radius: 1000px;
    cursor: pointer;
`

const HeaderButton = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 24px;
    font-weight: 500;
    background: white;
    padding: 10px 20px 10px 10px;
    border-radius: 1000px;
    cursor: pointer;
`

const HeaderImg = styled.div`
    height: 50px;
    width: 50px;
    border-radius: 1000px;
    background: #DCDCDC;
    display: flex;
    justify-content: center;
    align-items: center;
`

export function SalariesPage() {
    const currentMonth = new Date().toLocaleString('ru-RU', { month: 'long' }).replace(/^./, (char) => char.toUpperCase())
    return (
        <SalariesPageStyled>
            <Header>
                <HeaderNameMonthContainer>
                    <HeaderName>Зарплаты</HeaderName>
                    <HeaderMonth>{currentMonth}</HeaderMonth>
                </HeaderNameMonthContainer>
                <HeaderButton>
                    <HeaderImg>
                        <Plus stroke="#000000" />
                    </HeaderImg>
                    Настроить зарплаты
                </HeaderButton>
            </Header>
            <SalariesPageCard />
        </SalariesPageStyled>
    )
}