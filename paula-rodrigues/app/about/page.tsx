"use client";

import HeaderOptions from "@/components/HeaderOptions";
import { useLanguage } from "@/components/LanguageContext";

export default function About() {
  const { language } = useLanguage(); // Obtém o idioma global

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <HeaderOptions />

      {/* Título da página */}
      <h1 className="text-5xl font-bold mb-12 text-gray-900">
        {language === "EN" ? "Who I am?" : "Sobre Mim"}
      </h1>
    </div>
  );
}
