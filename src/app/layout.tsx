import { Footer } from "@components/common/footer/Footer";
import { Header } from "@components/common/header/Header";
import Providers from "./providers";
import "@styles/globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex flex-col justify-between min-h-screen">
            <Header />
            <main className="container flex-grow mt-20">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
