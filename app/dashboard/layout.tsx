import { ClerkProvider } from '@clerk/nextjs';
import SideBar from '@/components/SideBar';
import React from 'react';

const RootLayout = ({ children }: any) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClerkProvider>
          <main className="h-screen w-screen flex relative">
            <SideBar />
            {children}
          </main>
        </ClerkProvider>
      </body>
    </html>
  );
};

export default RootLayout;
