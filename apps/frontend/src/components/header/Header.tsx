import styled from "styled-components"
import Logo from '@img/Logo.svg?react'
import { Search } from "./search/Search"
import { Calendar } from "./calendar/Calendar"
import { Notify } from "./notify/Notify"
import { Profile } from "./profile/Profile"

const HeaderStyled = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 70px;
    margin: 0 50px 0 46px;
`

const HeaderContainerLogoStyled = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
    flex: 1;
`

const HeaderContainerStyled = styled.div`
    display: flex;
    gap: 40px;
    width: 100%;
`

export function Header() {
    return (
        <HeaderStyled>
            <HeaderContainerStyled>
                <HeaderContainerLogoStyled>
                    <Logo />
                    <Search />
                </HeaderContainerLogoStyled>
                <Calendar />
                <Notify />
                <Profile firstName="Екатерина" lastName="Смирнова" role="Администратор" imgUrl="/image/1.jpg" />
            </HeaderContainerStyled>
        </HeaderStyled>
    )
}