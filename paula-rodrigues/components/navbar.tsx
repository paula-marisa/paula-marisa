"use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-primary py-4 px-6 flex justify-between items-center shadow-md fixed w-full top-0 z-50">
      <div className="flex items-center">
        <h1 className="text-xl font-bold hover:text-accent transition duration-300 font-mono block">Paula Rodrigues</h1>
      </div>
      <ul className="flex space-x-6 text-lg">
        <li><Link href="/" className="hover:text-accent transition duration-300">Home</Link></li>
        <li><Link href="/about" className="hover:text-accent transition duration-300">Sobre Mim</Link></li>
        <li><Link href="/skills" className="hover:text-accent transition duration-300">Skills</Link></li>
        <li><Link href="/experience" className="hover:text-accent transition duration-300">Experiência</Link></li>
        <li><Link href="/projects" className="hover:text-accent transition duration-300">Projetos</Link></li>
        <li><Link href="/contact" className="hover:text-accent transition duration-300">Contato</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

