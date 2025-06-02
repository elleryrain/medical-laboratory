import { FC } from "react"
import { NavLink, useLocation } from "react-router-dom"
import styled from "styled-components"
import { ReactSVG } from "react-svg"

interface INavItemProps {
	svgUrl: string,
	route: string
}

const NavItemStyled = styled(NavLink)<{$isActive: boolean}>`
    width: 90px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 1000px;
    background: ${({ $isActive }) => $isActive ? "white" : "#1C1C1C"}; 
`

const NavItemImageStyled = styled.div<{$isActive: boolean}>`
    height: 40px;
    width: 40px;
    background: transparent;
    path {
        fill: ${({ $isActive }) => $isActive ? "black" : ""};
        stroke: ${({ $isActive }) => $isActive ? "black" : ""};
    }
`

export const NavItem: FC<INavItemProps> = ({ svgUrl, route }) => {

    const location = useLocation()
    const isActive = route === "/" ? location.pathname === route : location.pathname.startsWith(route)

	return (
		<NavItemStyled to={route} $isActive={isActive}>
			<NavItemImageStyled $isActive={isActive}>
                <ReactSVG src={svgUrl} />
            </NavItemImageStyled>
		</NavItemStyled>
	)
}