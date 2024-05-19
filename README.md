# Expensify Multiple Banks Feature Documentation

This documentation provides instructions on adding multiple banks and tracking transactions in Expensify.

## Steps

1. **Create a New Branch for Development**
   - Create a branch named `multi-banks`.

2. **Set Up the Database**
   - Create a new database named `multi-banks` on Neon using Drizzle ORM.
   - Run `npm run db:generate`.
   - Run `npm run db:migrate` to apply changes to the new database.

3. **Schema Changes**
   - Modify the schema to establish a one-to-many relationship between banks and accounts.

4. **Connecting a Bank**
   - When a bank is connected, add the bank and other relevant values to the database.

5. **Add New Routes for Banks**
   - Update `routes.ts` with Hono.js to include the following routes:
     - Get all banks
     - Get bank by ID
     - Delete all banks
     - Delete a single bank along with its accounts and transactions

6. **Create a Client Page for Banks**
   - Under the `app/dashboard` directory, create a 'use client' page for banks.
   - Use a hook to fetch banks data with Hono.

## Connect Bank Flow

1. User clicks "Connect Bank" or "Add New Bank".
2. User selects a bank and accounts, then obtains access tokens.
3. Server adds new bank details to the database.
4. Server fetches accounts, categories, and transactions for user selection and saves them to the database.

## How to Start the App

1. **Create `.env.local` File**
   - Populate it with the following details:
     ```
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
     CLERK_PUBLISHABLE_KEY=
     CLERK_SECRET_KEY=
     NEXT_PUBLIC_CLERK_SIGN_IN_URL=
     NEXT_PUBLIC_CLERK_SIGN_UP_URL=
     DATABASE_URL=
     NEXT_PUBLIC_APP_URL=
     PLAID_CLIENT_TOKEN=
     PLAID_SECRET_TOKEN=
     LEMONSQUEEZY_STORE_ID=
     LEMONSQUEEZY_PRODUCT_ID=
     LEMONSQUEEZY_API_KEY=
     LEMONSQUEEZY_WEBHOOK_SECRET=
     ```

2. **Run Database Scripts**
   - Run `npm run db:generate`.
   - Run `npm run db:migrate`.
   - Run `npm run db:studio`.

3. **Run the App**
   - Execute `npm run dev`.

4. **Access the App**
   - Open your browser and visit `localhost:3000`.
