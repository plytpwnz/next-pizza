import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany();

    return NextResponse.json(ingredients);
  } catch (error) {
    console.log('[GET_INGREDIENTS] Server Error', error);

    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
