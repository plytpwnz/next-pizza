import { ProductItem } from '@prisma/client';
import { PizzaSize, pizzaTypes } from '../constants/pizza';
import { Variant } from '../components/shared/group-variants';

/**
 *  Функция для получения доступных типов теста у пиццы каждого размера
 * @param items
 * @param size
 * @returns доступные типы пиц для выбранного размера
 */
export const getAvailablePizzaTypes = (items: ProductItem[], size: PizzaSize): Variant[] => {
  const filteredPizzasBySize = items.filter((item) => item.size === size);

  return pizzaTypes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasBySize.some((pizza) => Number(pizza.pizzaType) === Number(item.value)),
  }));
};
