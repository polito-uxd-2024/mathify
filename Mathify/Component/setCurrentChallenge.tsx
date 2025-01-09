import { useEffect } from "react";
import { fetchChallenge } from "./fetch";
import { setSelectedChallenge } from "../Action";
import { useContext } from "react";
import { StateContext } from "../Reducer";

// Custom hook per gestire la sfida corrente
export const useSetCurrentChallenge = (sfidaSelected: string) => {
    const [, dispatch] = useContext(StateContext);

    useEffect(() => {
        const loadChallenge = async () => {
            try {
                if (!sfidaSelected) return; // Verifica che il valore non sia vuoto
                const challenge = await fetchChallenge(sfidaSelected);
                dispatch(setSelectedChallenge(challenge));
            } catch (error) {
                console.error("Errore durante il fetch della sfida:", error);
            }
        };

        loadChallenge();
    }, [sfidaSelected, dispatch]); // Assicurati di usare sfidaSelected come dipendenza
};
