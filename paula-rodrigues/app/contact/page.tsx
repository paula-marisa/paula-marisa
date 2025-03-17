"use client";

import HeaderOptions from "@/components/HeaderOptions";
import { useLanguage } from "@/components/LanguageContext";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import React from "react";
import { Alegreya } from "next/font/google";
import { useRouter } from "next/navigation";

const alegreya = Alegreya({ subsets: ["latin"], weight: "700" });

export default function Contact() {
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
      <h1 className="text-5xl font-extrabold mb-8 text-[#1f536e] ${alegreya.className}">
        {language === "EN" ? "Contacts" : "Contatos"}
      </h1>

      {/* Links de Contato */}
      <div className="bg-white/80 dark:bg-black/60 p-10 rounded-xl shadow-2xl max-w-5xl border border-gray-300 dark:border-gray-600 text-center">
        <p className="text-lg text-gray-900 dark:text-gray-100 leading-relaxed mb-4 font-bold">
          {language === "EN"
            ? "Feel free to reach out to me through the following channels:"
            : "Sinta-se à vontade para me contatar pelos canais abaixo:"}
        </p>

        <div className="flex flex-col space-y-4">
          {/* E-mail */}
          <a
            href="mailto:paulamsr@hotmail.com"
            className="flex items-center justify-center space-x-3 text-white font-bold hover:text-[#00ACEA] transition text-lg"
          >
            <FaEnvelope size={22} />
            <span>paulamsr@hotmail.com</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/paulasrodrigues/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 text-white font-bold hover:text-[#00ACEA] transition text-lg"
          >
            <FaLinkedin size={22} />
            <span>linkedin.com/in/paulasrodrigues</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/paula-marisa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-3 text-white font-bold hover:text-[#00ACEA] transition text-lg"
          >
            <FaGithub size={22} />
            <span>github.com/paula-marisa</span>
          </a>
        </div>
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
