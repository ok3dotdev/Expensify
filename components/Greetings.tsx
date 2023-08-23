'use client';
import Card from './Card';
import { UserButton } from '@clerk/nextjs';
import React from 'react';
import { useAuth } from '@clerk/nextjs';
import { useUser } from './context/user-provider';
import { constants } from 'buffer';

const Greetings = () => {
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { userData, error, isLoading } = useUser();

  if (error) {
    console.log(error);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log('userdata', userData);

  return (
    <Card className="w-full py-2 relative mx-auto mb-3 px-4">
      <div className="flex justify-between px-2 items-center">

        <h1 className="text-3xl text-gray-700 font-bold">
          Welcome {userData.name}👋🏾
        </h1>

        <div suppressHydrationWarning>
          <UserButton afterSignOutUrl="/" />
        </div>

      </div>
    </Card>
  );
};

export default Greetings;
