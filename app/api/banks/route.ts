import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.redirect('/sign-in');
  }

  try {
    const response = await db.items.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        bankName: true,
      },
    });

    return NextResponse.json({ ok: true, banks: response });
  } catch (error) {
    console.log('Error getting accounts');
    console.error(error);
  }
}
