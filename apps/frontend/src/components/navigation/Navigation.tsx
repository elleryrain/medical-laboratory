import HomeIcon from '/src/assets/img/HomeIcon.svg';
import StaffIcon from '/src/assets/img/StaffIcon.svg';
import StatisticsIcon from '/src/assets/img/StatisticsIcon.svg';
import SalariesIcon from '/src/assets/img/SalariesIcon.svg';
import WarehouseIcon from '/src/assets/img/WarehouseIcon.svg';
import ArchiveIcon from '/src/assets/img/ArchiveIcon.svg';

import { routes } from '../../config/routes';
import { NavItem } from './navItem/NavItem';

const NavItems = [
  { svgUrl: HomeIcon, route: routes.main },
  { svgUrl: StaffIcon, route: routes.staff },
  { svgUrl: StatisticsIcon, route: routes.statistics },
  { svgUrl: SalariesIcon, route: routes.salaries },
  { svgUrl: WarehouseIcon, route: routes.warehouse },
  { svgUrl: ArchiveIcon, route: routes.archive },
];

export function Navigation() {
  return (
    <div className="flex flex-col gap-[25px]">
      {NavItems.map(({ svgUrl, route }) => (
        <NavItem key={route} svgUrl={svgUrl} route={route} />
      ))}
    </div>
  );
}
