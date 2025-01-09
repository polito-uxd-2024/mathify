import { useEffect } from "react";
import { fetchUser } from "./fetch"; // Assumendo che fetchUser sia definito qui
import { setCurrentUser } from "../Action"; // Azione per aggiornare il contesto
import { useContext } from "react";
import { StateContext } from "../Reducer";

// Custom hook per gestire l'utente corrente
export const useSetCurrentUser = (userId: string) => {
    const [, dispatch] = useContext(StateContext);

    useEffect(() => {
        const loadUser = async () => {
            try {
                if (!userId) return; // Verifica che il valore non sia vuoto
                const user = await fetchUser(userId);
                dispatch(setCurrentUser(user)); // Aggiorna il contesto con l'utente caricato
            } catch (error) {
                console.error("Errore durante il fetch dell'utente:", error);
            }
        };

        loadUser();
    }, [userId, dispatch]); // Assicurati di usare userId come dipendenza
};
