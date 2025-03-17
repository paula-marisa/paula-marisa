"use client";

import HeaderOptions from "@/components/HeaderOptions";
import { useLanguage } from "@/components/LanguageContext";
import { useRouter } from "next/navigation";
import React from "react";

export default function Experience() {
  const { language } = useLanguage();
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-6"
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <HeaderOptions />

      {/* Título da página */}
      <h1 className="text-5xl font-extrabold mb-8 text-[#1f536e]">
        {language === "EN" ? "Experience" : "Experiência"}
      </h1>

      {/* Bloco de Experiência com fundo semi-transparente */}
      <div className="bg-white/80 dark:bg-black/70 p-10 rounded-xl shadow-2xl max-w-5xl border border-gray-300 dark:border-gray-600 text-justify">
        <p className="text-lg text-gray-900 dark:text-gray-100 font-bold leading-relaxed mb-4">
          {language === "EN"
            ? "Biomedical Scientist (2015 - Present)"
            : "Cientista Biomédica (2015 - Presente)"}
        </p>

        <ul className="list-disc pl-5 space-y-3 text-gray-800 dark:text-gray-100 text-lg">
          {/* 🔹 Responsabilidades */}
          <li>
            {language === "EN"
              ? "Responsible for blood sample collection and processing (chemistry, hematology, microbiology, and immunohematology)."
              : "Responsável pelas colheitas e processamento de amostras de sangue (química clínica, hematologia, microbiologia e imunohematologia)."}
          </li>

          <li>
            {language === "EN"
              ? "Intern training and supervision during their internships."
              : "Formação e supervisão de estagiários durante os seus estágios."}
          </li>

          <li>
            {language === "EN"
              ? "Stock management and supply chain organization."
              : "Co-gestora do processo de stocks e organização dos reagentes e consumiveis necessários."}
          </li>

          <li>
            {language === "EN"
              ? "Purchasing Process Manager within the Quality Management System."
              : "Contribuição para o Sistema da Qualidade do Laboratório."}
          </li>
        </ul>
      </div>
      {/* Botão de Voltar ao Menu (Alinhado mais à direita, mas não no fim) */}
      <div className="w-full flex justify-center md:justify-end pr-20">
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
