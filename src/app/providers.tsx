import { NextIntlClientProvider } from "next-intl";

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider>
      {children}
    </NextIntlClientProvider>
  )
}