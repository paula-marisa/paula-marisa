"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageContext";

const OpinionForm = () => {
    const { language } = useLanguage();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const [work, setWork] = useState(false);
    const [workLocation, setWorkLocation] = useState("");
    const [knowLocation, setKnowLocation] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    // Textos traduzidos
    const text = {
        EN: {
            title: "Leave your opinion",
            firstNamePlaceholder: "First name...",
            lastNamePlaceholder: "Last name...",
            emailPlaceholder: "Your email...",
            commentPlaceholder: "Write here...",
            workedWithMe: "Worked with me?",
            whereWorked: "Where did you work with me?",
            whereMet: "Where did you meet me?",
            submit: "Submit Opinion",
            success: "Your opinion has been sent for approval!",
            rating: "Your rating:",
            close: "Close",
        },
        PT: {
            title: "Deixa a tua opinião",
            firstNamePlaceholder: "Primeiro nome...",
            lastNamePlaceholder: "Último nome...",
            emailPlaceholder: "O teu email...",
            commentPlaceholder: "Escreve aqui...",
            workedWithMe: "Trabalhaste comigo?",
            whereWorked: "Onde trabalhaste comigo?",
            whereMet: "Onde me conheceste?",
            submit: "Enviar Opinião",
            success: "A tua opinião foi enviada para aprovação!",
            rating: "A tua avaliação:",
            close: "Fechar",
        },
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch(`/api/opinions?lang=${language}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                comment,
                rating,
                work,
                workLocation: work ? workLocation : "",
                knowLocation: !work ? knowLocation : "",
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setPopupMessage(text[language].success);
            setShowPopup(true);
            setFirstName("");
            setLastName("");
            setEmail("");
            setComment("");
            setRating(5);
            setWork(false);
            setWorkLocation("");
            setKnowLocation("");

            // Fechar pop-up automaticamente após 3 segundos
            setTimeout(() => setShowPopup(false), 3000);
        } else {
            setPopupMessage(data.error);
            setShowPopup(true);

            // Fechar pop-up automaticamente após 3 segundos
            setTimeout(() => setShowPopup(false), 3000);
        }
    };

    // Componente de Estrelas Interativas
    const StarRating = ({ rating, onSetRating }: { rating: number; onSetRating: (value: number) => void }) => {
        return (
            <div className="flex space-x-0.5 justify-center sm:justify-start whitespace-nowrap">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onSetRating(star)}
                        className={`text-base sm:text-xl md:text-2xl lg:text-3xl transition-colors duration-200 ${star <= rating ? "text-yellow-500" : "text-gray-400"
                            }`}
                    >
                        {star <= rating ? "★" : "☆"}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div
            className={`p-4 sm:p-6 md:p-10 rounded-xl shadow-2xl max-w-md mx-auto w-full transition-all ${document.documentElement.classList.contains("dark")
                ? "bg-white/90 text-gray-900 border-gray-300"
                : "bg-gray-900/90 text-white border-gray-600"
                }`}
        >
            <h2 className="text-xl sm:text-2xl font-bold text-center">{text[language].title}</h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-sm sm:text-base">
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="text"
                        placeholder={text[language].firstNamePlaceholder}
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg"
                        required
                    />
                    <input
                        type="text"
                        placeholder={text[language].lastNamePlaceholder}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>

                <input
                    type="email"
                    placeholder={text[language].emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg"
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
                    <label className="font-bold">{text[language].workedWithMe}</label>
                </div>

                {/* Exibir campo correto com base na resposta */}
                {work ? (
                    <input
                        type="text"
                        placeholder={text[language].whereWorked}
                        value={workLocation}
                        onChange={(e) => setWorkLocation(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                ) : (
                    <input
                        type="text"
                        placeholder={text[language].whereMet}
                        value={knowLocation}
                        onChange={(e) => setKnowLocation(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                )}

                {/* Seção de Avaliação por Estrelas */}
                <div>
                    <p className="font-bold">{text[language].rating}</p>
                    <StarRating rating={rating} onSetRating={setRating} />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
                    {text[language].submit}
                </button>
            </form>

            {/* Pop-up informativo centralizado com animação */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                    <div className="p-4 sm:p-6 rounded-lg shadow-lg text-center animate-fade-in-out bg-white dark:bg-gray-800 text-black dark:text-white max-w-sm w-full mx-4">
                        <p className="text-base font-semibold">{popupMessage}</p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                        >
                            {text[language].close}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OpinionForm;
