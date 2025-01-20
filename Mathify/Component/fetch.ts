import { getDatabase, ref, get } from "firebase/database";
import {db} from "../Firebase";
import {Sfida, SfidaCompletata, Utente} from "./Interfaces";

export const fetchUser = async (userId: string): Promise<Utente> => {
    const userRef = ref(db, `Utenti/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
        const data = snapshot.val();
        const user: Utente = {
            nome: data.Nome,
            cognome: data.Cognome,
            livello: {
                numero: data.Livello.Numero,
                xpTotali: data.Livello.XpLivello
            },
            verifica: data.Verifica,
            email: data.Email,

            sfideCompletate: Object.keys(data.SfideCompletate).map(key => ({
                punteggio: data.SfideCompletate[key].Punteggio,
                tempoImpiegato: data.SfideCompletate[key].TempoImpiegato,
                domande: Object.keys(data.SfideCompletate[key].Domande).map(k => ({
                    Testo: data.SfideCompletate[key].Domande[k].Testo,
                    Risposte: [data.SfideCompletate[key].Domande[k].Risposte.map((risposta: string) => risposta)],
                    RispostaCorretta: data.SfideCompletate[key].Domande[k].RispostaCorretta,
                    tempoImpiegato: data.SfideCompletate[key].Domande[k].TempoImpiegato,
                    correttezza: data.SfideCompletate[key].Domande[k].Correttezza
                })),
                xpGuadagnati: data.SfideCompletate[key].XP,
                titolo: data.SfideCompletate[key].Titolo,
                dataCompletamento: new Date(data.SfideCompletate[key].DataCompletamento),
                argomento: data.SfideCompletate[key].Argomento,
                segnalazioni:data.SfideCompletate[key].Segnalazioni
            }))
        };
        return user;
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

                Spiegazione: data.Domande[key].Spiegazione,
                GraficList: data.Domande[key].Grafico === "Risposte" ? [data.Domande[key].GA, data.Domande[key].GB, data.Domande[key].GC, data.Domande[key].GD]
                    : data.Domande[key].Grafico === "Domanda" ? [data.Domande[key].GT] : [],
                Soluzione: data.Domande[key].Soluzione
                // Assuming default value
            })),
            difficolta: data.Difficoltà,
            argomento: data.Argomento,
            titolo: data.Titolo
            // Assuming default value
        };
        return challenge;
    } else {
        throw new Error("Challenge not found");
    }
};
export const fetchChallengeList = async () => {
    const challengesRef = ref(db, 'Sfide');
    const snapshot = await get(challengesRef);
    if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data);
        const challenges: Sfida[] = Object.keys(data).map(key => ({
            questions: Object.keys(data[key].Domande).map(k => ({
                Testo: data[key].Domande[k].Testo,
                Risposte: [data[key].Domande[k].A, data[key].Domande[k].B, data[key].Domande[k].C, data[key].Domande[k].D],

                GraficList: data[key].Domande[k].Grafico === "Risposte" ? [data[key].Domande[k].GA, data[key].Domande[k].GB, data[key].Domande[k].GC, data[key].Domande[k].GD]
                    : data[key].Domande[k].Grafico === "Domanda" ? [data[key].Domande[k].GT] : [],
                Spiegazione: data[key].Domande[k].Spiegazione,

                Soluzione: data[key].Domande[k].Soluzione
            })),
            difficolta: data[key].Difficoltà,
            argomento: data[key].Argomento,
            titolo: data[key].Titolo
        }));
        return challenges;
    }
}

