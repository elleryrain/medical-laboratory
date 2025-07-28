import Logo from '@svg/Logo.svg?react';
import { Calendar } from './calendar/Calendar';
import { Notify } from './notify/Notify';
import { Profile } from './profile/Profile';
import { SearchHeader } from './searchHeader/searchHeader';

export function Header() {
    return (
        <div className="flex justify-center pt-[70px] mr-[50px] ml-[46px]">
            <div className="flex gap-10 w-full">
                <div className="flex items-start gap-5 flex-1">
                    <Logo />
                    <SearchHeader />
                </div>
                <Calendar />
                <Notify />
                <Profile firstName="Екатерина" lastName="Смирнова" role="Администратор" imgUrl="/image/1.jpg" />
            </div>
        </div>
    );
}