import { Poppins } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import WhatsAppFab from "@/components/WhatsAppFab";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: '--font-poppins',
});

export const metadata = {
  title: "Melao Social Club | Se Juega, Se Brinda, Se Baila",
  description: "El punto de encuentro donde la música, los juegos y los buenos tragos crean noches inolvidables en Bogotá. Carrera 15 # 67 - 27.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#FF5A4F",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${poppins.variable}`}>
      <body className="font-sans bg-melao-cream text-melao-green min-h-screen selection:bg-melao-coral selection:text-white antialiased">
        <ClientWrapper>
          <Header />
          <main>
            {children}
          </main>
          <BottomNav />
        </ClientWrapper>
        <WhatsAppFab />
      </body>
    </html>
  );
}
