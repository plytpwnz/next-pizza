'use client';

import { useState } from 'react';

export type TSortPopupItem = {
  name: string;
  sortProperty: string;
};

export const SortPopupList: TSortPopupItem[] = [
  { name: 'цене (▼)', sortProperty: 'desc' },
  { name: 'цене (▲)', sortProperty: 'asc' },
];

export const useSort = () => {
  const [active, setActive] = useState(0);

  const onClickListItem = (item: TSortPopupItem) => {
    setActive(SortPopupList.indexOf(item));
  };

  return { active, onClickListItem };
};
