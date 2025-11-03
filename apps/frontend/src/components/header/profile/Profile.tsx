import { Button } from '@/components/button/Button';
import { FC, useState, useRef } from 'react';
import Delete from '@svg/Delete.svg?react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useLogout } from '@/hooks/useLogout';

interface IProfileProps {
  firstName: string;
  lastName: string;
  imgUrl: string;
  role: string;
}

export const Profile: FC<IProfileProps> = ({
  firstName,
  lastName,
  imgUrl,
  role,
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapperRef, () => setIsOpenMenu(false), isOpenMenu);

  return (
    <div ref={wrapperRef} className="relative select-none">
      <div
        className="flex justify-center gap-5 cursor-pointer"
        onClick={() => {
          setIsOpenMenu(!isOpenMenu);
        }}
      >
        <div className="flex flex-col items-end gap-2">
          <span className="text-2xl font-normal text-white">
            {firstName} {lastName}
          </span>
          <span className="text-2xl font-normal text-[#C5C5C5]">{role}</span>
        </div>
        <div className="relative h-[70px] w-[70px]">
          <img
            className="w-full h-full rounded-full object-cover"
            src={imgUrl}
            alt={`${firstName} ${lastName}'s profile`}
          />
          {isOpenMenu && (
            <div
              className="absolute top-0 left-0 h-full w-full flex items-center justify-center rounded-full overflow-hidden"
              onClick={() => {
                setIsOpenMenu(!isOpenMenu);
              }}
            >
              <div className="absolute top-0 left-0 backdrop-blur-[2px] h-full w-full bg-[#303030]/81 rounded-full z-[2]"></div>
              <Delete className="z-[3] cursor-pointer" />
            </div>
          )}
        </div>
      </div>
      {isOpenMenu && (
        <div className="absolute top-22.5 right-0 flex flex-col items-end gap-5 z-2">
          <Button
            theme="liquidGlass"
            title="Мои данные"
            className="text-white"
          />
          <Button
            theme="liquidGlass"
            title="Выйти"
            className="flex-row-reverse text-[#FF9699]"
            onClick={useLogout()}
          >
            <h1 className="text-white text-xl">из аккаунта</h1>
          </Button>
        </div>
      )}
    </div>
  );
};
