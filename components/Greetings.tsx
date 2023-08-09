'use client';
import Card from './Card';
import { UserButton } from '@clerk/nextjs';
import React, { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { db } from '@/lib/db';

const Greetings = () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [accounts, setAccounts] = React.useState([]);

  if (!isLoaded || !userId) {
    return null;
  }

  useEffect(() => {
    try {
      const getAccounts = async () => {
        const response = await fetch('/api/accounts', {
          method: 'GET',
          cache: 'no-cache',
        });
        const { accounts } = await response.json();
        console.log(accounts);
      };
      getAccounts();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <Card className="w-full py-4 relative">
      <div className="flex justify-between">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">Welcome</h1>
        <UserButton afterSignOutUrl="/" />
      </div>
    </Card>
  );
};

export default Greetings;
