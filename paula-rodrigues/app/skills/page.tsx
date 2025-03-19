"use client";

import React from "react";
import { useLanguage } from "@/components/LanguageContext";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGit, FaGithub, FaJava,
} from "react-icons/fa";
import {
  SiTypescript, SiTailwindcss, SiNextdotjs, SiFirebase, SiVercel, SiCplusplus,
  SiMysql, SiR, SiAngular, SiOracle, SiLinux, SiMongodb,
} from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";
import { Alegreya } from "next/font/google";

const alegreya = Alegreya({ subsets: ["latin"], weight: "700" });

type SkillCategory = "languages" | "frameworks" | "databases" | "tools";

const text = {
  EN: {
    title: "Skills",
    categories: {
      languages: "Programming Languages",
      frameworks: "Libraries & Frameworks",
      databases: "Databases",
      tools: "Tools & Platforms",
    } as Record<SkillCategory, string>,
  },
  PT: {
    title: "Habilidades",
    categories: {
      languages: "Linguagens de Programação",
      frameworks: "Bibliotecas & Frameworks",
      databases: "Bases de Dados",
      tools: "Ferramentas & Plataformas",
    } as Record<SkillCategory, string>,
  },
};

const skills: Record<SkillCategory, { name: string; icon: React.ReactNode }[]> = {
  languages: [
    { name: "HTML", icon: <FaHtml5 className="text-orange-500 text-3xl" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-500 text-3xl" /> },
    { name: "JavaScript", icon: <FaJs className="text-yellow-500 text-3xl" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600 text-3xl" /> },
    { name: "C++", icon: <SiCplusplus className="text-blue-600 text-3xl" /> },
    { name: "Java", icon: <FaJava className="text-red-500 text-3xl" /> },
    { name: "R", icon: <SiR className="text-blue-400 text-3xl" /> },
  ],
  frameworks: [
    { name: "React", icon: <FaReact className="text-blue-400 text-3xl" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-black text-3xl" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-blue-400 text-3xl" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-3xl" /> },
    { name: "Angular", icon: <SiAngular className="text-red-500 text-3xl" /> },
  ],
  databases: [
    { name: "Firebase Firestore", icon: <SiFirebase className="text-yellow-500 text-3xl" /> },
    { name: "SQL", icon: <SiMysql className="text-blue-500 text-3xl" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-600 text-3xl" /> },
    { name: "Oracle", icon: <SiOracle className="text-red-600 text-3xl" /> },
  ],
  tools: [
    { name: "Git", icon: <FaGit className="text-red-500 text-3xl" /> },
    { name: "GitHub", icon: <FaGithub className="text-gray-800 text-3xl" /> },
    { name: "VS Code", icon: <DiVisualstudio className="text-blue-500 text-3xl" /> },
    { name: "Vercel", icon: <SiVercel className="text-white text-3xl" /> },
    { name: "Linux Networking", icon: <SiLinux className="text-yellow-500 text-3xl" /> },
  ],
};

export default function Skills() {
  const { language } = useLanguage();
  const router = useRouter();
  const { theme } = useTheme();

  const backgroundImage =
    theme === "dark"
      ? "url('/images/background_invert.png')"
      : "url('/images/background.png')";

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center px-4 py-10"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Caixa cobrindo título */}
      <div
        className={`p-6 md:p-8 rounded-xl shadow-2xl max-w-3xl w-full border transition-all ${theme === "dark"
            ? "bg-white/90 text-gray-900 border-gray-300" // Fundo claro no modo escuro
            : "bg-gray-900/90 text-white border-gray-600" // Fundo escuro no modo claro
          }`}
      >
        {/* Título da página */}
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6 ${theme === "dark" ? "text-gray-900" : "text-yellow-400"
            } ${alegreya.className}`}
        >
          {text[language].title}
        </h1>
      </div>

      {/* Grid de Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl mt-10">
        {(Object.keys(skills) as SkillCategory[]).map((key) => (
          <div
            key={key}
            className={`p-6 rounded-lg shadow-lg text-center transition-all ${theme === "dark"
                ? "bg-white/90 text-gray-900 border border-gray-300" // Fundo claro no modo escuro
                : "bg-gray-900/90 text-white border border-gray-600" // Fundo escuro no modo claro
              }`}
          >
            <h2 className="text-xl font-bold mb-4">{text[language].categories[key]}</h2>
            <div className="space-y-3">
              {skills[key].map((skill, index) => (
                <div key={index} className="flex items-center space-x-3 justify-center">
                  {skill.icon}
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
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
