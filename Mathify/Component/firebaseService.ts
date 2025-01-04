import { getDatabase, ref, get } from "firebase/database";
import {db} from "../Firebase";
import {Sfida} from "./Interfaces";

export const fetchUser = async (userId: string) => {

    const userRef = ref(db, `Utenti/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        throw new Error("User not found");
    }
};

export const fetchChallenge = async (challengeId: string) => {
    const challengeRef = ref(db, `Sfide/${challengeId}`);
    const snapshot = await get(challengeRef);
    if (snapshot.exists()) {
        const data = snapshot.val();
        const challenge: Sfida = {
            questions: Object.keys(data.Domande).map(key => ({
                Testo: data.Domande[key].Testo,
                Risposte: [data.Domande[key].A, data.Domande[key].B, data.Domande[key].C, data.Domande[key].D],
                RispostaCorretta: data.Domande[key].Soluzione, // Assuming you will set this later
                Grafico: data.Domande[key].Grafico,
                Spiegazione: data.Domande[key].Spiegazione,
                GraficList: [data.Domande[key].GA, data.Domande[key].GB, data.Domande[key].GC, data.Domande[key].GD],
                Soluzione: data.Domande[key].Soluzione
                // Assuming default value
            })),
            difficoltà: data.Difficoltà,
            argomento: data.Argomento,
            titolo: data.Titolo
            // Assuming default value
        };
        return challenge;
    } else {
        throw new Error("Challenge not found");
    }
};

