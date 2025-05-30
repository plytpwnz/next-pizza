import { ApiRoutes } from './constants';
import { axiosInstance } from './instance';
import { CartDTO, createCartItemValues } from './dto/cart.dto';

export const getCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>(ApiRoutes.CART);

  return data;
};

export const updateItemQuantity = async (itemid: number, quantity: number): Promise<CartDTO> => {
  const { data } = await axiosInstance.patch<CartDTO>(`${ApiRoutes.CART}/${itemid}`, { quantity });

  return data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  const { data } = await axiosInstance.delete<CartDTO>(`${ApiRoutes.CART}/${id}`);

  return data;
};

export const addCartItem = async (values: createCartItemValues): Promise<CartDTO> => {
  const { data } = await axiosInstance.post<CartDTO>(ApiRoutes.CART, values);

  return data;
};
