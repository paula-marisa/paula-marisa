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
        <Timeline />
      )}
    </div>
  );
}
