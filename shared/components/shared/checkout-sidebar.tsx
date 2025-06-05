import React from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, BadgePercent, Package, Truck } from 'lucide-react';
import { Button, Skeleton } from '../ui';
import { cn } from '@/shared/lib';

interface Props {
  totalAmount: number;
  loading?: boolean;
  className?: string;
}

const VAT = 15;
const DELIVERY_PRICE = 250;

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading, className }) => {
  const vatPrice = Math.ceil((totalAmount * VAT) / 100);
  const deliveryPrice = DELIVERY_PRICE;
  const totalPrice = totalAmount + vatPrice + deliveryPrice;

  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="h-11 w-28" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">{totalPrice} ₽</span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-300" />
            Стоимость корзины:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16 rounded-[8px]" /> : `${totalAmount} ₽`}
      />

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <BadgePercent size={18} className="mr-2 text-gray-300" />
            Налоги:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16 rounded-[8px]" /> : `${vatPrice} ₽`}
      />

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-300" />
            Доставка:
          </div>
        }
        value={loading ? <Skeleton className="h-6 w-16 rounded-[8px]" /> : `${deliveryPrice} ₽`}
      />

      <Button
        loading={loading}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Оформить заказ
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
