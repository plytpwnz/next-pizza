import React from 'react';
import { WhiteBlock } from '../white-block';
import { CheckoutItemSkeleton } from '../checkout-item-skeleton';
import { CheckoutItem } from '../checkout-item';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { getCartItemDetails } from '@/shared/lib';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';

interface Props {
  items: CartStateItem[];
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  className?: string;
}

export const CheckoutCart: React.FC<Props> = ({
  items,
  removeCartItem,
  updateItemQuantity,
  className,
}) => {
  const onClickCountButton = (id: number, type: 'plus' | 'minus', quantity: number) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <WhiteBlock title="1. Корзина" className={className} endAdornment="удалить">
      <div className="flex flex-col gap-7">
        {items.length === 0
          ? [...Array(5)].map((_, index) => <CheckoutItemSkeleton key={index} />)
          : items.map((item) => (
              <CheckoutItem
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
    </WhiteBlock>
  );
};
