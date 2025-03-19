"use client";

import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { TiThSmallOutline } from "react-icons/ti";
import { useLanguage } from "./LanguageContext";
import { useTheme } from "next-themes";
import { MoonStars, SunDim } from "phosphor-react";
import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";

// Definir o tipo correto para linguagem
type LanguageType = "EN" | "PT";

interface HeaderOptionsProps {
  setLanguage: React.Dispatch<React.SetStateAction<LanguageType>>;
}

const HeaderOptions: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [darkMode, setDarkMode] = useState(false);
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Evita erros de renderização SSR

  // Alternar idioma e atualizar o estado global
  const toggleLanguage = () => {
    const newLang = language === "EN" ? "PT" : "EN";
    setLanguage(newLang);
  };

  return (
    <div className="absolute top-4 right-4 flex items-center space-x-4 text-gray-700 dark:text-white">
      {/* Alternar tema */}
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      >
        {theme === "light" ? "⏾" : "☀︎"}
      </button>

      {/* Alternar idioma */}
      <button
        onClick={toggleLanguage}
        className="w-10 h-10 flex items-center justify-center text-sm font-bold bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      >
        {language === "EN" ? "🇬🇧 EN" : "🇵🇹 PT"}
      </button>

      {/* Botão do menu (três bolas) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      >
        <TiThSmallOutline size={18} />
      </button>

      {/* Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-12 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-48 p-4">
          <ul className="text-gray-700 dark:text-white">
            <li className="py-2 hover:text-blue-500">
              <a href="/" onClick={() => setMenuOpen(false)}>
                {language === "EN" ? "Game" : "Jogo"}
              </a>
            </li>
            <li className="py-2 hover:text-blue-500">
              <a href="/menu" onClick={() => setMenuOpen(false)}>
                {language === "EN" ? "Home" : "Início"}
              </a>
            </li>
            <li className="py-2 hover:text-blue-500">
              <a href="/about" onClick={() => setMenuOpen(false)}>
                {language === "EN" ? "About Me" : "Sobre Mim"}
              </a>
            </li>
            <li className="py-2 hover:text-blue-500">
              <a href="/skills" onClick={() => setMenuOpen(false)}>
                {language === "EN" ? "Skills" : "Habilidades"}
              </a>
            </li>
            <li className="py-2 hover:text-blue-500">
              <a href="/experience" onClick={() => setMenuOpen(false)}>
                {language === "EN" ? "Experience" : "Experiência"}
              </a>
            </li>
            <li className="py-2 hover:text-blue-500">
              <a href="/projects" onClick={() => setMenuOpen(false)}>
                {language === "EN" ? "Projects" : "Projetos"}
              </a>
            </li>
            <li className="py-2 hover:text-blue-500">
              <a href="/opinions" onClick={() => setMenuOpen(false)}>
                {language === "EN" ? "Opinions" : "Opiniões"}
              </a>
            </li>
            <li className="py-2 hover:text-blue-500">
              <a href="/contact" onClick={() => setMenuOpen(false)}>
                {language === "EN" ? "Contact" : "Contato"}
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderOptions;
