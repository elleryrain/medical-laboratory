import styled from "styled-components"
import { useStore } from "../../store/StaffPageStore"
import ArrowLink from "@img/ArrowLinkStaff.svg?react"
import { useNavigate } from "react-router-dom"

const StaffPageCardStyled = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`

const StaffPageCardContainerStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 17px 17px 17px 30px;
    width: 397px;
    max-height: 120px;
    background: #1C1C1C;
    border-radius: 20px;
`

const StaffPageCardNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 220px;
    gap: 5px;
`

const StaffPageCardName = styled.span`
    color: white;
    font-size: 32px;
    font-weight: 500;
`

const StaffPageCardCount = styled.span`
    color: #C5C5C5;
    font-size: 20px;
    font-weight: 400;
`

const StaffPageButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 86px;
    width: 86px;
    background: #333333;
    border-radius: 10px;
    cursor: pointer;
`

export function StaffPageCard() {

    const categoryStaffPage = useStore((state) => state.categoryStaffPage)
    const navigate = useNavigate()
    return (
        <StaffPageCardStyled>
            {categoryStaffPage.map((category) => (
                <StaffPageCardContainerStyled key={category.id}>
                    <StaffPageCardNameContainer>
                        <StaffPageCardName>{category.nameCategory}</StaffPageCardName>
                        <StaffPageCardCount>{category.counterCategory} {category.nameSubcategory}</StaffPageCardCount>
                    </StaffPageCardNameContainer>
                    <StaffPageButton onClick={() => navigate(category.route)}>
                        <ArrowLink />
                    </StaffPageButton>
                </StaffPageCardContainerStyled>
            ))}
        </StaffPageCardStyled>
    );
}