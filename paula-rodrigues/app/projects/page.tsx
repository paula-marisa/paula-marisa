"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";
import { FaReact, FaCss3Alt, FaNodeJs, FaGithub } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiFirebase } from "react-icons/si";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Alegreya } from "next/font/google";

const alegreya = Alegreya({ subsets: ["latin"], weight: "700" });

// Lista de projetos
const projects = [
  {
    name: {
      EN: "Portfolio",
      PT: "Portfólio"
    },
    image: "/images/webpage.png",
    linkLive: "https://paula-rodrigues.vercel.app",
    linkGitHub: "https://github.com/paula-marisa/paula-marisa/tree/main/paula-rodrigues",
    technologies: [
      { name: "React", icon: <FaReact className="text-blue-500 text-3xl" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-black text-3xl" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-blue-400 text-3xl" /> },
      { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-3xl" /> },
      { name: "Firebase", icon: <SiFirebase className="text-yellow-500 text-3xl" /> },
      { name: "GitHub", icon: <FaGithub className="text-gray-800 text-3xl" /> },
    ],
  },
];

export default function Projects() {
  const { language } = useLanguage();
  const router = useRouter();
  const { theme } = useTheme();

  const backgroundImage =
    theme === "dark"
      ? "url('/images/background_invert.png')"
      : "url('/images/background.png')";

  // Textos traduzidos
  const text = {
    EN: {
      title: "Projects",
      description:
        "Throughout my studies, I worked on several projects in university. However, since they were group projects, I decided not to share them here. Currently, I am working on my own projects, including this website.",
      live: "Live Demo",
      code: "View Code",
      tech: "Technologies Used:",
    },
    PT: {
      title: "Projetos",
      description:
        "Ao longo dos meus estudos, desenvolvi diversos projetos na universidade. No entanto, como eram projetos em grupo, optei por não os partilhar aqui. Atualmente, estou a trabalhar em projetos próprios, incluindo este site.",
      live: "Ver Projeto",
      code: "Ver Código",
      tech: "Tecnologias Utilizadas:",
    },
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center px-4 md:px-12 py-10"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Caixa cobrindo título e descrição */}
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

        {/* Texto Explicativo */}
        <p className="text-sm sm:text-base leading-relaxed text-justify">
          {text[language].description}
        </p>
      </div>

      {/* Lista de Projetos */}
      <div className="container mx-auto py-10 flex flex-col items-center space-y-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className={`p-6 md:p-8 rounded-lg shadow-lg w-full max-w-2xl border transition-all ${theme === "dark"
                ? "bg-white/90 text-gray-900 border-gray-300" // Fundo claro no modo escuro
                : "bg-gray-900/90 text-white border-gray-600" // Fundo escuro no modo claro
              }`}
          >
            {/* Imagem do Projeto */}
            <div className="flex justify-center">
              <Image
                src={project.image}
                width={500}
                height={250}
                alt={project.name[language]}
                className="rounded-lg"
              />
            </div>

            {/* Nome do Projeto */}
            <h2 className="mt-4 text-2xl font-bold text-center">
              {project.name[language]}
            </h2>

            {/* Tecnologias Utilizadas */}
            <p className="mt-4 font-semibold text-center">{text[language].tech}</p>
            <div className="flex flex-wrap justify-center gap-6 mt-2">
              {project.technologies.map((tech, i) => (
                <div key={i} className="flex flex-col items-center">
                  {tech.icon}
                  <span className="text-xs mt-1">{tech.name}</span>
                </div>
              ))}
            </div>

            {/* Botões de Acesso */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <a
                href={project.linkLive}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#1f536e] text-white font-bold rounded-lg shadow-lg hover:bg-[#00ACEA] transition flex items-center gap-2 justify-center"
              >
                🔗 {text[language].live}
              </a>
              <a
                href={project.linkGitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg shadow-lg hover:bg-gray-600 transition flex items-center gap-2 justify-center"
              >
                💻 {text[language].code}
              </a>
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
