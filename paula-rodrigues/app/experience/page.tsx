"use client";

import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React from "react";
import { Alegreya } from "next/font/google";

const alegreya = Alegreya({ subsets: ["latin"], weight: "700" });

export default function Experience() {
  const { language } = useLanguage();
  const router = useRouter();
  const { theme } = useTheme();

  const backgroundImage =
    theme === "dark"
      ? "url('/images/background_invert.png')"
      : "url('/images/background.png')";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-6"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Caixa cobrindo título e experiência */}
      <div
        className={`p-10 rounded-xl shadow-2xl max-w-5xl border transition-all ${theme === "dark"
            ? "bg-white/90 text-gray-900 border-gray-300" // Fundo claro no modo escuro
            : "bg-gray-900/90 text-white border-gray-600" // Fundo escuro no modo claro
          }`}
      >
        {/* Título da página */}
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6 ${theme === "dark" ? "text-gray-900" : "text-yellow-400"
            } ${alegreya.className}`}
        >
          {language === "EN" ? "Experience" : "Experiência"}
        </h1>

        {/* Bloco de Experiência */}
        <p className="text-lg font-bold leading-relaxed mb-4">
          {language === "EN"
            ? "Biomedical Scientist (2015 - Present)"
            : "TSDT de Análises Clínicas e Saúde Pública (2015 - Presente)"}
        </p>

        <ul className="list-disc pl-5 space-y-3 text-lg">
          <li>
            {language === "EN"
              ? "Responsible for blood sample collection and processing (clinical chemistry, hematology, microbiology and immunohematology)."
              : "Responsável pela colheita e processamento de amostras (química clínica, hematologia, microbiologia e imunohemoterapia)."}
          </li>

          <li>
            {language === "EN"
              ? "Training and supervising interns during their internships."
              : "Formação e supervisão de estagiários durante os seus estágios."}
          </li>

          <li>
            {language === "EN"
              ? "Stock management and organization of reagents and consumables."
              : "Gestão e organização dos stocks (reagentes e consumíveis)."}
          </li>

          <li>
            {language === "EN"
              ? "Contribution to the Laboratory Quality Management System."
              : "Contribuição para o Sistema de Gestão da Qualidade do Laboratório."}
          </li>
        </ul>
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
