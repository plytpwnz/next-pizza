'use server';

import { prisma } from '@/prisma/prisma-client';
import { CheckoutFormValues } from '@/shared/components/shared';

export async function createOrder(data: CheckoutFormValues) {
  console.log(data);

  const token = '123';

  await prisma.order.create({
    data: {
      token: token,
      totalAmount: 1500,
      status: 'PENDING',
      items: [],
      fullName: data.firstName + ' ' + data.lastName,
      email: data.email,
      phone: data.phone,
      adress: data.address,
      comment: data.comment,
    },
  });
}
