import { routes } from "../../config/routes";
import { NavItem } from "./navItem/NavItem";

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
        <div className="flex flex-col gap-[25px]">
            {NavItems.map(({ svgUrl, route }) => (
                <NavItem key={route} svgUrl={svgUrl} route={route} />
            ))}
        </div>
    )
}
