import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "TradingAnalyst - Análisis Profesional",
  description:
    "Plataforma avanzada de análisis técnico con reconocimiento de patrones por IA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} h-full bg-gray-50`}>{children}</body>
    </html>
  );
}
