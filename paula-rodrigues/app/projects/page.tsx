"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";
import HeaderOptions from "@/components/HeaderOptions";
import { FaReact, FaCss3Alt, FaNodeJs, FaGithub } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiFirebase } from "react-icons/si";
import { useRouter } from "next/navigation";

// 📌 Lista de projetos
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
      <h1 className="text-5xl font-extrabold mb-8 text-[#1f536e] text-center">
        {text[language].title}
      </h1>

      {/* Texto Explicativo */}
      <div className="bg-white/80 dark:bg-black/70 p-6 rounded-xl shadow-xl max-w-3xl border border-gray-300 dark:border-gray-600 text-justify">
        <p className="text-lg text-gray-900 dark:text-gray-100 leading-relaxed">
          {text[language].description}
        </p>
      </div>

      {/* Lista de Projetos */}
      <div className="container mx-auto py-10 flex flex-col items-center">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto">
            {/* Imagem do Projeto */}
            <div className="flex justify-center">
              <Image
                src={project.image}
                width={400}
                height={200}
                alt={project.name[language]}
                className="rounded-lg"
              />
            </div>

            {/* Nome do Projeto */}
            <h2 className="mt-4 text-2xl font-bold text-[#1f536e]">{project.name[language]}</h2>

            {/* Tecnologias Utilizadas */}
            <p className="text-gray-700 mt-2 font-semibold">{text[language].tech}</p>
            <div className="flex justify-center gap-6 mt-2">
              {project.technologies.map((tech, i) => (
                <div key={i} className="flex flex-col items-center">
                  {tech.icon}
                  <span className="text-xs mt-1">{tech.name}</span>
                </div>
              ))}
            </div>

            {/* Botões de Acesso */}
            <div className="flex justify-center gap-4 mt-6">
              <a
                href={project.linkLive}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#1f536e] text-white font-bold rounded-lg shadow-lg hover:bg-[#00ACEA] transition flex items-center gap-2"
              >
                🔗 {language === "EN" ? "Live Demo" : "Ver Projeto"}
              </a>
              <a
                href={project.linkGitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg shadow-lg hover:bg-gray-600 transition flex items-center gap-2"
              >
                💻 {language === "EN" ? "View Code" : "Ver Código"}
              </a>
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
