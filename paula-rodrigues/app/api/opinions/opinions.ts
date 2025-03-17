import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

// Definição do tipo Opinion
type Opinion = {
    id: string;
    name: string;
    comment: string;
    rating: number;
    work: boolean;
    date: string;
    approved: boolean;
};

// Obter todas as opiniões aprovadas (GET)
export async function GET() {
    try {
        const opinionsRef = collection(db, "opinions");
        const snapshot = await getDocs(opinionsRef);

        // Se não houver documentos, retorna um array vazio
        if (snapshot.empty) {
            return NextResponse.json([]); // Retorna um array vazio para evitar erro de `.map()`
        }

        // Converte os documentos para objetos e filtra os aprovados
        const opinions: Opinion[] = snapshot.docs
            .map(doc => ({ id: doc.id, ...(doc.data() as Omit<Opinion, "id">) }))
            .filter(opinion => opinion.approved === true); // Filtra apenas os aprovados

        return NextResponse.json(opinions);
    } catch (error) {
        console.error("🔥 Erro ao buscar opiniões:", error);
        return NextResponse.json({ error: "Erro ao obter opiniões." }, { status: 500 });
    }
}

// Adicionar uma nova opinião (POST)
export async function POST(req: Request) {
    try {
        const { name, comment, rating, work } = await req.json();

        // Validação dos dados obrigatórios
        if (!name || !comment || rating === undefined) {
            return NextResponse.json({ error: "Nome, comentário e avaliação são obrigatórios." }, { status: 400 });
        }

        const newOpinion: Omit<Opinion, "id"> = {
            name,
            comment,
            rating,
            work: Boolean(work), // Converte `work` para booleano
            approved: false, // Sempre começa como não aprovado
            date: new Date().toISOString(), // Salva a data atual
        };

        await addDoc(collection(db, "opinions"), newOpinion);

        return NextResponse.json({ message: "Comentário enviado para aprovação!" }, { status: 201 });
    } catch (error) {
        console.error("🔥 Erro ao adicionar opinião:", error);
        return NextResponse.json({ error: "Erro ao enviar opinião." }, { status: 500 });
    }
}
