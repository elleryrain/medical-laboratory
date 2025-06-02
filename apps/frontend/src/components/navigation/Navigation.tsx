import styled from "styled-components";
import { routes } from "../../config/routes";
import { NavItem } from "./navItem/NavItem";

const NavigationStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

const NavItems = [
    { svgUrl: "/src/assets/img/HomeIcon.svg", route: routes.main },
    { svgUrl: "/src/assets/img/StaffIcon.svg", route: routes.staff },
    { svgUrl: "/src/assets/img/StatisticsIcon.svg", route: routes.statistics },
    { svgUrl: "/src/assets/img/SalariesIcon.svg", route: routes.salaries },
    { svgUrl: "/src/assets/img/WarehouseIcon.svg", route: routes.warehouse },
    { svgUrl: "/src/assets/img/ArchiveIcon.svg", route: routes.archive },
];

export function Navigation() {
    return (
        <NavigationStyled>
            {NavItems.map(({ svgUrl, route }) => (
                <NavItem key={route} svgUrl={svgUrl} route={route} />
            ))}
        </NavigationStyled>
    )
}
