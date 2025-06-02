import styled from "styled-components"
import Delete from "@img/Delete.svg?react"

const InWorkFilterItemStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background: #2D2D2D;
    border-radius: 1000px;
    padding: 10px 20px;
    
    > svg {
        cursor: pointer;
    }
`

const Text = styled.span`
    font-size: 24px;
    font-weight: 400;
    color: white;
`

export function InWorkFilterItem() {

    const firstName = 'Иван'
    const lastName = 'Иванов'

    return (
        <InWorkFilterItemStyled>
            <Text>{firstName} {lastName}</Text>
            <Delete strokeWidth={3}/>
        </InWorkFilterItemStyled>
    )
}