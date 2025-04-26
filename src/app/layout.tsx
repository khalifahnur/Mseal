"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer} from 'react-toastify';
import { fetchUserInfo } from "@/api/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  queryClient.prefetchQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
  });

  return (
    <html>
      <QueryClientProvider client={queryClient}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      </body>
      </QueryClientProvider>
    </html>
  );
}

