import { useEffect, useState } from 'react';
import { CardViewSwitcher } from '@/components/cardViewSwitcher/CardViewSwitcher';
import { InWorkCard } from './InWorkCard';
import { InWorkFilter } from './InWorkFilter';

export function InWork() {
  const [isGridView, setIsGridView] = useState(() => {
    const savedView = localStorage.getItem('isGridView');
    return savedView ? JSON.parse(savedView) : false;
  });

  useEffect(() => {
    localStorage.setItem('isGridView', JSON.stringify(isGridView));
  }, [isGridView]);

  return (
    <div className="flex flex-col gap-[40px] text-white w-full">
      <div className="flex justify-between w-full">
        <InWorkFilter title={'В работе'} />
        <CardViewSwitcher
          isGridView={isGridView}
          setIsGridView={setIsGridView}
        />
      </div>
      <div
        className={`flex flex-col gap-[45px] ${isGridView ? 'mr-12.5' : ''}`}
      >
        <InWorkCard isGridView={isGridView} />
      </div>
    </div>
  );
}
