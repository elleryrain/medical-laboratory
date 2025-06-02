import styled from "styled-components"
import { StaffPageCard } from "./StaffPageCard"

const StaffPageStyled = styled.div`
    width: 100%;
    margin-right: 50px;
    margin-top: 12px;
`

export function StaffPage() {
    return (
        <StaffPageStyled>
            <StaffPageCard />
        </StaffPageStyled>
    )
}