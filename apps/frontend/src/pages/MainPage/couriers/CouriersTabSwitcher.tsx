import { FC, useState } from 'react';

interface CouriersTabSwitcherProps {
  onTypeDeliveryChange: (typeDelivery: 'pickup' | 'delivery') => void;
}

export const CouriersTabSwitcher: FC<CouriersTabSwitcherProps> = ({
  onTypeDeliveryChange,
}) => {
  const [typeDelivery, setTypeDelivery] = useState<'pickup' | 'delivery'>(
    'delivery',
  );

  const handleTypeChange = (newType: 'pickup' | 'delivery') => {
    setTypeDelivery(newType);
    onTypeDeliveryChange(newType);
  };

  return (
    <div className="flex bg-[#292929] rounded-[15px] justify-between">
      <button
        className={`w-[309px] h-[63px] rounded-[12px] text-[24px] font-medium leading-[29.26px] text-center m-1 cursor-pointer focus:outline-none ${
          typeDelivery === 'delivery'
            ? 'bg-[#E8E8E8] text-black'
            : 'bg-transparent text-white'
        }`}
        onClick={() => handleTypeChange('delivery')}
      >
        Привез
      </button>
      <button
        className={`w-[309px] h-[63px] rounded-[12px] text-[24px] font-medium leading-[29.26px] text-center m-1 cursor-pointer focus:outline-none ${
          typeDelivery === 'pickup'
            ? 'bg-[#E8E8E8] text-black'
            : 'bg-transparent text-white'
        }`}
        onClick={() => handleTypeChange('pickup')}
      >
        Отвез
      </button>
    </div>
  );
};
