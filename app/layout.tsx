import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CartModal from "@/components/Modal/CartModal";
import ToasterProvider from "@/Others/ToastProvider";
import NavWrapper from "@/components/navbar/NavWrapper";
import OTPModal from "@/components/Modal/OTPModal";
import RecentlyViewed from "@/components/RecentlyViewed";
import WishlistModal from "@/components/Modal/WishlistModal";
import AddToWishlistModal from "@/components/Modal/AddToWishlistModal";
import Intro from "@/components/Intro";
import {Poppins} from "next/font/google"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopEzy",
  description: "Generated by create next app",
};
const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className={inter.className}>
        <ToasterProvider />
        <Intro/>
        <NavWrapper />
        <AddToWishlistModal/>
        <WishlistModal/>
        <OTPModal />
        <CartModal />
        {children}
        <RecentlyViewed/>
      </body>
    </html>
  );
}
