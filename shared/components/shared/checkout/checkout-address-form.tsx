import React from 'react';
import { WhiteBlock } from '../white-block';
import { Input, Textarea } from '../../ui';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <Input name="firstName" className="text-base" placeholder="Введите адрес..." />
        <Textarea
          className="text-base resize-none h-20"
          rows={5}
          placeholder="Комментарий к заказу"
        />
      </div>
    </WhiteBlock>
  );
};
