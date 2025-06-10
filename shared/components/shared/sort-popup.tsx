'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SortPopupList, TSortPopupItem, useSort } from '@/shared/hooks/use-sort';
import { cn } from '@/shared/lib/utils';
import { ArrowUpDown } from 'lucide-react';

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const { active, onClickListItem } = useSort();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  const handlerClickListItem = (item: TSortPopupItem) => {
    onClickListItem(item);
    setOpen(false);
  };

  return (
    <div ref={sortRef} className={cn('', className)}>
      <div
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer">
        <ArrowUpDown size={16} />
        <b>Сортировка:</b>
        <b className="text-primary">{SortPopupList[active].name}</b>
      </div>
      {open && (
        <div className="absolute mt-4 rounded-2xl bg-white">
          <ul>
            {SortPopupList.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer text-[16px]"
                onClick={() => handlerClickListItem(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
