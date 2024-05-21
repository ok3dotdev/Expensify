import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { SheetProvider } from "@/providers/sheet-provider";
import { QueryProvider } from "@/providers/query-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expensify",
  description: "Saas application to track your bank transactions and finances.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("min-h-screen bg-gray-50", inter.className)}>
          <QueryProvider>
            {children}
            <Toaster position="bottom-left" />
            <SheetProvider />
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
