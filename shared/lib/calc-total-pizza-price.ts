import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize } from '../constants/pizza';

/**
 * Функция для подсчета общей стоимости пиццы
 * @param size - размер выбранной пиццы
 * @param pickedType - тип выбранной пиццы
 * @param items - список вариаций пицц
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 * @returns number - общая стоимость
 */
export const calcTotalPizzaPrice = (
  size: PizzaSize,
  pickedType: string,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const pizzaPrice =
    items.find((item) => item.size === size && item.pizzaType === Number(pickedType))?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);
  return pizzaPrice + totalIngredientsPrice;
};
