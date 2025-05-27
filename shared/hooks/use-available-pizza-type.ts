import { Variant } from '../components/shared/group-variants';
import { PizzaType } from '../constants/pizza';

export const useAvailablePizzaType = (availableTypes: Variant[], type: PizzaType) => {
  const variantsType = availableTypes.filter((item) => !item.disabled);
  return variantsType.length > 1 ? variantsType[type - 1].value : variantsType[0].value;
};
