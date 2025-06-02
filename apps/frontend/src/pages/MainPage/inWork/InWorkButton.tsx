import styled from "styled-components"

const InWorkButtonStyled = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    height: 36px;
    padding-left: 11px;
    padding-right: 22px;
    border: 1px solid #585858;
    background: #1C1C1C;
    border-radius: 1000px;
    cursor: pointer;
`

const InWorkButtonSvg = styled.img`

`

const InWorkButtonText = styled.span`
    font-size: 20px;
    font-weight: 500;
    color: white;
`

export function InWorkButton() {
    return (
        <InWorkButtonStyled>
            <InWorkButtonSvg src="/src/assets/img/ChangeIcon.svg"/>
            <InWorkButtonText>В клинике</InWorkButtonText>
        </InWorkButtonStyled>
    )
}