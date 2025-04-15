import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Mono, Inconsolata } from "next/font/google";
import "./globals.css";
import Header from "@/container/header/header";
import Footer from "@/container/footer/footer";
import NextAuthSessionProvider from "@/components/providers/session-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});
const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fil: the next-gen social media platform",
  description: "Generated by create next app",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotoMono.variable} ${inconsolata.variable} font-mono min-h-screen flex flex-col antialiased`}
      >
        <NextAuthSessionProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 flex flex-col items-center text-2xl bg-gray-700 text-white">
              {children}
            </main>
            <footer>
              <Footer />
            </footer>
          </div>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
