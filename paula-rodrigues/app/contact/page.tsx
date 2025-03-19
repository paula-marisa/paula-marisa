"use client";

import { useLanguage } from "@/components/LanguageContext";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import React from "react";
import { Alegreya } from "next/font/google";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

const alegreya = Alegreya({ subsets: ["latin"], weight: "700" });

export default function Contact() {
  const { language } = useLanguage();
  const router = useRouter();
  const { theme } = useTheme();

  const backgroundImage =
    theme === "dark" ? "url('/images/background_invert.png')" : "url('/images/background.png')";

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
      {/* Caixa de fundo cobrindo o título e os contatos */}
      <div
        className={`p-8 md:p-10 rounded-xl shadow-2xl max-w-3xl w-full border transition-all ${theme === "dark"
            ? "bg-white/90 text-gray-900 border-gray-300" // Fundo claro no modo escuro
            : "bg-gray-900/90 text-white border-gray-600" // Fundo escuro no modo claro
          }`}
      >
        {/* Título da página */}
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6 ${theme === "dark" ? "text-gray-900" : "text-yellow-400"
            } ${alegreya.className}`}
        >
          {language === "EN" ? "Contacts" : "Contatos"}
        </h1>

        {/* Texto de introdução */}
        <p className="text-lg leading-relaxed text-center font-bold">
          {language === "EN"
            ? "Feel free to reach out to me through the following channels:"
            : "Sinta-se à vontade para me contatar pelos canais abaixo:"}
        </p>

        {/* Links de contato em linha em telas grandes e empilhados no mobile */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-lg mt-6">
          {/* E-mail */}
          <a
            href="mailto:paulamsr@hotmail.com"
            className="flex items-center space-x-2 font-bold hover:text-[#00ACEA] transition"
          >
            <FaEnvelope size={22} />
            <span>Email</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/paulasrodrigues/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 font-bold hover:text-[#00ACEA] transition"
          >
            <FaLinkedin size={22} />
            <span>LinkedIn</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/paula-marisa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 font-bold hover:text-[#00ACEA] transition"
          >
            <FaGithub size={22} />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Botão de Voltar ao Menu */}
      <div className="w-full flex justify-end mt-6">
        <button
          onClick={() => router.push("/menu")}
          className="px-6 py-3 bg-[#1f536e] text-white font-bold rounded-lg shadow-lg hover:bg-[#00ACEA] transition text-center"
        >
          ⬅️ {language === "EN" ? "Back to Menu" : "Voltar ao Menu"}
        </button>
      </div>
    </div>
  );
}
