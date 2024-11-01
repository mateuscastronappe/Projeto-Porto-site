import "@/app/globals.css";
import Cabecalho from "@/components/Cabecalho/Cabecalho";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Porto Seguro",
  description: "Porto Seguro",
};

export const viewport = {
  initialScale: 1.0,
  width: "device-width",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="pt-br">
      <body>
        <Cabecalho />
        {children}
      </body>
    </html>
  );
}