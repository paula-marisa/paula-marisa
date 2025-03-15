"use client";

import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { TiThSmallOutline } from "react-icons/ti";

const HeaderOptions = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);

  // Alternar entre modo claro e escuro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Trocar idioma
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "PT" : "EN"));
  };

  return (
    <div className="absolute top-4 right-4 flex items-center space-x-4 text-gray-700 dark:text-white">
      {/* Alternar tema */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      >
        {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
      </button>

      {/* Alternar idioma */}
      <button
        onClick={toggleLanguage}
        className="p-2 text-sm font-bold bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      >
        {language}
      </button>

      {/* Botão do menu */}
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
            <li className="py-2 hover:text-blue-500"><a href="/about">Sobre Mim</a></li>
            <li className="py-2 hover:text-blue-500"><a href="/skills">Skills</a></li>
            <li className="py-2 hover:text-blue-500"><a href="/experience">Experiência</a></li>
            <li className="py-2 hover:text-blue-500"><a href="/projects">Projetos</a></li>
            <li className="py-2 hover:text-blue-500"><a href="/contact">Contato</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderOptions;
