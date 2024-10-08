import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/Container/Header";
import Footer from "@/Container/Footer";
import "./globals.css";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vizing",
  description:
    "Vizing, an omni interoperability environment built on advanced zk technology, provides a faster, more affordable, and safer Ethereum ecosystem roaming experience!",
};

export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: {
    lang: string;
  };
}>) {
  return (
    <html lang="en">
      <body className={clsx(inter.className, "px-[80px] bg-black")}>
        <Header lang={lang} />
        <main className="min-h-screen flex-col pb-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
