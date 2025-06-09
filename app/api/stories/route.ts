import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const stories = await prisma.story.findMany({
      include: {
        items: true,
      },
    });

    return NextResponse.json(stories);
  } catch (error) {
    console.log('[GET_STORIES] Server Error', error);

    return NextResponse.json({ message: 'Error' }, { status: 500 });
  }
}
