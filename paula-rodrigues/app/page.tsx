"use client";

import GameGalo from "@/components/GameGalo";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Home() {
  const router = useRouter(); // Adicionar o router para navegação
  const [gameWon, setGameWon] = useState(false);
  const { language } = useLanguage();
  const { theme } = useTheme();

  const backgroundImage =
    theme === "dark" ? "url('/images/background_invert.png')" : "url('/images/background.png')";

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {!gameWon ? (
        <GameGalo
          onWin={() => router.push("/menu")} // Agora redireciona para o menu quando vence
          onSkip={() => router.push("/menu")} // Agora pula diretamente para o menu
          language={language}
        />
      ) : null}
    </div>
  );
}
