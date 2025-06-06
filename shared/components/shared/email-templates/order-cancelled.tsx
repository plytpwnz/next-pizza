import React from 'react';

interface Props {
  orderId: number;
}

export const OrderCancelledTemplate: any = ({ orderId }: Props) => (
  <div>
    <h1>Ваш заказ #{orderId} отменен. ❌</h1>

    <p>Вы не произвели оплату заказа в срок или отказались от него. 😩 </p>
  </div>
);
