import { ref, set, get } from "firebase/database";
import {Sfida, SfidaCompletata} from "./Interfaces";
import { db } from "../Firebase";
import {fetchUser} from "./fetch";
import {StateContext} from "../Reducer";
import {useContext} from "react";

// Funzione per registrare una sfida completata
export async function registraSfidaCompletata(sfidaCompletata: SfidaCompletata, selectedChallenge:Sfida) {
    const userSfideRef = ref(db, `Utenti/Utente1/SfideCompletate`);
    

    try {
        // Fetch the current number of challenges
        const snapshot = await get(userSfideRef);
        const currentCount = snapshot.size;

        // Increment the counter
        const newId = currentCount + 1;

        const sfidaData = {
            DataCompletamento: new Date().toISOString(),
            Domande: sfidaCompletata.domande.map((domanda, index) => ({
                Testo: domanda.Testo,
                Risposte: domanda.Risposte,
                RispostaCorretta: domanda.RispostaCorretta,
                TempoImpiegato: domanda.tempoImpiegato,
                Correttezza: domanda.correttezza,
                Spiegazione: domanda.Spiegazione,
                GraficList: selectedChallenge.questions[index].GraficList
            })),
            Punteggio: sfidaCompletata.punteggio,
            TempoImpiegato: sfidaCompletata.tempoImpiegato,
            XP: sfidaCompletata.xpGuadagnati,
            Titolo: sfidaCompletata.titolo,
            Argomento: selectedChallenge.argomento,
            Difficoltà: selectedChallenge.difficolta,
            Segnalazioni: sfidaCompletata.segnalazioni,

        };

        // Save the data in the database
        await set(ref(db, `Utenti/Utente1/SfideCompletate/${newId}`), sfidaData);
        console.log("Sfida completata registrata con successo!");
    } catch (error) {
        console.error("Errore durante la registrazione della sfida:", error);
    }
}


export async function registraVerifica(userId: string) {
    const userVerificaRef = ref(db, `Utenti/${userId}/Verifica`);

    try {
        // Fetch the user data
        const user = await fetchUser(userId);

        // Check if the user's level is greater than 10
        if (user.livello.numero >= 10) {
            // Fetch the current value of userVerificaRef
            const snapshot = await get(userVerificaRef);
            const verificaValue = snapshot.val();

            // If the value is false, set it to true
            if (!verificaValue) {
                await set(userVerificaRef, true);
                console.log("Verifica set to true");
            } else {
                console.log("Verifica is already true");
            }
        } else {
            console.log("User level is not greater than 10");
        }
    } catch (error) {
        console.error("Errore durante la registrazione della verifica:", error);
    }
}
