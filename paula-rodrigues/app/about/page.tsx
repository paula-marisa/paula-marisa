"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";
import { Alegreya } from "next/font/google";
import { useTheme } from "next-themes";

const alegreya = Alegreya({ subsets: ["latin"], weight: "700" });

export default function About() {
  const { language } = useLanguage();
  const router = useRouter();
  const { theme } = useTheme();

  const backgroundImage =
    theme === "dark" ? "url('/images/background_invert.png')" : "url('/images/background.png')";

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 sm:px-10 lg:px-20"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Caixa que cobre o título e o texto */}
      <div
        className={`p-10 rounded-xl shadow-2xl max-w-5xl border transition-all ${
          theme === "dark"
            ? "bg-white/90 text-gray-900 border-gray-300" // Fundo claro no modo escuro
            : "bg-gray-900/90 text-white border-gray-600" // Fundo escuro no modo claro
        }`}
      >
        {/* Título da página */}
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6 ${
            theme === "dark" ? "text-gray-900" : "text-yellow-400"
          } ${alegreya.className}`}
        >
          {language === "EN" ? "Who I am?" : "Sobre Mim"}
        </h1>

        {/* Texto sobre mim */}
        <p className="text-base sm:text-lg leading-relaxed text-justify">
          {language === "EN"
            ? "I am a curious person who loves solving problems through technology. I started my career in Healthcare, earning a degree in Biomedical Sciences and working in Pathology and Immunohematology laboratories. However, my passion for technology led me to study Computer Engineering, and I am now transitioning into IT, with a focus on Frontend Development."
            : "Sou uma pessoa curiosa e apaixonada por resolver problemas no dia-a-dia. Iniciei a minha carreira na área da Saúde, como Técnica Superior de Diagnóstico e Terapêutica de Análises Clínicas e Saúde Pública, onde trabalhei em laboratórios de Patologia Clínica e Imunohemoterapia. No entanto, o meu interesse pela tecnologia levou-me a estudar Engenharia Informática e atualmente encontro-me a fazer a transição para a área de IT, com foco no Desenvolvimento Frontend."
          }
        </p>

        <p className="text-base sm:text-lg leading-relaxed text-justify mt-4 sm:mt-6">
          {language === "EN"
            ? "I enjoy creating simple, functional, and accessible interfaces, always prioritizing the user experience. I believe technology can positively impact people's lives, and I want to be part of that change."
            : "Gosto de criar interfaces simples, funcionais e acessíveis, sempre com a experiência do utilizador em mente. Acredito que a tecnologia pode ter um impacto positivo na vida das pessoas e quero contribuir para essa mudança."
          }
        </p>

        <p className="text-base sm:text-lg leading-relaxed text-justify mt-4 sm:mt-6">
          {language === "EN"
            ? "I am a determined person who values continuous learning, teamwork, and innovation. My background in Healthcare has made me organized, analytical, and capable of working under pressure - skills that I now apply to software development."
            : "Sou determinada, valorizo a aprendizagem contínua, o trabalho em equipa e a inovação. A minha experiência na área da Saúde ajudou-me a ser organizada, com pensamento analítico e capacidade de trabalhar sob pressão - competências que agora aplico no desenvolvimento de softwares."
          }
        </p>

        <p className="text-base sm:text-lg leading-relaxed text-justify mt-4 sm:mt-6">
          {language === "EN"
            ? "I am always ready for new challenges and opportunities to learn and grow!"
            : "Estou sempre pronta para novos desafios e oportunidades para aprender e crescer!"
          }
        </p>
      </div>

      {/* Container para os botões */}
      <div className="flex flex-col sm:flex-row items-center justify-center w-full mt-6 space-y-4 sm:space-y-0 sm:space-x-6">

        {/* Botão de Download do CV */}
        <a
          href="/docs/CV.pdf"
          download="CV.pdf"
          className="px-6 py-3 bg-[#1f536e] text-white font-bold rounded-lg shadow-lg hover:bg-[#00ACEA] transition text-center"
        >
          📝🔗 {language === "EN" ? "Check my CV" : "Baixar o meu CV"}
        </a>

        {/* Botão de Voltar ao Menu */}
        <button
          onClick={() => router.push("/menu")}
          className="px-6 py-3 bg-[#1f536e] text-white font-bold rounded-lg shadow-lg hover:bg-[#00ACEA] transition text-center"
        >
          ⬅️ {language === "EN" ? "Back to Menu" : "Voltar ao Menu"}
        </button>
      </div>
    </div>
  );
}
