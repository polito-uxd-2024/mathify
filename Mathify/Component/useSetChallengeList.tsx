import { useEffect } from "react";
import {fetchChallenge, fetchChallengeList} from "./fetch";
import {setChallengeList, setSelectedChallenge} from "../Action";
import { useContext } from "react";
import { StateContext } from "../Reducer";

// Custom hook per gestire la sfida corrente
export const useSetChallengeList = () => {
    const [, dispatch] = useContext(StateContext);

    useEffect(() => {
        const loadChallenge = async () => {
            try {
                 // Verifica che il valore non sia vuoto
                const challenge = await fetchChallengeList();
                if (!challenge) return;
                dispatch(setChallengeList(challenge));
            } catch (error) {
                console.error("Errore durante il fetch della sfida:", error);
            }
        };

        loadChallenge();
    }, [dispatch]); // Assicurati di usare sfidaSelected come dipendenza
};