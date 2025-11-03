import ArrowLink from '@svg/ArrowLinkStaff.svg?react';

export function InWorkCardItems() {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex justify-between gap-[160px]">
        <div className="flex gap-[15px]">
          <img
            src="/image/2.png"
            alt=""
            className="h-[60px] w-[60px] object-cover rounded-full"
          />
          <div className="flex flex-col justify-center gap-[6px]">
            <span className="text-[#C5C5C5] text-[17px] font-normal whitespace-nowrap">
              Врач
            </span>
            <span className="text-[20px] font-medium whitespace-nowrap">
              Тикус С. А.
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center items-end gap-[2px] pr-[14px]">
          <span className="text-[17px] font-normal whitespace-nowrap">
            13.05.2024
          </span>
          <span className="text-[20px] font-normal whitespace-nowrap">
            205281
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex justify-between gap-[40px]">
          <div className="flex flex-col gap-[6px]">
            <span className="text-[#C5C5C5] text-[17px] font-normal whitespace-nowrap">
              Пациент
            </span>
            <span className="text-[20px] font-medium whitespace-nowrap">
              Полякова Екатерина
            </span>
          </div>
          <div className="flex flex-col gap-[6px]">
            <span className="text-[#C5C5C5] text-[17px] font-normal whitespace-nowrap">
              Примерка 1
            </span>
            <span className="text-[20px] font-medium whitespace-nowrap">
              15.05.2024 | 12:30
            </span>
          </div>
        </div>

        <div className="flex justify-between gap-[40px]">
          <div className="flex flex-col gap-[6px]">
            <span className="text-[#C5C5C5] text-[17px] font-normal whitespace-nowrap">
              Техник
            </span>
            <span className="text-[20px] font-medium whitespace-nowrap">
              Сережа Колбин
            </span>
          </div>
          <div className="flex flex-col gap-[6px]">
            <span className="text-[#C5C5C5] text-[17px] font-normal whitespace-nowrap">
              Примерка 2
            </span>
            <span className="text-[20px] font-medium whitespace-nowrap">
              17.05.2024 | 14:20
            </span>
          </div>
        </div>

        <div className="flex justify-between gap-[40px]">
          <div className="flex flex-col gap-[6px]">
            <span className="text-[#C5C5C5] text-[17px] font-normal whitespace-nowrap">
              Вид работы
            </span>
            <span className="text-[20px] font-medium whitespace-nowrap">
              Временные коронки
            </span>
          </div>
          <div className="flex flex-col gap-[6px]">
            <span className="text-[#C5C5C5] text-[17px] font-normal whitespace-nowrap">
              Дата сдачи
            </span>
            <span className="text-[20px] font-medium whitespace-nowrap">
              23.05.2024 | 10:00
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex gap-[12px]">
          <button className="bg-[#BDFF67] text-black text-[20px] font-medium border-none px-[33px] py-[13px] rounded-full cursor-pointer">
            Закрыть наряд
          </button>
          <button className="flex items-center justify-center bg-[#333333] border-none h-[50px] w-[50px] rounded-full cursor-pointer">
            <ArrowLink className="h-[50px] w-[50px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
