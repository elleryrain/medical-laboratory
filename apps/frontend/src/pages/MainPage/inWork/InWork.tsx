import styled from "styled-components"
import { InWorkFilter } from "./InWorkFilter"
import { InWorkCard } from "./InWorkCard"

const InWorkStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 45px;
`

export function InWork() {
	return (
		<InWorkStyled>
            <InWorkFilter title={'В работе'} />
            <InWorkCard />        
		</InWorkStyled>
	)
}