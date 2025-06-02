import styled from "styled-components"
import Plus from "@img/plus.svg?react"
import { CouriersTimeFilter } from "./CouriersTimeFilter"
import { CouriersTabSwitcher } from "./CouriersTabSwitcher"
import { CouriersCardList } from "./CouriersCardList"

const CouriersStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    max-width: 716px;
    background: #1C1C1C;
    border-radius: 45px;
    padding: 35px;
    height: fit-content;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`

const AddCouriersContainer = styled.div`
    display: flex;
    gap: 25px;
`

const HeaderTitle = styled.h1`
    font-size: 40px;
    font-weight: 500;
    line-height: 48.76px;
    color: white;

`

const HeaderButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 49px;
    height: 49px;
    border: 2px solid #DDDDDD;
    border-radius: 1000px;
    cursor: pointer;
    background: transparent;
    user-select: none;
`

export function Couriers() {
    return (
        <CouriersStyled>
            <Header>
                <AddCouriersContainer>
                    <HeaderTitle>Курьеры</HeaderTitle>
                    <HeaderButton>
                        <Plus stroke="#DDDDDD"/>
                    </HeaderButton>
                </AddCouriersContainer>
                <CouriersTimeFilter />
            </Header>
            <CouriersTabSwitcher />
            <CouriersCardList />
        </CouriersStyled>
    )
}