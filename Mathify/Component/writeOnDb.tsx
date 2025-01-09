import { ref, set, get } from "firebase/database";
import { SfidaCompletata } from "./Interfaces";
import { db } from "../Firebase";

// Funzione per registrare una sfida completata
export default async function registraSfidaCompletata(sfidaCompletata: SfidaCompletata) {
    const userSfideRef = ref(db, `Utenti/Utente1/SfideCompletate`);

    try {
        // Fetch the current number of challenges
        const snapshot = await get(userSfideRef);
        const currentCount = snapshot.size;

        // Increment the counter
        const newId = currentCount + 1;

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
            id: sfidaCompletata.id,
        };

        // Save the data in the database
        await set(ref(db, `Utenti/Utente1/SfideCompletate/${newId}`), sfidaData);
        console.log("Sfida completata registrata con successo!");
    } catch (error) {
        console.error("Errore durante la registrazione della sfida:", error);
    }
}