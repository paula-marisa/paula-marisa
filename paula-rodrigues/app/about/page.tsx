"use client";

import React from "react";

const About = () => {
  return (
    <div
      className="container mx-auto py-10 text-center bg-cover bg-center min-h-screen"
      style={{ backgroundImage: "url('/images/background.jpg')" }}
    >
      <h1 className="text-3xl font-bold text-white">Sobre Mim</h1>
      <p className="mt-4 text-lg text-white">Aqui será a secção sobre mim.</p>
    </div>
  );
};

export default About;
