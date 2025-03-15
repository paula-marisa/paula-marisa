"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useLanguage } from "./LanguageContext";

const Footer = () => {
  const { language } = useLanguage();
  const text = {
    EN: "© 2025 Paula Rodrigues. All rights reserved.",
    PT: "© 2025 Paula Rodrigues. Todos os direitos reservados.",
  };

  return (
    <footer className="bg-[#2D2F33] text-white text-center py-4 w-full mt-auto">
      <div className="max-w-[80%] mx-auto px-6 flex items-center justify-between">
        {/* Direitos do autor centralizados */}
        <p className="text-sm text-gray-300 mx-auto">{text[language]}</p>

        {/* Ícones alinhados à direita */}
        <div className="flex space-x-4 justify-end">
          <Link
            href="https://github.com/paula-marisa"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition duration-300"
          >
            <FaGithub size={24} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/paulasrodrigues/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition duration-300"
          >
            <FaLinkedin size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
