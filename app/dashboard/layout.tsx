'use client';
import SideBar from '@/components/SideBar';
import React from 'react';

const RootLayout = ({ children }: any) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <body>
          <div className="h-screen w-screen flex relative">
            <SideBar />
            {children}
          </div>
        </body>
      </head>
    </html>
  );
};

export default RootLayout;
