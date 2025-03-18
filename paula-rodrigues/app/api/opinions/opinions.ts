import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

// Definição do tipo Opinion
type Opinion = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    comment: string;
    rating: number;
    work: boolean;
    workLocation?: string;
    knowLocation?: string;
    date: string;
    approved: boolean;
};

type Language = "pt" | "en";

// Função para obter mensagens de erro e sucesso conforme o idioma
const getMessages = (lang: Language) => {
    const messages = {
        pt: {
            errorFetching: "Erro ao obter opiniões.",
            errorSending: "Erro ao enviar opinião.",
            errorMissingFields: "Nome, sobrenome, email, comentário e avaliação são obrigatórios.",
            errorWorkLocation: "Se trabalhou comigo, indique onde.",
            errorKnowLocation: "Se não trabalhou comigo, indique onde me conheceu.",
            success: "Comentário enviado para aprovação!",
        },
        en: {
            errorFetching: "Error retrieving opinions.",
            errorSending: "Error submitting opinion.",
            errorMissingFields: "First name, last name, email, comment, and rating are required.",
            errorWorkLocation: "If you worked with me, please specify where.",
            errorKnowLocation: "If you didn't work with me, please specify where you met me.",
            success: "Comment submitted for approval!",
        },
    };
    return messages[lang] || messages.en; // Retorna português se não houver um idioma válido
};

// Obter todas as opiniões aprovadas (GET)
export async function GET(req: Request) {
    try {
        // Detecta o idioma a partir do cabeçalho da requisição (padrão: português)
        const lang = req.headers.get("Accept-Language")?.split(",")[0].toLowerCase().includes("en") ? "en" : "pt";
        const messages = getMessages(lang);

        const opinionsRef = collection(db, "opinions");
        const snapshot = await getDocs(opinionsRef);

        if (snapshot.empty) {
            return NextResponse.json([]);
        }

        const opinions: Opinion[] = snapshot.docs
            .map(doc => ({ id: doc.id, ...(doc.data() as Omit<Opinion, "id">) }))
            .filter(opinion => opinion.approved === true); // Filtra apenas os aprovados

        return NextResponse.json(opinions);
    } catch (error) {
        console.error("🔥 Erro ao buscar opiniões:", error);
        return NextResponse.json({ error: getMessages("pt").errorFetching }, { status: 500 });
    }
}

// Adicionar uma nova opinião (POST)
export async function POST(req: Request) {
    try {
        // Detecta o idioma a partir do cabeçalho da requisição (padrão: português)
        const lang = req.headers.get("Accept-Language")?.split(",")[0].toLowerCase().includes("en") ? "en" : "pt";
        const messages = getMessages(lang);

        const { firstName, lastName, email, comment, rating, work, workLocation, knowLocation } = await req.json();

        // Validação dos dados obrigatórios
        if (!firstName || !lastName || !email || !comment || rating === undefined) {
            return NextResponse.json({ error: messages.errorMissingFields }, { status: 400 });
        }

        if (work && !workLocation) {
            return NextResponse.json({ error: messages.errorWorkLocation }, { status: 400 });
        }

        if (!work && !knowLocation) {
            return NextResponse.json({ error: messages.errorKnowLocation }, { status: 400 });
        }

        const newOpinion: Omit<Opinion, "id"> = {
            firstName,
            lastName,
            email,
            comment,
            rating: Number(rating), // Converte para número para evitar erros
            work: Boolean(work), // Garante que `work` é booleano
            workLocation: work ? workLocation : "", // Define se trabalhou com você
            knowLocation: !work ? knowLocation : "", // Define onde conheceu caso não tenha trabalhado
            approved: false, // Sempre começa como não aprovado
            date: new Date().toISOString(), // Salva a data atual
        };

        await addDoc(collection(db, "opinions"), newOpinion);

        return NextResponse.json({ message: messages.success }, { status: 201 });
    } catch (error) {
        console.error("🔥 Erro ao adicionar opinião:", error);
        return NextResponse.json({ error: getMessages("en").errorSending }, { status: 500 });
    }
}
