"use client";

import { useRouter } from "next/navigation";
import HeaderOptions from "@/components/HeaderOptions";
import { useLanguage } from "@/components/LanguageContext";
import { Alegreya } from "next/font/google";

const alegreya = Alegreya({ subsets: ["latin"], weight: "700" });

export default function About() {
  const { language } = useLanguage();
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <HeaderOptions />

      {/* Título da página */}
      <h1 className={`text-5xl font-extrabold mb-8 text-[#1f536e] ${alegreya.className}`}>
        {language === "EN" ? "Who I am?" : "Sobre Mim"}
      </h1>

      {/* Texto sobre mim */}
      <div className="bg-white/80 dark:bg-black/70 p-10 rounded-xl shadow-2xl max-w-5xl border border-gray-300 dark:border-gray-600 text-justify">
        <p className="text-lg text-justify text-gray-900 dark:text-gray-100 leading-relaxed">
          {language === "EN"
            ? "I am a curious person who loves solving problems through technology. I started my career in Healthcare, earning a degree in Biomedical Sciences and working in Pathology and Immunohematology laboratories. However, my passion for technology led me to study Computer Engineering, and I am now transitioning into IT, with a focus on Frontend Development."
            : "Sou uma pessoa curiosa e apaixonada por resolver problemas com a tecnologia. Iniciei a minha carreira na área da Saúde, licenciando-me em Análises Clínicas e Saúde Pública e trabalhando em laboratórios de Patologia Clínica e Imunohematologia. No entanto, o meu interesse pela tecnologia levou-me a estudar Engenharia Informática e agora estou a fazer a transição para a área de IT, com foco no Desenvolvimento Frontend."
          }
        </p>

        <p className="text-lg text-justify text-gray-900 dark:text-gray-100 leading-relaxed mt-6">
          {language === "EN"
            ? "I enjoy creating simple, functional, and accessible interfaces, always prioritizing the user experience. I believe technology can positively impact people's lives, and I want to be part of that change."
            : "Gosto de criar interfaces simples, funcionais e acessíveis, sempre com a experiência do utilizador em mente. Acredito que a tecnologia pode ter um impacto positivo na vida das pessoas e quero contribuir para essa mudança."
          }
        </p>

        <p className="text-lg text-justify text-gray-900 dark:text-gray-100 leading-relaxed mt-6">
          {language === "EN"
            ? "I am a determined person who values continuous learning, teamwork, and innovation. My background in Healthcare has made me organized, analytical, and capable of working under pressure—skills that I now apply to web development."
            : "Sou determinada, valorizo a aprendizagem contínua, o trabalho em equipa e a inovação. A minha experiência na área da Saúde ajudou-me a desenvolver organização, pensamento analítico e capacidade de trabalhar sob pressão - competências que agora aplico no desenvolvimento web."
          }
        </p>

        <p className="text-lg text-justify text-gray-900 dark:text-gray-100 leading-relaxed mt-6">
          {language === "EN"
            ? "I am always ready for new challenges and opportunities to learn and grow!"
            : "Estou sempre pronta para novos desafios e oportunidades para aprender e crescer!"
          }
        </p>
      </div>

      {/* Container para os botões */}
      <div className="flex flex-col items-center w-full mt-6 space-y-4">

        {/* Botão de Download do CV (Centralizado) */}
        <a
          href="/docs/CV.pdf"
          download="CV.pdf"
          className="px-6 py-3 bg-[#1f536e] text-white font-bold rounded-lg shadow-lg hover:bg-[#00ACEA] transition"
        >
          📝🔗 {language === "EN" ? "Check my CV" : "Baixar o meu CV"}
        </a>

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
    </div>
  );
}
