import styled from "styled-components"
import { InWorkCardItem } from "./InWorkCardItem"

const InWorkCardStyled = styled.div`
    display: flex;
    padding: 15px 0;
    gap: 25px;
    width: 100%;
    overflow-x: hidden;
`

export function InWorkCard() {
    return (
        <InWorkCardStyled>
            <InWorkCardItem />
            <InWorkCardItem />
            <InWorkCardItem />
            <InWorkCardItem />
            <InWorkCardItem />
        </InWorkCardStyled>
    )
}