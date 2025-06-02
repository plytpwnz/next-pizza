import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { findOrCreateCart, updateCartTotalAmount } from '@/shared/lib';
import { createCartItemValues } from '@/shared/services/dto/cart.dto';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token,
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });
    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as createCartItemValues;

    const findCartItem = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      },
      include: {
        ingredients: true,
      },
    });

    const foundItem = findCartItem.find((item) => {
      const ingredients = item.ingredients.map((ingredient) => ingredient.id);
      const dataIngredients = data.ingredients || [];

      return (
        item.ingredients.length === dataIngredients.length &&
        ingredients.every((ingredient) => dataIngredients.includes(ingredient))
      );
    });

    // Если товар найден в корзине, то увеличиваем его количество на 1
    if (foundItem) {
      await prisma.cartItem.update({
        where: {
          id: foundItem.id,
        },
        data: {
          quantity: foundItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: {
            connect: data.ingredients?.map((ingredientId) => ({ id: ingredientId })),
          },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const resp = NextResponse.json(updatedUserCart);

    if (token !== req.cookies.get('cartToken')?.value) {
      resp.cookies.set('cartToken', token);
    }

    return resp;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось создать корзину' }, { status: 500 });
  }
}
