import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import { hasLocale, Locale } from "next-intl";
import {getTranslations} from 'next-intl/server';
import { notFound } from "next/navigation";

import "../globals.css";
import { Providers } from "../providers";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/navbar/Navbar";


type Props = {
  children: React.ReactNode;
  params: Promise<{locale: Locale}>;
};

const pp_neue_machina = localFont({
  src: "../fonts/NeueMachina-Regular.woff2",
  variable: "--font-pp-neue-machina",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;

  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${spaceGrotesk.variable} ${pp_neue_machina.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <div className="pt-[96px] min-h-[80vh]">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
