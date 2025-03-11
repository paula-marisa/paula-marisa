"use client";

import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center py-4 mt-10">
      <p>&copy; 2025 Paula Rodrigues. All Rights Reserved.</p>
      <div className="mt-2">
      <Link href="https://github.com/paula-marisa" className="mr-4" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} className="inline-block" />
        </Link>
        <Link href="https://www.linkedin.com/in/paulasrodrigues/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={24} className="inline-block" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
