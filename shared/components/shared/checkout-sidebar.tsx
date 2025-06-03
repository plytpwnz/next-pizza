import React from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, BadgePercent, Package, Truck } from 'lucide-react';
import { Button } from '../ui';
import { cn } from '@/shared/lib';

interface Props {
  totalAmount: number;
  className?: string;
}

const VAT = 15;
const DELIVERY_PRICE = 250;

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, className }) => {
  const vatPrice = Math.ceil((totalAmount * VAT) / 100);
  const deliveryPrice = DELIVERY_PRICE;
  const totalPrice = totalAmount + vatPrice + deliveryPrice;

  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        <span className="text-[34px] font-extrabold">{totalPrice} ₽</span>
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-300" />
            Стоимость корзины:
          </div>
        }
        value={totalAmount}
      />

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <BadgePercent size={18} className="mr-2 text-gray-300" />
            Налоги:
          </div>
        }
        value={vatPrice}
      />

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-300" />
            Доставка:
          </div>
        }
        value={deliveryPrice}
      />

      <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
