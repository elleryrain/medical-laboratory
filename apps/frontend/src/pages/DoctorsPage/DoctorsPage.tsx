import styled from "styled-components"
import ArrowLeft from "@img/ArrowLeft.svg?react"
import Plus from "@img/plus.svg?react"
import { useNavigate } from "react-router-dom"
import { routes } from "../../config/routes"
import { DoctorsPageCard } from "./DoctorsPageCard"

const DoctorsPageStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-top: 2px;
    width: 100%;
    margin-right: 50px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const BackButtonContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    height: 54px;
`

const TitleText = styled.span`
    color: white;
    font-size: 40px;
    font-weight: 500;
`

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
`

const AddButtonSvgContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    background-color: #DCDCDC;
    border-radius: 1000px;


    >svg{
        height: 32px;
        width: 32px;
        background: transparent;
    }
`

const AddButtonText = styled.h1`
    font-size: 24px;
    font-weight: 500;
`

export function DoctorsPage() {

    const navigate = useNavigate()
    
    return (
        <DoctorsPageStyled>
            <Header>
                <BackButtonContainer>
                    <ArrowLeft onClick={() => navigate(routes.staff)} cursor="pointer"/>
                    <TitleText>Врачи</TitleText>
                </BackButtonContainer>
                <AddButton onClick={() => navigate(routes.addDoctor)}>
                    <AddButtonSvgContainer>
                        <Plus stroke="black" />
                    </AddButtonSvgContainer>
                    <AddButtonText>Добавить врача</AddButtonText>
                </AddButton>
            </Header>
            <DoctorsPageCard />
        </DoctorsPageStyled>
    )
}