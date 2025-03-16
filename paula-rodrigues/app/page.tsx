"use client";


import GameGalo from "@/components/GameGalo";
import HeaderOptions from "@/components/HeaderOptions";
import { useLanguage } from "@/components/LanguageContext";
import Timeline from "@/components/timeline";
import React, { useState } from "react";

export default function Home() {
  const [gameWon, setGameWon] = useState(false);
  const { language } = useLanguage();

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <HeaderOptions />
      {!gameWon ? (
        <GameGalo onWin={() => setGameWon(true)} onSkip={() => setGameWon(true)} language={language} />
      ) : (
        <div
          className="w-screen h-screen flex flex-col items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Sobreposição azul transparente sobre a imagem */}
          <div
            className="absolute top-36 left-0 w-full h-[300px]"
            style={{ backgroundColor: "rgba(255, 255, 255, 1)" }} // Azul #51A0B7 com 50% de opacidade
          ></div>
          {/* Imagem do timeline agora abaixo da sobreposição */}
          <img
            src="/images/timeline.png"
            alt="Timeline"
            className="w-full max-w-[1000px] h-auto object-contain relative z-10"
          />
          <Timeline />
        </div>
      )}
    </div>
  );
}
