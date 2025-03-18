"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";

const OpinionForm = () => {
    const { language } = useLanguage();
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [work, setWork] = useState(false);
    const [message, setMessage] = useState("");

    // Textos traduzidos
    const text = {
        EN: {
            title: "Leave your opinion",
            namePlaceholder: "Your name...",
            commentPlaceholder: "Write here...",
            workedWithMe: "Worked with me?",
            submit: "Submit Opinion",
            success: "Your opinion has been sent for approval!",
            rating: "Your rating:",
        },
        PT: {
            title: "Deixa a tua opinião",
            namePlaceholder: "O teu nome...",
            commentPlaceholder: "Escreve aqui...",
            workedWithMe: "Trabalhaste comigo?",
            submit: "Enviar Opinião",
            success: "A tua opinião foi enviada para aprovação!",
            rating: "A tua avaliação:",
        },
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("/api/opinions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, comment, rating, work }),
        });

        const data = await response.json();
        setMessage(text[language].success); // Exibe a mensagem conforme o idioma
        setName("");
        setComment("");
        setRating(5);
        setWork(false);
    };

    // Componente de Estrelas Interativas
    const StarRating = ({ rating, onSetRating }: { rating: number; onSetRating: (value: number) => void }) => {
        return (
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onSetRating(star)}
                        className={`text-3xl transition-colors duration-200 ${star <= rating ? "text-yellow-500" : "text-gray-400"
                            }`}
                    >
                        {star <= rating ? "★" : "☆"}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white/80 dark:bg-transparent p-10 rounded-xl max-w-full text-justify">
            <h2 className="text-2xl font-bold text-black dark:text-white">{text[language].title}</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <input
                    type="text"
                    placeholder={text[language].namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-2xl p-2 border border-gray-300 rounded-lg"
                    required
                />
                <textarea
                    placeholder={text[language].commentPlaceholder}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                />
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={work}
                        onChange={() => setWork(!work)}
                        className="w-5 h-5"
                    />
                    <label className="text-black dark:text-white">{text[language].workedWithMe}</label>
                </div>

                {/* Seção de Avaliação por Estrelas */}
                <div>
                    <p className="text-black dark:text-white">{text[language].rating}</p>
                    <StarRating rating={rating} onSetRating={setRating} />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
                    {text[language].submit}
                </button>
                {message && <p className="text-black dark:text-white mt-2">{message}</p>}
            </form>
        </div>
    );
};

export default OpinionForm;
