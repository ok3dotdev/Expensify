import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import {
  addNewTransactiontoDB,
  db,
  getItemIdsForUser,
  getItemInfo,
  modifyExistingTransaction,
  saveCursorForItem,
} from '@/lib/db';
import { plaidClient } from '@/lib/plaid';
import { SimpleTransaction } from '@/lib/simpleTransactionObject';

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ ok: false, message: 'No user found' });
    }
    const items = await getItemIdsForUser(userId);

    if (!items) {
      return NextResponse.json({ ok: false, message: 'No items found' });
    }

    const fullResults = await Promise.all(
      items.map(async (item) => {
        return await syncTransactions(item.id);
      }),
    );

    return NextResponse.json({ ok: true, completeResults: fullResults });
  } catch (error) {
    console.log('Error syncing transactions', error);
  }
}

const fetchNewSyncData = async (accessToken: string, initCursor: string) => {
  let keepGoing = false;
  const allData = {
    added: [],
    removed: [],
    modified: [],
    nextCursor: initCursor,
  };

  do {
    const transactionsResponse = await plaidClient.transactionsSync({
      access_token: accessToken,
      cursor: allData.nextCursor,
      options: {
        include_personal_finance_category: true,
      },
    });

    const newData = transactionsResponse.data;
    allData.added = allData.added.concat(newData.added);
    allData.modified = allData.modified.concat(newData.modified);
    allData.removed = allData.removed.concat(newData.removed);
    allData.nextCursor = newData.next_cursor;
    keepGoing = newData.has_more;
  } while (keepGoing === true);
  console.log('Done syncing transactions');
  return allData;
};

const syncTransactions = async (itemId: string) => {
  const summary = { added: 0, removed: 0, modified: 0 };

  //1. Grab our most recent cursor from DB
  const {
    accessToken: access_token,
    transactionCursor,
    userId,
  } = await getItemInfo(itemId);

  //2. Fetch new transactions from Plaid since that cursor
  const allData = await fetchNewSyncData(access_token, transactionCursor);

  //3. Add new transactions to DB
  await Promise.all(
    allData.added.map(async (tnxObj) => {
      const simpleTransaction = SimpleTransaction.fromPlaidTransaction(
        tnxObj,
        userId,
      );
      // console.log(`Adding transaction ${JSON.stringify(simpleTransaction)}`);
      const result = await addNewTransactiontoDB(simpleTransaction);
    }),
  );

  //4. Update any modified Trasactions
  await Promise.all(
    allData.modified.map(async (tnxObj) => {
      const simpleTransaction = SimpleTransaction.fromPlaidTransaction(
        tnxObj,
        userId,
      );
      // console.log(`Adding transaction ${JSON.stringify(simpleTransaction)}`);
      const result = await modifyExistingTransaction(simpleTransaction);
    }),
  );

  //TODO GET crypto for uuid
  //5. Remove any deleted transactions
  // await Promise.all(
  //   allData.removed.map(async (txnObj) => {
  //     console.log(`I want to remove ${txnObj.transaction_id}`);
  //     // const result = await db.deleteExistingTransaction(
  //     //   txnObj.transaction_id
  //     // );
  //     const result = await markTransactionAsRemoved(txnObj.transaction_id);
  //     // if (result) {
  //     //   summary.removed += result.changes;
  //     // }
  //   }),
  // );

  //6. Update the cursor in DB
  await saveCursorForItem(allData.nextCursor, itemId);

  return summary;
};
