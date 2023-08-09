import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { LinkTokenCreateRequest } from 'plaid';
import { plaidClient } from '../../../lib/plaid';

export async function POST(req: Request) {
  const { userId } = auth();

  //TODO: maybe Redirect the user to login or figure out why this is happening
  if (!userId) {
    return NextResponse.json({ ok: false, message: 'No user found' });
  }
  const request: LinkTokenCreateRequest = {
    user: { client_user_id: userId },
    client_name: 'Expensify App.',
    language: 'en',
    products: ['identity', 'auth', 'transactions'],
    country_codes: ['US', 'CA'],
    redirect_uri: process.env.PLAID_SANDBOX_REDIRECT_URI,
  };
  try {
    const response = await plaidClient.linkTokenCreate(request);
    const linkToken = response.data.link_token;
    return NextResponse.json({ ok: true, linkToken });
  } catch (error) {
    console.log('Error creating link token', error);
  }
}
