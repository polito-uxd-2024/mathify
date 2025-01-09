import { fetchUser } from './fetch';
import { db } from '../Firebase';
import { ref, update } from 'firebase/database';

export async function aggiornaLivello(xpToAdd: number) {
    try {
        // Recupera i dati dell'utente
        const fetchedUser = await fetchUser("Utente1");

        // Calcola i nuovi XP totali
        let xpTotali = fetchedUser.livello.xpTotali + xpToAdd;
        let livelloAttuale = fetchedUser.livello.numero;

        // Soglia per salire di livello (5000 XP)
        const xpPerLivello = 5000;

        // Verifica se è necessario salire di livello
        while (xpTotali >= xpPerLivello) {
            xpTotali -= xpPerLivello; // Riduci gli XP totali in eccesso
            livelloAttuale += 1; // Incrementa il livello
        }

        // Aggiorna i dati esistenti nel database
        const userRef = ref(db, `Utenti/Utente1/Livello`);
        await update(userRef, {
            XpLivello: xpTotali,
            Numero: livelloAttuale,
        });

        console.log('XP e livello aggiornati con successo:', {
            xpTotali,
            livello: livelloAttuale,
        });
    } catch (error) {
        console.error("Errore durante l'aggiornamento del livello:", error);
    }
}
