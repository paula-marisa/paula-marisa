"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";

type LanguageType = "EN" | "PT";

const timelineData: Record<
  LanguageType,
  { id: string; image: string; title: string; description: string; position: { top: string; left: string } }[]
> = {
  EN: [
    { id: "section1", image: "/images/circle1.png", title: "Introduction", description: "Who am I?", position: { top: "10%", left: "5%" } },
    { id: "section2", image: "/images/circle2.png", title: "Skills", description: "My technical skills", position: { top: "20%", left: "20%" } },
    { id: "section3", image: "/images/circle3.png", title: "Experience", description: "My professional journey", position: { top: "30%", left: "40%" } },
    { id: "section4", image: "/images/circle4.png", title: "Projects", description: "Some of my best work", position: { top: "40%", left: "60%" } },
    { id: "section5", image: "/images/circle5.png", title: "Contact", description: "Get in touch", position: { top: "50%", left: "80%" } },
  ],
  PT: [
    { id: "section1", image: "/images/circle1.png", title: "Introdução", description: "Quem sou eu?", position: { top: "10%", left: "5%" } },
    { id: "section2", image: "/images/circle2.png", title: "Habilidades", description: "As minhas competências técnicas", position: { top: "20%", left: "20%" } },
    { id: "section3", image: "/images/circle3.png", title: "Experiência", description: "A minha trajetória profissional", position: { top: "30%", left: "40%" } },
    { id: "section4", image: "/images/circle4.png", title: "Projetos", description: "Alguns dos meus melhores trabalhos", position: { top: "40%", left: "60%" } },
    { id: "section5", image: "/images/circle5.png", title: "Contato", description: "Entre em contacto", position: { top: "50%", left: "80%" } },
  ],
};

const Timeline = () => {
  const { language } = useLanguage(); // Obtém o idioma do contexto

  if (!timelineData[language]) {
    return <p className="text-center text-white">Carregando timeline...</p>;
  }

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative w-full h-[250px] flex items-center justify-center">
      {/* Ajuste a imagem para ocupar a largura total e reduzir a altura */}
    </div>
  );
};

export default Timeline;
