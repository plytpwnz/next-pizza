'use client';

import { cn } from '@/shared/lib/utils';
import React, { useState } from 'react';
import { Button } from '../ui';
import { DialogTitle } from '../ui/dialog';
import { PizzaImage } from './pizza-image';
import { GroupVariants } from './group-variants';
import { PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/shared/constants/pizza';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items?: any[];
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAdd,
  className,
}) => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const textDetails = '30 см, традиционное тесто 30';
  const totalPrice = 350;

  return (
    <div className={cn('flex flex-1', className)}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <DialogTitle className="font-extrabold mb-1 text-2xl">{name}</DialogTitle>

        <p className="text-gray-400">{textDetails}</p>

        <div className='flex flex-col gap-3 mt-5'>
          <GroupVariants
            items={pizzaSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <Button className="h-[55px] px-10 text-base rounded-[25px] w-full mt-10">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
