'use client';

import { useCartStore } from '@/shared/store/cart';
import React from 'react';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';
import { useRouter } from 'next/navigation';
import { ProductWithRelations } from '@/@types/prisma';
import toast from 'react-hot-toast';

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
  className?: string;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
  const { addCartItem, loading } = useCartStore((state) => state);
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      if (isPizzaForm && productItemId) {
        await addCartItem({
          productItemId: productItemId,
          ingredients: ingredients,
        });
      } else {
        await addCartItem({
          productItemId: firstItem.id,
        });
      }

      toast.success(product.name + ' добавлен(а) в корзину');

      _onSubmit?.();
    } catch (error) {
      toast.error('Не удалось добавить продукт в корзину');
      console.error(error);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstItem.price}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};
