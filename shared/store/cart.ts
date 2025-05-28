import { create } from 'zustand';
import { Api } from '../services/api-client';
import { getCartDetails } from '../lib';
import { CartStateItem } from '../lib/get-cart-details';

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  /* Получение товаров из корзины */
  fetchCartItems: () => Promise<void>;

  /*Запрос на обновление количества товара */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  /* Запрос на добавление товаров из корзины */
  // TODO: ТИПИЗИРОВАТЬ VALUES
  addCartItem: (values: any) => Promise<void>;

  /* Запрос на удаление товаров из корзины */
  removeCartItem: (id: number) => Promise<void>;

  /* Запрос на очистку корзины */
  // clearCart: () => Promise<void>
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  loading: true,
  error: false,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.fetchCart();
      set(getCartDetails(data));
    } catch (error) {
      console.error(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id: number) => {},
  updateItemQuantity: async (id: number, quantity: number) => {},
  addCartItem: async (values: any) => {},
}));
