'use client';
import Card from './Card';
import { UserButton } from '@clerk/nextjs';
import React from 'react';
import { useAuth } from '@clerk/nextjs';

const Greetings = () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <Card className="w-full py-2 relative">
      <div className="flex justify-between">
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Welcome Henry 👋🏾
        </h1>
        <div suppressHydrationWarning>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </Card>
  );
};

export default Greetings;
