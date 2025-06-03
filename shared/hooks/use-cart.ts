'use client';

import { useEffect } from 'react';
import { useCartStore } from '../store/cart';
import { CartStateItem } from '../lib/get-cart-details';

type ReturnProps = {
  items: CartStateItem[];
  totalAmount: number;
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
};

export const useCart = (): ReturnProps => {
  const { items, totalAmount, loading, fetchCartItems, updateItemQuantity, removeCartItem } =
    useCartStore((state) => state);

  useEffect(() => {
    fetchCartItems();
  }, []);

  return { items, totalAmount, loading, updateItemQuantity, removeCartItem };
};
