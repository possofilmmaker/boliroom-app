import { Outfit } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import WhatsAppFab from "@/components/WhatsAppFab";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Melao Social Club | El lugar donde pasan cosas",
  description: "Melao es carácter, Social Club es mundo. Disfruta de la mejor coctelería, bolirana pro y arcade en Bogotá. Carrera 15 # 67 - 27.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#fcf8f2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${outfit.className} bg-brand-cream text-brand-dark min-h-screen`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
        <WhatsAppFab />
      </body>
    </html>
  );
}

