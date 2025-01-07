import { ref, set, push } from "firebase/database";
import {SfidaCompletata} from "./Interfaces";
import {db} from "../Firebase";

// Funzione per registrare una sfida completata
export default function registraSfidaCompletata(userId: string, sfidaCompletata: SfidaCompletata) {

    const userSfideRef = ref(db, `Utenti/${userId}/SfideCompletate`);

    // Genera un nuovo ID per il tentativo
    const newSfidaKey = push(userSfideRef).key;

    const sfidaData = {
        DataCompletamento: new Date().toISOString(),
        Domande: sfidaCompletata.domande.map((domanda) => ({
            Testo: domanda.Testo,
            Risposte: domanda.Risposte,
            RispostaCorretta: domanda.RispostaCorretta,
            TempoImpiegato: domanda.tempoImpiegato,
            Correttezza: domanda.correttezza,
        })),
        Sfida: {
            Argomento: sfidaCompletata.sfida.argomento,
            Difficoltà: sfidaCompletata.sfida.difficoltà,
            Titolo: sfidaCompletata.sfida.titolo,
            Domande: sfidaCompletata.sfida.questions.map((question) => ({
                Testo: question.Testo,
                Spiegazione: question.Spiegazione,
                Risposte: question.Risposte,
                Soluzione: question.Soluzione,
                Grafico: question.Grafico,
                GraficList: question.GraficList,
            })),
        },
        Punteggio: sfidaCompletata.punteggio,
        TempoImpiegato: sfidaCompletata.tempoImpiegato,
        XP: sfidaCompletata.xpGuadagnati,
    };

    // Salva i dati nel database
    set(ref(db, `Utenti/${userId}/SfideCompletate/${newSfidaKey}`), sfidaData)
        .then(() => {
            console.log("Sfida completata registrata con successo!");
        })
        .catch((error) => {
            console.error("Errore durante la registrazione della sfida:", error);
        });
}
