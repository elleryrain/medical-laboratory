import ScrollContainer from 'react-indiana-drag-scroll';
import { InWorkCardItem } from './InWorkCardItem';
import './styles/InWorkCard.css';

interface InWorkCardProps {
  isGridView: boolean;
}

export const InWorkCard = ({ isGridView }: InWorkCardProps) => {
  if (isGridView) {
    return (
      <div className="grid grid-cols-3 gap-x-[21px] gap-y-7.5 pt-[15px] w-full">
        <InWorkCardItem />
        <InWorkCardItem />
        <InWorkCardItem />
        <InWorkCardItem />
        <InWorkCardItem />
      </div>
    );
  }

  return (
    <ScrollContainer className="flex flex-row pt-[15px] gap-[25px] w-full no-scrollbar">
      <InWorkCardItem />
      <InWorkCardItem />
      <InWorkCardItem />
      <InWorkCardItem />
      <InWorkCardItem />
    </ScrollContainer>
  );
};
