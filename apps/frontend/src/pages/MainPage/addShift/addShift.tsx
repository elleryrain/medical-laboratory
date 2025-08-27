import Plus from '@svg/plus.svg?react';
import CustomSelect from '../../../components/select/CustomSelect';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';

interface Tooth {
  id: number;
  svgUrl: string;
}

interface ToothImageProps {
  src: string;
  isActive: boolean;
  onClick: () => void;
}

interface AddShiftProps {
  toggleModal: () => void;
}

const ToothImage = ({ src, isActive, onClick }: ToothImageProps) => (
  <div
    className={`cursor-pointer select-none ${isActive ? 'fill-white' : 'fill-transparent'} transition-[fill] duration-300 ease-in-out`}
    onClick={onClick}
  >
    <ReactSVG src={src} />
  </div>
);

export function AddShift({ toggleModal }: AddShiftProps) {
  const [workTypeCount, setWorkTypeCount] = useState<number>(1);
  const [activeTeeth, setActiveTeeth] = useState<number[]>([]);

  const addWorkType = () => {
    setWorkTypeCount(workTypeCount + 1);
  };

  const handleToothClick = (id: number) => {
    setActiveTeeth((prev) => {
      if (prev.includes(id)) {
        return prev.filter((toothId) => toothId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const tooth: Tooth[] = [
    { id: 1, svgUrl: '/src/assets/img/Tooth/1.svg' },
    { id: 2, svgUrl: '/src/assets/img/Tooth/2.svg' },
    { id: 3, svgUrl: '/src/assets/img/Tooth/3.svg' },
    { id: 4, svgUrl: '/src/assets/img/Tooth/4.svg' },
    { id: 5, svgUrl: '/src/assets/img/Tooth/5.svg' },
    { id: 6, svgUrl: '/src/assets/img/Tooth/6.svg' },
    { id: 7, svgUrl: '/src/assets/img/Tooth/7.svg' },
    { id: 8, svgUrl: '/src/assets/img/Tooth/8.svg' },
    { id: 9, svgUrl: '/src/assets/img/Tooth/9.svg' },
    { id: 10, svgUrl: '/src/assets/img/Tooth/10.svg' },
    { id: 11, svgUrl: '/src/assets/img/Tooth/11.svg' },
    { id: 12, svgUrl: '/src/assets/img/Tooth/12.svg' },
    { id: 13, svgUrl: '/src/assets/img/Tooth/13.svg' },
    { id: 14, svgUrl: '/src/assets/img/Tooth/14.svg' },
    { id: 15, svgUrl: '/src/assets/img/Tooth/15.svg' },
    { id: 16, svgUrl: '/src/assets/img/Tooth/16.svg' },
    { id: 17, svgUrl: '/src/assets/img/Tooth/17.svg' },
    { id: 18, svgUrl: '/src/assets/img/Tooth/18.svg' },
    { id: 19, svgUrl: '/src/assets/img/Tooth/19.svg' },
    { id: 20, svgUrl: '/src/assets/img/Tooth/20.svg' },
    { id: 21, svgUrl: '/src/assets/img/Tooth/21.svg' },
    { id: 22, svgUrl: '/src/assets/img/Tooth/22.svg' },
    { id: 23, svgUrl: '/src/assets/img/Tooth/23.svg' },
    { id: 24, svgUrl: '/src/assets/img/Tooth/24.svg' },
    { id: 25, svgUrl: '/src/assets/img/Tooth/25.svg' },
    { id: 26, svgUrl: '/src/assets/img/Tooth/26.svg' },
    { id: 27, svgUrl: '/src/assets/img/Tooth/27.svg' },
    { id: 28, svgUrl: '/src/assets/img/Tooth/28.svg' },
    { id: 29, svgUrl: '/src/assets/img/Tooth/29.svg' },
    { id: 30, svgUrl: '/src/assets/img/Tooth/30.svg' },
    { id: 31, svgUrl: '/src/assets/img/Tooth/31.svg' },
    { id: 32, svgUrl: '/src/assets/img/Tooth/32.svg' },
  ];

  return (
    <div className="flex flex-col items-center bg-[#1c1c1c] w-fit p-[30px 30px 30px 35px] mr-[30px] rounded-[30px] gap-[30px]">
      <div className="flex flex-col gap-5 w-full">
        <CustomSelect placeholder="Врач" options={['Врач 1', 'Врач 2']} />
        <input
          className="w-full h-[71px] rounded-[15px] bg-[#333333] border-none px-6 text-[24px] font-medium text-white outline-none placeholder:text-[#b9b9b9]"
          placeholder="Пациент"
        />
        {[...Array(workTypeCount)].map((_, index) => (
          <CustomSelect
            key={index}
            placeholder="Вид работы"
            options={['1', '2']}
          />
        ))}
        <div
          className="w-full h-[71px] rounded-[15px] border-2 border-dashed border-[#d2d2d2] flex items-center justify-center gap-[17px] text-white text-[24px] font-medium cursor-pointer hover:bg-[#2a2a2a]"
          onClick={addWorkType}
        >
          <Plus stroke="white" />
          Добавить вид работы
        </div>
        <input
          className="w-full h-[71px] rounded-[15px] bg-[#333333] border-none px-6 text-[24px] font-medium text-white outline-none placeholder:text-[#b9b9b9]"
          placeholder="Цвет работы"
        />
      </div>
      <div className="flex flex-col items-center gap-[10px] w-[730px] pt-[35px]">
        <div className="flex gap-[18px]">
          <div className="flex gap-[5px]">
            {tooth.slice(0, 8).map((tooth, index) => (
              <div
                key={tooth.id}
                className="flex flex-col items-center gap-[5px]"
                style={{ marginTop: `${index * 5}px` }}
              >
                <ToothImage
                  src={tooth.svgUrl}
                  isActive={activeTeeth.includes(tooth.id)}
                  onClick={() => handleToothClick(tooth.id)}
                />
                <span className="text-white text-[16px] font-medium">
                  {tooth.id}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-[5px]">
            {tooth.slice(8, 16).map((tooth, index) => (
              <div
                key={tooth.id}
                className="flex flex-col items-center gap-[5px]"
                style={{ marginTop: `${(7 - index) * 5}px` }}
              >
                <ToothImage
                  src={tooth.svgUrl}
                  isActive={activeTeeth.includes(tooth.id)}
                  onClick={() => handleToothClick(tooth.id)}
                />
                <span className="text-white text-[16px] font-medium">
                  {tooth.id}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row-reverse gap-[16px]">
          <div className="flex flex-row-reverse gap-[7px]">
            {tooth.slice(16, 24).map((tooth, index) => (
              <div
                key={tooth.id}
                className="flex flex-col items-center gap-[5px]"
                style={{ marginTop: `${(7 - index) * 5}px` }}
              >
                <ToothImage
                  src={tooth.svgUrl}
                  isActive={activeTeeth.includes(tooth.id)}
                  onClick={() => handleToothClick(tooth.id)}
                />
                <span className="text-white text-[16px] font-medium">
                  {tooth.id}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-row-reverse gap-[7px]">
            {tooth.slice(24, 32).map((tooth, index) => (
              <div
                key={tooth.id}
                className="flex flex-col items-center gap-[5px]"
                style={{ marginTop: `${index * 5}px` }}
              >
                <ToothImage
                  src={tooth.svgUrl}
                  isActive={activeTeeth.includes(tooth.id)}
                  onClick={() => handleToothClick(tooth.id)}
                />
                <span className="text-white text-[16px] font-medium">
                  {tooth.id}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="w-full h-[71px] rounded-[15px] bg-[#bdff67] text-black flex items-center justify-center mt-[50px] text-[24px] font-medium cursor-pointer"
        onClick={toggleModal}
      >
        Сохранить
      </div>
    </div>
  );
}
