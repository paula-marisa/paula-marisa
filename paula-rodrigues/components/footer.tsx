"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white text-center py-6 w-full mt-auto">
      <div className="container mx-auto px-6">
        <p className="text-lg">&copy; 2025 Paula Rodrigues. Todos os direitos reservados.</p>
        <div className="mt-2 flex justify-center space-x-6">
          <Link href="https://github.com/paula-marisa" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition duration-300">
            <FaGithub size={28} />
          </Link>
          <Link href="https://www.linkedin.com/in/paulasrodrigues/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition duration-300">
            <FaLinkedin size={28} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
