import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/Container/Header";
import Footer from "@/Container/Footer";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";
import { EnvProvider } from "@/providers/envConfigProvider";
import { DialogProvider } from "@/providers/dialogProvider";

// wagmi
import { WagmiProvider } from "wagmi";
import { config } from "../config/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "@/app/providers";
import { GoogleAnalytics } from "@next/third-parties/google";

// atom
import { Provider } from "jotai";

const queryClient = new QueryClient();

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
      <body
        className={clsx(
          inter.className,
          "lg:min-w-[1280px] lg:max-w-[1440px] lg:mx-auto lg:px-[80px] bg-black",
        )}
      >
        <Providers>
          <Provider>
            <EnvProvider>
              <DialogProvider>
                <Header lang={lang} />
                <main className="min-h-screen flex-col pb-24">{children}</main>
                <Footer />
                <ToastContainer
                  position="top-center"
                  autoClose={3000}
                  theme="dark"
                  hideProgressBar={true}
                  newestOnTop={false}
                  closeOnClick={false}
                  closeButton={false}
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </DialogProvider>
              {/* {renderDialog()} */}
            </EnvProvider>
          </Provider>
        </Providers>
        <GoogleAnalytics gaId="G-JT4G9MGL93" />
      </body>
    </html>
  );
}
