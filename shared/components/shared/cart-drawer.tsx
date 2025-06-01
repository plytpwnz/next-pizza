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
  const { items, totalAmount, loading, fetchCartItems, updateItemQuantity, removeCartItem } =
    useCartStore((state) => state);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const onClickCountButton = (id: number, type: 'plus' | 'minus', quantity: number) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

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
              onClickCountButton={(type) => onClickCountButton(item.id, type, item.quantity)}
              onClickRemove={() => removeCartItem(item.id)}
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
              <Button loading={loading} type="submit" className="w-full h-12 text-base">
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
