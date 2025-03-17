"use client";

import React from "react";
import { useLanguage } from "@/components/LanguageContext";
import HeaderOptions from "@/components/HeaderOptions";
import { FaHtml5, FaCss3Alt, FaSass, FaJs, FaReact, FaNodeJs, FaGit, FaGithub, FaJava, FaTerminal } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiFirebase, SiVercel, SiBootstrap, SiFigma, SiNpm, SiNetlify, SiCplusplus, SiAssemblyscript, SiMysql, SiR, SiAngular, SiThreedotjs, SiOracle, SiLinux, SiMongodb, SiOpenai, SiGrammarly, SiGraphql, SiCoder } from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";
import { useRouter } from "next/navigation";

// Definir o tipo exato das categorias
type SkillCategory = "languages" | "frameworks" | "tools" | "databases" ;

// Textos traduzidos
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

// Dados das Skills
const skills: Record<SkillCategory, { name: string; icon: React.ReactNode }[]> = {
  languages: [
    { name: "HTML", icon: <FaHtml5 className="text-orange-500 text-3xl" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-blue-500 text-3xl" /> },
    { name: "JavaScript", icon: <FaJs className="text-yellow-500 text-3xl" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-blue-600 text-3xl" /> },
    { name: "C++", icon: <SiCplusplus className="text-blue-600 text-3xl" /> },
    { name: "Java", icon: <FaJava className="text-red-500 text-3xl" /> },
    { name: "Assembly", icon: <SiAssemblyscript className="text-gray-500 text-3xl" /> },
    { name: "R", icon: <SiR className="text-blue-400 text-3xl" /> },
    { name: "SQL", icon: <SiMysql className="text-blue-500 text-3xl" /> },
  ],
  frameworks: [
    { name: "React", icon: <FaReact className="text-blue-400 text-3xl" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-black text-3xl" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-blue-400 text-3xl" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-3xl" /> },
    { name: "Angular", icon: <SiAngular className="text-red-500 text-3xl" /> },
    { name: "Three.js", icon: <SiThreedotjs className="text-gray-800 text-3xl" /> },
  ],
  databases: [
    { name: "Firebase Firestore", icon: <SiFirebase className="text-yellow-500 text-3xl" /> },
    { name: "MongoDB", icon: <SiMongodb className="text-green-600 text-3xl" /> },
    { name: "Oracle", icon: <SiOracle className="text-red-600 text-3xl" /> },
  ],
  tools: [
    { name: "Git", icon: <FaGit className="text-red-500 text-3xl" /> },
    { name: "GitHub", icon: <FaGithub className="text-gray-800 text-3xl" /> },
    { name: "VS Code", icon: <DiVisualstudio className="text-blue-500 text-3xl" /> },
    { name: "npm", icon: <SiNpm className="text-red-500 text-3xl" /> },
    { name: "Vercel", icon: <SiVercel className="text-white text-3xl" /> },
    { name: "Netlify", icon: <SiNetlify className="text-green-500 text-3xl" /> },
    { name: "Bootstrap", icon: <SiBootstrap className="text-purple-500 text-3xl" /> },
    { name: "Figma", icon: <SiFigma className="text-pink-500 text-3xl" /> },
    { name: "Linux Networking", icon: <SiLinux className="text-yellow-500 text-3xl" /> },
    { name: "RStudio", icon: <SiR className="text-blue-400 text-3xl" /> },
  ],
};

export default function Skills() {
  const { language } = useLanguage();
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4"
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
        {text[language].title}
      </h1>

      {/* Grid de Skills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {(Object.keys(skills) as SkillCategory[]).map((key) => (
          <div key={key} className="bg-gray-800 p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4">{text[language].categories[key]}</h2>
            <div className="space-y-2">
              {skills[key].map((skill, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {skill.icon}
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
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
