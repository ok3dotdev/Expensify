import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId } = auth();
  const { username } = await req.json();
  console.log('body', username);

  if (!userId) {
    return NextResponse.redirect('/sign-in');
  }

  try {
    await db.users.upsert({
      where: {
        clerkUserId: userId,
      },
      update: {
        name: username,
      },
      create: {
        clerkUserId: userId,
        name: username,
      },
    });
  } catch (error) {
    console.log(error);
    console.error('Error updating user');
  }
}

export async function GET(req: NextRequest) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.redirect('/sign-in');
  }

  const user = await db.users.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  return NextResponse.json(user);
}
