import { useStaffStore } from '@/store/StaffPageStore';
import ArrowLink from '@svg/ArrowLinkStaff.svg?react';
import { useNavigate } from 'react-router-dom';

export function StaffPageCard() {
  const categoryStaffPage = useStaffStore((state) => state.categoryStaffPage);
  const navigate = useNavigate();
  return (
    <div className="flex w-full justify-between flex-wrap gap-8">
      {categoryStaffPage.map((category) => (
        <div
          key={category.id}
          className="flex justify-between items-center p-4 pl-7 w-[397px] max-h-[120px] bg-[#1c1c1c] rounded-[20px]"
        >
          <div className="flex flex-col max-w-[220px] gap-1">
            <span className="text-white text-[32px] font-medium">
              {category.nameCategory}
            </span>
            <span className="text-[#c5c5c5] text-xl font-normal">
              {category.counterCategory} {category.nameSubcategory}
            </span>
          </div>
          <div
            className="flex justify-center items-center h-[86px] w-[86px] bg-[#333333] rounded-[10px] cursor-pointer"
            onClick={() => navigate(category.route)}
          >
            <ArrowLink />
          </div>
        </div>
      ))}
    </div>
  );
}
