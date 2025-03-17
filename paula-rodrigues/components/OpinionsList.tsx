"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageContext";

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
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`text-3xl ${star <= rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                >
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
        <div className="mt-8 w-full max-w-3xl">
            <h2 className="text-4xl font-bold text-white">
                {language === "EN" ? "Feedbacks" : "Opiniões"}
            </h2>

            {opinions.length === 0 ? (
                <p className="text-white mt-2">
                    {language === "EN" ? "No approved feedbacks yet." : "Ainda não há opiniões aprovadas."}
                </p>
            ) : (
                <div className="mt-4 space-y-4">
                    {opinions.map(({ id, name, work, comment, rating, date }) => (
                        <div key={id} className="bg-white p-4 rounded-lg shadow-md">
                            <p className="font-bold">{name}</p>
                            <p className="text-sm text-gray-500">
                                📅 {date ? new Date(date).toLocaleDateString() : "Data indisponível"}
                            </p>
                            {work && <p className="text-green-600 font-semibold">✅ Trabalhou comigo</p>}
                            <p className="text-gray-600">{comment}</p>
                            <StarRating rating={rating} /> {/* Mostra a avaliação apenas visualmente */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OpinionsList;
