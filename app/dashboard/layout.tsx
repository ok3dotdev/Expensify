'use client';
import SideBar from '@/components/SideBar';
import React from 'react';

const RootLayout = ({ children }: any) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <body className="bg-black w-full flex  h-screen mx-auto">
          <div className="w-screen flex relative mx-auto">
            <SideBar />
            {children}
          </div>
        </body>
      </head>
    </html>
  );
};

export default RootLayout;
