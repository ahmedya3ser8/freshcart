import { Metadata } from "next";
import { Footer } from "@components/common/footer/Footer";
import { Header } from "@components/common/header/Header";
import Providers from "./providers";
import { ToasterProvider } from "./ToasterProvider";
import "@styles/globals.css";

export const metadata: Metadata = {
  title: 'FreshCart',
  description: 'ecomerce with all features'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex flex-col justify-between min-h-screen">
            <Header />
            <main className="container flex-grow mt-20">
              <ToasterProvider />
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
