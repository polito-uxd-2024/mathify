import {useContext, useEffect, useState} from "react";
import {fetchChallenge} from "./firebaseService";
import {setSelectedChallenge} from "../Action";
import {StateContext} from "../Reducer";



export default function setCurrentChallenge(sfidaSelected: string) {
    const [state, dispatch] = useContext(StateContext);
    const [sfida, setSfida] = useState("Sfida1");

    useEffect(() => {const loadChallenge = async () => {
        try {
            setSfida(sfidaSelected);
            const challenge = await fetchChallenge(sfida);
            dispatch(setSelectedChallenge(challenge));
        } catch (error) {
            console.error(error);
        }
    };

        loadChallenge();
    }, [dispatch]);
}
