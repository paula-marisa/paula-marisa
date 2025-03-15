"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Definir os tipos permitidos
type LanguageType = "EN" | "PT";

interface LanguageContextProps {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
}

// Criar o contexto
const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Criar o Provider que envolverá toda a aplicação
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageType>("EN");

  // Recupera o idioma salvo no localStorage ao carregar a página
  useEffect(() => {
    const storedLang = localStorage.getItem("language") as LanguageType;
    if (storedLang) setLanguage(storedLang);
  }, []);

  // Atualiza o idioma no localStorage quando muda
  const changeLanguage = (lang: LanguageType) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Criar um hook para facilitar o acesso ao contexto
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
