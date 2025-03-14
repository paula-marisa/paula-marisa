"use client";

import Game from "@/components/game";
import React from "react";

export default function Home() {
  return (
    <div className="relative h-screen flex flex-col justify-center items-center">
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center text-white z-10">
        <p className="text-lg">Who is this about?</p>
      </div>
      <Game />
    </div>
  );
}
