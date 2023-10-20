import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeRegistry from "./theme/ThemeRegistry";
import Header from "./layout/header/Header";
import ReduxProvider from "./ReduxProvider";

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
      <body className={inter.className}>
        <ReduxProvider>
          <Header />
          <ThemeRegistry>{children}</ThemeRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
