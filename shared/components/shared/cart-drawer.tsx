'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { Title } from './title';
import { DialogTitle } from '../ui/dialog';
import { useCart } from '@/shared/hooks';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { items, totalAmount, loading, updateItemQuantity, removeCartItem } = useCart();

  const onClickCountButton = (id: number, type: 'plus' | 'minus', quantity: number) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f5f0ec]">
        {totalAmount > 0 ? (
          <>
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
                  {...item}
                  onClickCountButton={(type) => onClickCountButton(item.id, type, item.quantity)}
                  onClickRemove={() => removeCartItem(item.id)}
                  details={getCartItemDetails(
                    item.ingredients,
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize,
                  )}
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

                <Link href="/checkout">
                  <Button loading={loading} type="submit" className="w-full h-12 text-base">
                    Оформить заказ
                    <ArrowRight className="w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <DialogTitle className="hidden" />
            <img src="/assets/images/empty-box.png" alt="empty box" width={120} height={120} />
            <Title size="sm" text="Корзина пустая" className="text-center font-bold my-2" />
            <p className="text-center text-neutral-500 mb-5">
              Добавьте хотя бы один товар в корзину, чтобы совершить заказ
            </p>

            <SheetClose className="inline-flex items-center justify-center active:translate-y-[1px] font-medium ring-offset-background transition-colors bg-primary text-primary-foreground hover:bg-primary/90 w-56 h-12 text-base rounded-md px-8 cursor-pointer">
              <ArrowLeft className="w-5 mr-2" />
              Вернуться назад
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
