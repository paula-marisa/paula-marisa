"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "next-themes";

type LanguageType = "EN" | "PT";

const menuText: Record<LanguageType, { label: string; route: string; img: string }[]> = {
  EN: [
    { label: "Who I am?", route: "/about", img: "/images/about.png" },
    { label: "Skills", route: "/skills", img: "/images/skills.png" },
    { label: "Projects", route: "/projects", img: "/images/projects.png" },
    { label: "Experience", route: "/experience", img: "/images/experience.png" },
    { label: "Opinions", route: "/opinions", img: "/images/testimonials.png" },
    { label: "Contact", route: "/contact", img: "/images/contact.png" },
  ],
  PT: [
    { label: "Sobre mim", route: "/about", img: "/images/about.png" },
    { label: "Habilidades", route: "/skills", img: "/images/skills.png" },
    { label: "Projetos", route: "/projects", img: "/images/projects.png" },
    { label: "Experiência", route: "/experience", img: "/images/experience.png" },
    { label: "Opiniões", route: "/opinions", img: "/images/testimonials.png" },
    { label: "Contato", route: "/contact", img: "/images/contact.png" },
  ],
};

const Menu = () => {
  const router = useRouter();
  const { language } = useLanguage();
  const { theme } = useTheme();

  const backgroundImage =
    theme === "dark" ? "url('/images/background_invert.png')" : "url('/images/background.png')";

  return (
    <div
      className="w-screen min-h-screen flex flex-col items-center justify-center px-4 sm:px-8"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Menu interativo (Centralizado) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 md:gap-10 mt-12 w-full max-w-4xl justify-center items-center">
        {menuText[language].map((item, index) => (
          <button
            key={item.route}
            onClick={() => router.push(item.route)}
            className={`relative flex flex-col items-center justify-center 
                        bg-gray-800 rounded-full shadow-lg p-6 hover:scale-110 
                        transition-transform duration-300 w-28 h-28 
                        sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48`}
          >
            <img src={item.img} alt={item.label} className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
            <span className="text-white mt-2 text-sm sm:text-base md:text-lg font-semibold">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
