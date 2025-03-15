"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Timeline = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Explore a Jornada</h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-4xl"
      >
        <svg width="100%" height="200" viewBox="0 0 500 200" className="absolute left-0 top-0">
          <path
            d="M 50,150 Q 150,50 250,150 T 450,150"
            stroke="blue"
            strokeWidth="4"
            fill="transparent"
          />
        </svg>

        {/* Pontos do Timeline */}
        {[
          { href: "/about", color: "purple", position: "left-[8%] top-[65%]", label: "Sobre Mim" },
          { href: "/skills", color: "blue", position: "left-[30%] top-[20%]", label: "Skills" },
          { href: "/experience", color: "green", position: "left-[55%] top-[65%]", label: "Experiência" },
          { href: "/projects", color: "red", position: "left-[80%] top-[20%]", label: "Projetos" },
        ].map(({ href, color, position, label }, index) => (
          <motion.div
            key={index}
            className={`absolute ${position}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            <Link href={href} className="flex flex-col items-center group">
              <div className={`w-12 h-12 rounded-full bg-${color}-500 group-hover:bg-${color}-400 transition`} />
              <span className="mt-2 text-gray-700 font-medium">{label}</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Timeline;
