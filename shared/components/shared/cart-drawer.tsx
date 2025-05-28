'use client';

import React, { useEffect } from 'react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { useCartStore } from '@/shared/store/cart';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  const { totalAmount, fetchCartItems, items } = useCartStore((state) => state);

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f6f6f6]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">{items.length} товар(а)</span>
          </SheetTitle>
        </SheetHeader>

        {/* ITEMS */}
        <div className="overflow-auto scrollbar flex-1">
          {items.map((item) => (
            <CartDrawerItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              details={
                item.pizzaSize && item.pizzaType
                  ? getCartItemDetails(
                      item.ingredients,
                      item.pizzaType as PizzaType,
                      item.pizzaSize as PizzaSize,
                    )
                  : ''
              }
            />
          ))}
          {/* <CartDrawerItem
            id={1}
            imageUrl={
              'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp'
            }
            name={'Пепперони фреш'}
            quantity={1}
            price={495}
            details="30 см, традиционное тесто."
          /> */}
        </div>

        <SheetFooter className="bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4 ">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">{totalAmount} ₽</span>
            </div>

            <Link href="/cart">
              <Button type="submit" className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
