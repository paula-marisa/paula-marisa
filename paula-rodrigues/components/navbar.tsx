"use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Paula Rodrigues</h1>
      <ul className="flex space-x-6">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/about">About Me</Link></li>
        <li><Link href="/skills">Skills</Link></li>
        <li><Link href="/experience">Experience</Link></li>
        <li><Link href="/projects">Projects</Link></li>
        <li><Link href="/contact">Contacts</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
