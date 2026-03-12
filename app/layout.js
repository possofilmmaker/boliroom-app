import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import WhatsAppFab from "@/components/WhatsAppFab";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
  title: "Boliroom Bogotá | El mejor ambiente y coctelería",
  description: "Reserva tu mesa en Boliroom Bogotá. Disfruta de la mejor coctelería, juegos y el ambiente más social de la ciudad. Carrera 15 # 67 - 27.",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body className={`${spaceGrotesk.className} bg-brand-darker text-slate-50 min-h-screen`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
        <WhatsAppFab />
      </body>
    </html>
  );
}
