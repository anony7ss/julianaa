import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Juu News | Noticias do nosso amor",
    template: "%s | Juu News",
  },
  description:
    "O jornal oficial dedicado a Juliana, com noticias romanticas, rankings, linha do tempo e editoriais internos.",
  openGraph: {
    title: "Juu News",
    description: "Noticias do nosso amor, todos os dias.",
    type: "website",
    images: ["/images/cat-news-editor.png"],
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
