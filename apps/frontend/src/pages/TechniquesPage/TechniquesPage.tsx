import { routes } from '../../config/routes';
import ArrowLeft from '@svg/ArrowLeft.svg?react';
import { useNavigate } from 'react-router-dom';
import { TechniquesPageCard } from './TechniquesPageCard';
import { Button } from '@/components/button/Button';

export function TechniquesPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-10 mt-[2px] w-full mr-[50px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5 h-[54px]">
          <ArrowLeft onClick={() => navigate(routes.staff)} className="cursor-pointer" />
          <span className="text-white text-[40px] font-medium">Техники</span>
        </div>
        <Button title='Добавить техника' theme='addButton'/>
      </div>
      <TechniquesPageCard />
    </div>
  );
}