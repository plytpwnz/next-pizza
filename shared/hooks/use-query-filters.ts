'use client';

import { useEffect } from 'react';
import { Filters } from './use-filters';
import qs from 'qs';
import { useRouter } from 'next/navigation';

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  const params = {
    ...filters.prices,
    pizzaTypes: Array.from(filters.pizzaTypes),
    sizes: Array.from(filters.sizes),
    ingredients: Array.from(filters.selectedIngredients),
  };
  const query = qs.stringify(params, {
    arrayFormat: 'comma',
  });

  useEffect(() => {
    router.push(`?${query}`, { scroll: false });
  }, [query]);
  // [filters, router]
};
