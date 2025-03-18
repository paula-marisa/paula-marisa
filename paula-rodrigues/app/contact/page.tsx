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
      {/* Título da página */}
      <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-[#1f536e] text-center ${alegreya.className}`}>
        {language === "EN" ? "Contacts" : "Contatos"}
      </h1>

      {/* Caixa de contatos */}
      <div className="bg-white/80 dark:bg-black/70 p-8 md:p-10 rounded-xl shadow-2xl max-w-3xl w-full border border-gray-300 dark:border-gray-600 text-center">
        <p className="text-lg text-gray-900 dark:text-gray-100 leading-relaxed mb-6 font-bold">
          {language === "EN"
            ? "Feel free to reach out to me through the following channels:"
            : "Sinta-se à vontade para me contatar pelos canais abaixo:"}
        </p>

        {/* Ajuste para separar os links corretamente */}
        <div className="flex flex-col space-y-4 md:space-y-3 text-lg">
          {/* E-mail */}
          <a
            href="mailto:paulamsr@hotmail.com"
            className="flex items-center space-x-3 justify-center text-gray-900 dark:text-white font-bold hover:text-[#00ACEA] transition"
          >
            <FaEnvelope size={22} />
            <span>paulamsr@hotmail.com</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/paulasrodrigues/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 justify-center text-gray-900 dark:text-white font-bold hover:text-[#00ACEA] transition"
          >
            <FaLinkedin size={22} />
            <span>linkedin.com/in/paulasrodrigues</span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/paula-marisa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 justify-center text-gray-900 dark:text-white font-bold hover:text-[#00ACEA] transition"
          >
            <FaGithub size={22} />
            <span>github.com/paula-marisa</span>
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
