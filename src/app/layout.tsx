import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#06060c",
};

export const metadata: Metadata = {
  title: "Jaharta RP — Là où la magie rencontre la technologie",
  description:
    "Jaharta RP — Un monde où magie et technologie s'entrelacent. Rejoignez l'aventure sur Discord.",
  icons: {
    icon: [
      { url: "/img/favicon.ico" },
      { url: "/img/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/img/favicon-180.png",
  },
  openGraph: {
    type: "website",
    url: "https://www.jaharta.fr/",
    title: "JAHARTA // RP",
    description:
      "Un monde où magie et technologie coexistent. Votre seconde chance commence à Navari.",
    images: [
      {
        url: "https://www.jaharta.fr/img/banner.png?v=3",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen bg-jaharta-deep text-white antialiased">
        {children}
      </body>
    </html>
  );
}
