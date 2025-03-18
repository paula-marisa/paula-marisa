"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { Alegreya } from "next/font/google";

const alegreya = Alegreya({ subsets: ["latin"], weight: "700" });

type Opinion = {
    id: string;
    name: string;
    work: boolean;
    comment: string;
    rating: number;
    date: string;
};

// ⭐️ Componente para Exibir Estrelas Fixas (Apenas Visualização)
const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`text-2xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                >
                    ★
                </span>
            ))}
        </div>
    );
};

const OpinionsList = () => {
    const { language } = useLanguage();
    const [opinions, setOpinions] = useState<Opinion[]>([]);

    useEffect(() => {
        async function fetchOpinions() {
            try {
                const response = await fetch("/api/opinions");
                const data = await response.json();

                if (Array.isArray(data)) {
                    const approvedOpinions = data.filter((opinion) => opinion.approved);
                    setOpinions(approvedOpinions);
                } else {
                    console.error("Erro: API não retornou um array");
                }
            } catch (error) {
                console.error("Erro ao buscar opiniões:", error);
            }
        }
        fetchOpinions();
    }, []);

    return (
        <div className="mt-8 w-full max-w-6xl">
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-[#1f536e] text-center ${alegreya.className}`}>
                {language === "EN" ? "Feedbacks" : "Feedbacks"}
            </h2>

            {opinions.length === 0 ? (
                <p className="text-white text-center mt-2">
                    {language === "EN" ? "No approved feedbacks yet." : "Ainda não há opiniões aprovadas."}
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {opinions.map(({ id, name, work, comment, rating, date }) => (
                        <div key={id} className="bg-white p-6 rounded-lg shadow-lg">
                            <p className="font-bold text-lg text-gray-900">{name}</p>
                            <p className="text-sm text-gray-500">
                                📅 {date ? new Date(date).toLocaleDateString() : "Data indisponível"}
                            </p>
                            {work && <p className="text-green-600 font-semibold">✅ Trabalhou comigo</p>}
                            <p className="text-gray-700 mt-2">{comment}</p>
                            <StarRating rating={rating} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OpinionsList;
