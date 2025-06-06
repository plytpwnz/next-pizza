import { NextRequest, NextResponse } from 'next/server';
import { PaymentCallbackData } from '@/@types/yookassa';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { sendEmail } from '@/shared/lib';
import { OrderCancelledTemplate, OrderSuccessTemplate } from '@/shared/components/shared';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    if (!body) {
      return NextResponse.json({ message: 'Bad request' }, { status: 400 });
    }

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    const isSucceded = body.object.status === 'succeeded';

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const items = JSON.parse(order.items as string) as CartItemDTO[];

    if (isSucceded) {
      await sendEmail(
        order.email,
        'Next Pizza / Ваш заказ успешно оформлен 🎉',
        OrderSuccessTemplate({ orderId: order.id, items }),
      );
    } else {
      await sendEmail(
        order.email,
        'Next Pizza / Ваш заказ отменен ❌',
        OrderCancelledTemplate({ orderId: order.id }),
      );
    }
  } catch (error) {
    console.log('[Checkout Callback] Server error', error);

    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
