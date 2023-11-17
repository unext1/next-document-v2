import Navbar from "@/src/app/components/navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import "react-quill/dist/quill.snow.css";
import AuthProvider from "./components/auth/authprovider";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${inter.className} flex flex-col min-h-screen bg-slate-950 text-white `}
        >
          <Navbar />
          <main className="flex-1 container mt-28 mx-auto px-3 md:px-6">
            {children}
          </main>
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
