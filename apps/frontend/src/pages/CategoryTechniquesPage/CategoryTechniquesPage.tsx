import styled from "styled-components"
import ArrowLeft from "@svg/ArrowLeft.svg?react"
import Plus from "@svg/plus.svg?react"
import { useNavigate } from "react-router-dom"
import { routes } from "../../config/routes"
import { CategoryTechniquesPageCard } from "./CategoryTechniquesPageCard"
import { useState } from "react"
import { AddCategoryTechniques } from "./addCategoryTechniques/AddCategoryTechniques"

const CategoryTechniquesPageStyled = styled.div`
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

const AddCategoryTechniquesContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 90%;
`

export function CategoryTechniquesPage() {
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)

	const toggleModal = () => {
		setIsOpen(prevState => !prevState)
	}

    return (
        <CategoryTechniquesPageStyled>
            <Header>
                <BackButtonContainer>
                    <ArrowLeft onClick={() => navigate(routes.staff)} cursor="pointer"/>
                    <TitleText>Категории техников</TitleText>
                </BackButtonContainer>
                <AddButton onClick={() => setIsOpen(true)}>
                    <AddButtonSvgContainer>
                        <Plus stroke="black" />
                    </AddButtonSvgContainer>
                    <AddButtonText>Добавить категорию</AddButtonText>
                </AddButton>
            </Header>
            {isOpen ? (
                <AddCategoryTechniquesContainer>
                    <AddCategoryTechniques toggleModal={toggleModal}/>
                </AddCategoryTechniquesContainer>
            ) : (
                <CategoryTechniquesPageCard />
            )}
            
        </CategoryTechniquesPageStyled>
    )
}