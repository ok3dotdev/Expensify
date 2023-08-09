'use client';
import React from 'react';
import '@/styles/global.css';
import { FormProvider } from '@/components/forms/FormContext';

const AuthRootLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <FormProvider>{children}</FormProvider>
    </div>
  );
};

export default AuthRootLayout;
