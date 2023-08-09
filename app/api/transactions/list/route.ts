import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { userId } = auth();
  const maxCount = 50;

  if (!userId) {
    return NextResponse.json({ ok: false, message: 'No user found' });
  }

  try {
    const transactions = await getTransactionsForUser(userId, maxCount);

    if (!transactions) {
      return NextResponse.json({
        ok: false,
        message: 'No transactions found',
      });
    }

    return NextResponse.json({ ok: true, transactions });
  } catch (error) {
    console.log(error);
    console.error('Error getting transactions list');
  }
}

const getTransactionsForUser = async (userId: string, maxCount: number) => {
  try {
    return await db.transactions.findMany({
      where: {
        userId,
      },
      take: maxCount,
    });
  } catch (error) {
    console.log(error);
    console.error('Error getting transactions list');
  }
};
