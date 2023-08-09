import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.redirect('/sign-in');
  }

  try {
    const response = await db.accounts.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json({ ok: true, accounts: response });
  } catch (error) {
    console.log('Error getting accounts');
    console.error(error);
  }
}
