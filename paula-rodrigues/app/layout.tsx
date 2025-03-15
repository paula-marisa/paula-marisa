import "./globals.css";
import Footer from "@/components/footer";

export const metadata = {
  title: "Portfólio de Paula Rodrigues",
  description: "Bem-vindo ao meu portfólio profissional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
