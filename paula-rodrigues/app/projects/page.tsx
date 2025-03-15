"use client";

import React from "react";
import Image from "next/image";

const projects = [
  { name: "Projeto 1", image: "/images/project1.jpg" },
  { name: "Projeto 2", image: "/images/project2.jpg" },
];

const Projects = () => {
  return (
    <div className="container mx-auto py-10 text-center">
      <h1 className="text-3xl font-bold mb-6">Projetos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <Image src={project.image} width={300} height={200} alt={project.name} className="rounded-lg" />
            <h2 className="mt-2 font-medium">{project.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
