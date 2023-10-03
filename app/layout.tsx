import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Providers from "./providers";
import NavBar from "./components/NavBar/NavBar";
import { ReduxProvider } from "./store/provider";
import  CoinBar  from "./components/CoinBar";
import CoinsConverter from "./components/CoinsConverter";

const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700",],
});

export const metadata: Metadata = {
  title: "Crypto Carnival",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${space_grotesk.className} text-[#424286]  dark:bg-[#13121A] bg-[#F3F5F9]`}>
        <ReduxProvider>
        <Providers>  
          <CoinBar/>   
        <NavBar />
        <CoinsConverter />
          {children}
        </Providers>
        </ReduxProvider>
      </body>
    </html>
  );
}
