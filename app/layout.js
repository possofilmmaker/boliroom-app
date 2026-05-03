import { Epilogue, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import WhatsAppFab from "@/components/WhatsAppFab";

const epilogue = Epilogue({ 
  subsets: ["latin"],
  variable: '--font-epilogue',
});

const beVietnam = Be_Vietnam_Pro({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: '--font-be-vietnam',
});

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
  themeColor: "#042D2D",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${epilogue.variable} ${beVietnam.variable}`}>
      <body className="font-sans bg-[#042D2D] text-white min-h-screen selection:bg-brand-coral selection:text-white antialiased">
        <ClientWrapper>
          {children}
        </ClientWrapper>
        <WhatsAppFab />
      </body>
    </html>
  );
}
