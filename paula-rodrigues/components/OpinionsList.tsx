"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { useTheme } from "next-themes";
import { Alegreya } from "next/font/google";

const alegreya = Alegreya({ subsets: ["latin"], weight: "700" });

type Opinion = {
    id: string;
    firstName: string;
    lastName: string;
    work: boolean;
    workLocation?: string;
    knowLocation?: string;
    comment: string;
    rating: number;
    date: string;
    approved: boolean;
};

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
    const { theme } = useTheme();
    const [opinions, setOpinions] = useState<Opinion[]>([]);
    const [isClient, setIsClient] = useState(false);

    // ✅ Verifica se o código está rodando no cliente antes de acessar `document`
    useEffect(() => {
        setIsClient(true);
        async function fetchOpinions() {
            try {
                const response = await fetch("/api/opinions");
                const data = await response.json();

                if (Array.isArray(data)) {
                    setOpinions(data);
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
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 ${theme === "dark" ? "text-gray-900" : "text-yellow-400"} text-center ${alegreya.className}`}>
                {language === "EN" ? "Feedbacks" : "Feedbacks"}
            </h2>

            {!isClient ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : opinions.length === 0 ? (
                <p
                    className={`text-center mt-2 p-4 rounded-lg font-semibold ${theme === "dark"
                            ? "bg-white/90 text-gray-900 border border-gray-300"
                            : "bg-gray-900/90 text-white border border-gray-600"
                        }`}
                >
                    {language === "EN" ? "No approved feedbacks yet." : "Ainda não há opiniões aprovadas."}
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {opinions.map(({ id, firstName, lastName, work, workLocation, knowLocation, comment, rating, date, approved }) => (
                        <div
                            key={id}
                            className={`p-6 rounded-lg shadow-lg ${approved
                                    ? "bg-white text-gray-900 border-gray-300"
                                    : "bg-red-100 text-red-700 border-red-500"
                                }`}
                        >
                            <p className="font-bold text-lg">
                                {firstName} {lastName}
                            </p>
                            <p className="text-sm text-gray-500">
                                📅 {date ? new Date(date).toLocaleDateString() : "Data indisponível"}
                            </p>

                            {work ? (
                                <p className="text-green-600 font-semibold">
                                    ✅ {language === "EN" ? "Worked with me at" : "Trabalhou comigo em"}: {workLocation}
                                </p>
                            ) : (
                                <p className="text-blue-600 font-semibold">
                                    📍 {language === "EN" ? "Met me at" : "Conheceu-me em"}: {knowLocation}
                                </p>
                            )}

                            <p className="mt-2">{comment}</p>
                            <StarRating rating={rating} />

                            {!approved && (
                                <p className="mt-2 text-xs font-bold text-red-600 text-center">
                                    {language === "EN" ? "Awaiting approval" : "Aguardando aprovação"}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OpinionsList;
