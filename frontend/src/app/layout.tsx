import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import RefreshToken from "./func/RefreshToken";
import AppProvider from "./_RTK/provider/AppProvider";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"], // Added subset to fix preload error
});

export const metadata: Metadata = {
  title: "Hotel application",
  description:
    "Hotel application provide room with reservations system with full management system",
  keywords: [
    "next",
    "react",
    "full stack",
    "hotel",
    "redux",
    "express",
    "nodejs",
    "jwt",
    "strip",
    "auth",
    "apis",
    "mySQL",
    "prisma",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}  antialiased   min-h-full`}>
        <AppProvider>
          <RefreshToken />
          <Toaster position="top-center"  reverseOrder={false} />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
