import { FC } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { ReactSVG } from "react-svg"

interface INavItemProps {
    svgUrl: string,
    route: string
}

export const NavItem: FC<INavItemProps> = ({ svgUrl, route }) => {

    const location = useLocation()
    const isActive = route === "/" ? location.pathname === route : location.pathname.startsWith(route)

    return (
        <NavLink
            to={route}
            className={({ isActive }) => `transition duration-200 ease-initial w-[90px] h-[90px] flex justify-center items-center cursor-pointer rounded-full 
            ${isActive ? 'bg-white' : 'bg-[#1C1C1C]'}`}
        >
            <div className={isActive ? 'text-black' : 'text-[#7E7E7E]'}>
                <ReactSVG src={svgUrl} />
            </div>
        </NavLink>
    )
}