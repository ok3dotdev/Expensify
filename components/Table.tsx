'use client';
import React, { useState, useEffect } from 'react';
import { useTransactions } from './context/transactions-provider';

interface Transaction {
  // Define the type for each transaction object here
  id: number;
  date: string;
  amount: number;
  description: string;
  // Add more properties as needed
}

export function Table() {
  const { transactionData, error, isLoading } = useTransactions();
  const { transactions } = transactionData;

  return (
    <div className="mt-4">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : transactionData?.length ? (
        <div>
          <h1>Transactions</h1>
          {/* Render your transaction data here */}
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Description</th>
                {/* Add more table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.description}</td>
                  {/* Add more table cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No transactions</div>
      )}
    </div>
  );
}
