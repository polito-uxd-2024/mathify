import { useCallback } from "react";
import { fetchUser } from "./fetch"; // Assumendo che fetchUser sia definito qui
import { setCurrentUser } from "../Action"; // Azione per aggiornare il contesto
import { useContext } from "react";
import { StateContext } from "../Reducer";
import { useFocusEffect } from "@react-navigation/native";

// Custom hook per gestire l'utente corrente
export const useSetCurrentUser = (userId: string) => {
    const [, dispatch] = useContext(StateContext);

    useFocusEffect(
        useCallback(() => {
            if (!userId) return; // Interrompi immediatamente se userId è vuoto

            const loadUser = async () => {
                try {
                    const user = await fetchUser(userId);
                    dispatch(setCurrentUser(user)); // Aggiorna il contesto con l'utente caricato
                } catch (error) {
                    console.error("Errore durante il fetch dell'utente:", error);
                }
            };

            loadUser();
        }, [userId, dispatch]) // Dipendenze corrette
    );
};
