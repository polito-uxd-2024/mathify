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
            id: challengeId,
            questions: Object.keys(data.Domande).map(key => ({
                Testo: data.Domande[key].testo,
                Risposte: [data.Domande[key].A, data.Domande[key].B, data.Domande[key].C, data.Domande[key].D],
                RispostaCorretta: "", // Assuming you will set this later
                Grafico: false // Assuming default value
            })),
            punteggioOttenuto: 0 // Assuming default value
        };
        return challenge;
    } else {
        throw new Error("Challenge not found");
    }
};

