'use client';
import SideBar from '@/components/SideBar';
import React from 'react';

const RootLayout = ({ children }: any) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <body className="h-screen w-screen flex relative">
          <SideBar />
          {children}
        </body>
      </head>
    </html>
  );
};

export default RootLayout;
