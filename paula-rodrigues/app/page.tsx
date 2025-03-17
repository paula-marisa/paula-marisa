"use client";

import GameGalo from "@/components/GameGalo";
import HeaderOptions from "@/components/HeaderOptions";
import { useLanguage } from "@/components/LanguageContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Home() {
  const router = useRouter(); // Adicionar o router para navegação
  const [gameWon, setGameWon] = useState(false);
  const { language } = useLanguage();

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <HeaderOptions />
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
