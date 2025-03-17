"use client";

import HeaderOptions from "@/components/HeaderOptions";
import { useLanguage } from "@/components/LanguageContext";
import OpinionsList from "@/components/OpinionsList";
import OpinionForm from "@/components/OpinionForm";
import React from "react";
import { useRouter } from "next/navigation";

export default function Opinions() {
  const { language } = useLanguage();
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-8"
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <HeaderOptions />
      <h1 className="text-5xl font-bold mb-12 text-white">
        {language === "EN" ? "Opinions" : "Opiniões"}
      </h1>

      {/* Formulário para enviar opinião */}
      <OpinionForm />

      {/* Lista de opiniões aprovadas */}
      <OpinionsList />
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
