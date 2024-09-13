import { z } from 'zod';
import { Hono } from 'hono';
import { parse, subDays } from 'date-fns';
import { createId } from '@paralleldrive/cuid2';
import { zValidator } from '@hono/zod-validator';
import { HTTPException } from 'hono/http-exception';
import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { and, desc, eq, gte, inArray, lte, sql } from 'drizzle-orm';

import { db } from '@/db/drizzle';
import {
  transactions,
  insertTransactionSchema,
  accounts,
  categories,
} from '@/db/schema';

const app = new Hono().post('/transactions', async (c) => {
  const requestBody = await c.req.json();

  const { webhook_code: webhookCode, item_id: plaidItemId } = requestBody;

  switch (webhookCode) {
    case 'SYNC_UPDATES_AVAILABLE':
      console.log('initial update');
      break;
    case 'DEFAULT_UPDATE':
    case 'INITIAL_UPDATE':
    case 'HISTORICAL_UPDATE':
      /* ignore - not needed if using sync endpoint + webhook */
      break;
    default:
  }

  return c.text('Hello world', 200);
});

export default app;
