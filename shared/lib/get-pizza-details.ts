import { Ingredient, ProductItem } from '@prisma/client';
import { calcTotalPizzaPrice } from './calc-total-pizza-price';
import { mapPizzaType, PizzaSize, PizzaType } from '../constants/pizza';

export const getPizzaDetails = (
  size: PizzaSize,
  pickedType: string,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const totalPrice = calcTotalPizzaPrice(size, pickedType, items, ingredients, selectedIngredients);
  const textDetails = `${size} см, ${mapPizzaType[Number(pickedType) as PizzaType]} тесто`;

  return { totalPrice, textDetails };
};
