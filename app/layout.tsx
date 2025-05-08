import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanitFont = Kanit({
  weight: '400',
  subsets: ["latin"],
  variable: "--font-kanit",
});

export const metadata: Metadata = {
  title: "Dona Planta esta com Sede",
  description: "Acompanhe se sua platinha está com sede ou não",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${kanitFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
