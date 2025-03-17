"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../components/LanguageContext";
import HeaderOptions from "@/components/HeaderOptions";

type LanguageType = "EN" | "PT";

const menuText: Record<LanguageType, { label: string; route: string; img: string }[]> = {
    EN: [
        { label: "Who I am?", route: "/about", img: "/images/about.png" },
        { label: "Skills", route: "/skills", img: "/images/skills.png" },
        { label: "Projects", route: "/projects", img: "/images/projects.png" },
        { label: "Experience", route: "/experience", img: "/images/experience.png" },
        { label: "Opinions", route: "/opinions", img: "/images/testimonials.png" },
        { label: "Contact", route: "/contact", img: "/images/contact.png" },
    ],
    PT: [
        { label: "Sobre mim", route: "/about", img: "/images/about.png" },
        { label: "Habilidades", route: "/skills", img: "/images/skills.png" },
        { label: "Projetos", route: "/projects", img: "/images/projects.png" },
        { label: "Experiência", route: "/experience", img: "/images/experience.png" },
        { label: "Opiniões", route: "/opinions", img: "/images/testimonials.png" },
        { label: "Contato", route: "/contact", img: "/images/contact.png" },
    ],
};

const Menu = () => {
    const router = useRouter();
    const { language } = useLanguage();

    return (
        <div className="w-screen min-h-screen flex flex-col items-center"
            style={{
                backgroundImage: "url('/images/background.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}>

            <HeaderOptions />

            {/* Menu interativo */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-30 mt-30">
                {menuText[language].map((item, index) => (
                    <button
                        key={item.route}
                        onClick={() => router.push(item.route)}
                        className={`relative w-40 h-40 flex flex-col items-center justify-center 
                            bg-gray-800 rounded-full shadow-lg px-6 py-6 hover:scale-110 
                            transition-transform duration-300 
                            ${index % 2 === 0 ? "mt-10" : "mb-10"}`}>
                        <img src={item.img} alt={item.label} className="w-24 h-24 object-contain" />
                        <span className="text-white mt-2 text-lg font-semibold">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Menu;
