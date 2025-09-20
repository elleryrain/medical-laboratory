import Delete from '@svg/Delete.svg?react';

export function InWorkFilterItem() {
  const firstName = 'Иван';
  const lastName = 'Иванов';

  return (
    <div className="flex items-center justify-center gap-2 bg-[#2D2D2D] rounded-full px-5 py-2.5 [&>svg]:cursor-pointer">
      <span className="text-[24px] font-normal text-white">
        {firstName} {lastName}
      </span>
      <Delete />
    </div>
  );
}
