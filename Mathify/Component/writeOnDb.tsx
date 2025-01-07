import { ref, set, push } from "firebase/database";
import {SfidaCompletata} from "./Interfaces";
import {db} from "../Firebase";

// Funzione per registrare una sfida completata
export default function registraSfidaCompletata(sfidaCompletata: SfidaCompletata) {

    const userSfideRef = ref(db, `Utenti/Utente1/SfideCompletate`);

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
        Punteggio: sfidaCompletata.punteggio,
        TempoImpiegato: sfidaCompletata.tempoImpiegato,
        XP: sfidaCompletata.xpGuadagnati,
    };

    // Salva i dati nel database
    set(ref(db, `Utenti/Utente1/SfideCompletate/${newSfidaKey}`), sfidaData)
        .then(() => {
            console.log("Sfida completata registrata con successo!");
        })
        .catch((error) => {
            console.error("Errore durante la registrazione della sfida:", error);
        });
}
