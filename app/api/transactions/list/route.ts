import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { userId } = auth();
  const maxCount = 50;
  const { searchParams } = req.nextUrl;
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';

  if (!userId) {
    return NextResponse.json({ ok: false, message: 'No user found' });
  }

  try {
    const transactions = await getTransactionsForUserInDateRange(
      userId,
      to,
      from,
    );
    // const transactions = await getTransactionsForUser(userId, maxCount);

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

const getTransactionsForUserInDateRange = async (
  userId: string,
  startDate: string,
  endDate: string,
) => {
  try {
    return await db.transactions.findMany({
      where: {
        userId,
        date: {
          lte: startDate, // Greater than or equal to start date
          gte: endDate, // Less than or equal to end date
        },
      },
    });
  } catch (error) {
    console.log(error);
    console.error('Error getting transactions list date range');
  }
};
