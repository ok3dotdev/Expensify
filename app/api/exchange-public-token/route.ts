import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { plaidClient } from '../../../lib/plaid';
import {
  addAccount,
  addBankNameForItem,
  addItem,
  addUser,
} from '../../../lib/db';

export async function POST(req: Request) {
  const { public_token } = await req.json();

  const { userId } = auth();
  console.log('userId', userId, public_token);

  if (!userId) {
    return NextResponse.redirect('/sign-in');
  }

  try {
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    await addUser(
      userId,
      exchangeResponse.data.access_token,
      exchangeResponse.data.item_id,
    );

    await addItem(
      exchangeResponse.data.item_id,
      userId,
      exchangeResponse.data.access_token,
    );

    await populateBankName(
      exchangeResponse.data.item_id,
      exchangeResponse.data.access_token,
    );

    await populateAccountNames(exchangeResponse.data.access_token, userId);

    //TODO: sync transactions

    return NextResponse.json({ ok: true, message: 'exchange successful' });
  } catch (error) {
    // TODO: Better error handling
    console.log('Error exchanging public token');
    console.error(error);
  }
}

const populateBankName = async (itemId: string, accessToken: string) => {
  try {
    const itemResponse = await plaidClient.itemGet({
      access_token: accessToken,
    });

    const institutionId = itemResponse.data.item.institution_id;

    if (institutionId == null) {
      return;
    }

    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ['US'],
    });

    const institutionName = institutionResponse.data.institution.name;

    await addBankNameForItem(itemId, institutionName);
  } catch (error) {
    console.log(`Ran into an error! ${error}`);
  }
};

const populateAccountNames = async (accessToken: string, userId: string) => {
  try {
    const acctsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const acctsData = acctsResponse.data;

    const itemId = acctsData.item.item_id;

    await Promise.all(
      acctsData.accounts.map(async (acct) => {
        await addAccount(acct.account_id, itemId, acct.name, userId);
      }),
    );
  } catch (error) {
    console.log(`Ran into an error! ${error}`);
  }
};
