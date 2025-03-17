"use client";


import GameGalo from "@/components/GameGalo";
import HeaderOptions from "@/components/HeaderOptions";
import { useLanguage } from "@/components/LanguageContext";
import Menu from "@/components/Menu";
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
          <Menu />
        </div>
      )}
    </div>
  );
}
