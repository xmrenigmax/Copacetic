import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Copacetic Browser",
  description: "A sleek, glassmorphic workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
