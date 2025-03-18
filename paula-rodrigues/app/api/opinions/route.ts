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

// Método GET - Obter todas as opiniões aprovadas
export async function GET() {
    try {
        const opinionsRef = collection(db, "opinions");
        const snapshot = await getDocs(opinionsRef);

        if (snapshot.empty) {
            return NextResponse.json([], { status: 200 });
        }

        // Mapear os documentos para objetos, garantindo que `approved` existe
        const approvedOpinions = snapshot.docs
            .map((doc) => {
                const data = doc.data() as Partial<Opinion>; // Cast seguro para evitar erros
                return {
                    id: doc.id,
                    firstName: data.firstName ?? "Anônimo",
                    lastName: data.lastName ?? "",
                    email: data.email ?? "",
                    comment: data.comment ?? "",
                    rating: data.rating ?? 0,
                    work: Boolean(data.work),
                    workLocation: data.workLocation ?? "",
                    knowLocation: data.knowLocation ?? "",
                    date: data.date ?? new Date().toISOString(),
                    approved: data.approved ?? false, // Garante que `approved` existe
                };
            })
            .filter((opinion) => opinion.approved); // Filtrar apenas os aprovados

        return NextResponse.json(approvedOpinions, { status: 200 });

    } catch (error) {
        console.error("🔥 Erro ao buscar opiniões:", error);
        return NextResponse.json({ error: "Erro ao obter opiniões." }, { status: 500 });
    }
}

// Método POST - Adicionar uma nova opinião (não aprovada por padrão)
export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, comment, rating, work, workLocation, knowLocation } = await req.json();

        // Validação dos dados obrigatórios
        if (!firstName || !lastName || !email || !comment || rating === undefined) {
            return NextResponse.json({ error: "Nome, email, comentário e avaliação são obrigatórios." }, { status: 400 });
        }

        if (work && !workLocation) {
            return NextResponse.json({ error: "Se trabalhou comigo, indique onde." }, { status: 400 });
        }

        if (!work && !knowLocation) {
            return NextResponse.json({ error: "Se não trabalhou comigo, indique onde me conheceu." }, { status: 400 });
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

        return NextResponse.json({ message: "Comentário enviado para aprovação!" }, { status: 201 });
    } catch (error) {
        console.error("🔥 Erro ao enviar opinião:", error);
        return NextResponse.json({ error: "Erro ao enviar opinião." }, { status: 500 });
    }
}
