"use client";

import { useLanguage } from "@/components/LanguageContext";
import OpinionsList from "@/components/OpinionsList";
import OpinionForm from "@/components/OpinionForm";
import React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Alegreya } from "next/font/google";

const alegreya = Alegreya({ subsets: ["latin"], weight: "700" });

export default function Opinions() {
  const { language } = useLanguage();
  const router = useRouter();
  const { theme } = useTheme();

  const backgroundImage =
    theme === "dark"
      ? "url('/images/background_invert.png')"
      : "url('/images/background.png')";

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center p-6 md:p-12"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Caixa cobrindo título e conteúdo */}
      <div
        className={`p-8 rounded-xl shadow-2xl max-w-4xl w-full border transition-all ${theme === "dark"
            ? "bg-white/90 text-gray-900 border-gray-300" // Fundo claro no modo escuro
            : "bg-gray-900/90 text-white border-gray-600" // Fundo escuro no modo claro
          }`}
      >
        {/* Título da página */}
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6 ${theme === "dark" ? "text-gray-900" : "text-yellow-400"
            } ${alegreya.className}`}
        >
          {language === "EN" ? "Opinions" : "Opiniões"}
        </h1>

        {/* Formulário para Enviar Opinião */}
        <OpinionForm />

        {/* Lista de Opiniões Aprovadas */}
        <div className="mt-8">
          <OpinionsList />
        </div>
      </div>

      {/* Botão de Voltar ao Menu */}
      <div className="w-full flex justify-center md:justify-end pr-10 mt-6">
        <button
          onClick={() => router.push("/menu")}
          className="px-6 py-3 bg-[#1f536e] text-white font-bold rounded-lg shadow-lg hover:bg-[#00ACEA] transition"
        >
          ⬅️ {language === "EN" ? "Back to Menu" : "Voltar ao Menu"}
        </button>
      </div>
    </div>
  );
}
