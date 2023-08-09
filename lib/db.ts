import { PrismaClient } from '@prisma/client';
import { SimpleTransaction } from './simpleTransactionObject';

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export async function addBankNameForItem(itemId: string, bankName: string) {
  try {
    return await prisma.items.update({
      where: {
        id: itemId,
      },
      data: {
        bankName,
      },
    });
  } catch (error) {
    console.error('Error updating bank name for item', itemId, error);
    throw new Error(`Failed to update bank name for item ${itemId}`);
  }
}

export async function addAccount(
  accountId: string,
  itemId: string,
  accountName: string,
  userId: string,
) {
  try {
    return await prisma.accounts.create({
      data: {
        id: accountId,
        itemId,
        name: accountName,
        userId,
      },
    });
  } catch (error) {
    console.error('Error updating account', accountId, error);
    throw new Error(`Failed to update account ${accountId}`);
  }
}

export async function getItemIdsForUser(userId: string) {
  try {
    return await prisma.items.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });
  } catch (error) {
    console.log(error);
    console.error('Error getting item ids for user', userId);
  }
}

export async function addItem(
  itemId: string,
  userId: string,
  accessToken: string,
) {
  try {
    return await prisma.items.create({
      data: {
        id: itemId,
        userId,
        accessToken,
      },
    });
  } catch (error) {
    console.log(error);
    console.error('Error adding item', itemId);
  }
}

export async function addUser(
  userId: string,
  accessToken: string,
  itemId: string,
) {
  try {
    return await db.users.create({
      data: {
        clerkUserId: userId,
        accessCode: accessToken,
        itemid: itemId,
      },
    });
  } catch (error) {
    console.log(error);
    console.error('Error updating user info', userId);
  }
}

export async function getItemInfo(itemId: string) {
  try {
    return await db.items.findUnique({
      where: {
        id: itemId,
      },
      select: {
        accessToken: true,
        userId: true,
        transactionCursor: true,
      },
    });
  } catch (error) {
    console.log(error);
    console.error('Error getting item info');
  }
}

export async function addNewTransactiontoDB(simpleTransaction) {
  try {
    return await db.transactions.upsert({
      where: {
        id: simpleTransaction.id,
      },
      update: {
        id: simpleTransaction.id,
        userId: simpleTransaction.userId,
        accountId: simpleTransaction.accountId,
        category: simpleTransaction.category,
        date: simpleTransaction.date,
        authorizedDate: simpleTransaction.authorizedDate,
        name: simpleTransaction.name,
        amount: simpleTransaction.amount,
      },
      create: {
        id: simpleTransaction.id,
        userId: simpleTransaction.userId,
        accountId: simpleTransaction.accountId,
        category: simpleTransaction.category,
        date: simpleTransaction.date,
        authorizedDate: simpleTransaction.authorizedDate,
        name: simpleTransaction.name,
        amount: simpleTransaction.amount,
      },
    });
  } catch (error) {
    console.log(error);
    console.error('Error adding new transaction to DB');
  }
}

export async function modifyExistingTransaction(simpleTransaction) {
  try {
    return await db.transactions.update({
      where: {
        id: simpleTransaction.id,
      },
      data: {
        id: simpleTransaction.id,
        accountId: simpleTransaction.accountId,
        category: simpleTransaction.category,
        date: simpleTransaction.date,
        authorizedDate: simpleTransaction.authorizedDate,
        name: simpleTransaction.name,
        amount: simpleTransaction.amount,
      },
    });
  } catch (error) {
    console.log(error);
    console.error('Error modifying existing transaction');
  }
}

export async function markTransactionAsRemoved(transactionId) {
  const updatedId = transactionId + '-REMOVED-' + crypto.randomUUID();
  try {
    return await db.transactions.update({
      where: {
        id: transactionId,
      },
      data: {
        id: updatedId,
        isRemoved: 1,
      },
    });
  } catch (error) {
    console.log(error);
    console.error('Error marking transaction as removed');
  }
}

export async function saveCursorForItem(cursor, itemId) {
  try {
    return await db.items.update({
      where: {
        id: itemId,
      },
      data: {
        transactionCursor: cursor,
      },
    });
  } catch (error) {
    console.log(error);
    console.error('Error saving cursor for item');
  }
}

export const db = prisma;
