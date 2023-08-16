'use client';
import { create } from 'zustand';
import React from 'react';

interface ITransactionsStore {
  transactions: any[];
  setTransactions: (transactions: any[]) => void;
}

export const useTransactionsStore = create<ITransactionsStore>((set) => ({
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
}));
