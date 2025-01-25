import "../globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/shared/config/site";
import { fontSans } from "@/shared/config/fonts";
import { Navbar } from "@/featured/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="ru">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <main className="grow flex flex-col">
              {children}
            </main>
            <footer className="flex flex-col w-full items-center py-[40px] px-0 gap-8">
              <p className="text-base font-normal opacity-40 text-center">@ 2025 - Лиана Гыймадиева</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
