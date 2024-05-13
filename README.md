## Multiple banks feature for Expensify

Allow users add multiple banks and track Transactions

## steps

create a new branch (multi-banks) for development

create a new db (multi-banks) on neon with Drizzle ORM
run npm run db:generate
run npm run db:migrate to apply changes to the new db

change schema and added one to many relationship betweeen bank and accounts

on connect bank add bank and other values to the db

add new routes for banks to routes.ts with hono.js
allow get all banks
allow get banks by id
allow delete all banks
allow delete single bank with account and transactions

create a 'use client' page for banks under app (dashboard)
fetch banks data with hono using a hook

# Connect Bank Flow

user clicks connect bank or add new bank ->
user selects bank and accounts and gets access_tokens ->
server adds new bank details into the DB ->
server fetches accounts, categories, and transactions for user selection and saves to db

## HOW TO START APP

- create .env.local and fill these details
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  CLERK_PUBLISHABLE_KEY
  CLERK_SECRET_KEY
  NEXT_PUBLIC_CLERK_SIGN_IN_URL
  NEXT_PUBLIC_CLERK_SIGN_UP_URL
  DATABASE_URL
  NEXT_PUBLIC_APP_URL
  PLAID_CLIENT_TOKEN
  PLAID_SECRET_TOKEN
  LEMONSQUEEZY_STORE_ID
  LEMONSQUEEZY_PRODUCT_ID
  LEMONSQUEEZY_API_KEY
  LEMONSQUEEZY_WEBHOOK_SECRET

- Run db scripts
  npm run db:generate
  npm run db:migrate
  npm run db:studio

- Run the app
  npm run dev

- visit localhost:3000
