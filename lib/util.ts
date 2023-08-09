import util from 'util';
import { plaidClient } from './plaid';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const prettyPrintResponse = (response) => {
  console.log(util.inspect(response.data, { colors: true, depth: 4 }));
};

export const getTransactions = async (access_token: string) => {
  // Set cursor to empty to receive all historical updates
  let cursor = null;

  // New transaction updates since "cursor"
  let added = [];
  let modified = [];
  // Removed transaction ids
  let removed = [];
  let hasMore = true;
  // Iterate through each page of new transaction updates for item
  while (hasMore) {
    const request = {
      access_token,
      cursor: cursor,
    };
    const response = await plaidClient.transactionsSync(request);
    const data = response.data;
    // Add this page of results
    added = added.concat(data.added);
    modified = modified.concat(data.modified);
    removed = removed.concat(data.removed);
    hasMore = data.has_more;
    // Update cursor to the next cursor
    cursor = data.next_cursor;
  }

  const compareTxnsByDateAscending = (a, b) =>
    (a.date > b.date) - (a.date < b.date);
  // Return the 8 most recent transactions
  const results = [...added].sort(compareTxnsByDateAscending).slice(-8);

  return results;
};
