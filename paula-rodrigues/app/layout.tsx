import { LanguageProvider } from "@/components/LanguageContext";
import "./globals.css";
import Footer from "@/components/footer";
import { ThemeProvider } from "next-themes";
import HeaderOptions from "@/components/HeaderOptions";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system">
          <LanguageProvider>
          <HeaderOptions /> 
            {children}
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
