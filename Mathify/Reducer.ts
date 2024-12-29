import {createContext} from "react";
import {Action} from "./Action";
import {Sfida} from "./pages/PlayScreen";

interface State{
    selectedChallenge:Sfida;
}
export function Reducer(state: State, action: Action): State {
    switch (action.type) {
        case "setSelectedChallenge":
            return { ...state, selectedChallenge: action.challenge };
        default:
            return state; // Ritorna lo stato corrente per azioni sconosciute
    }
}

export const InitialState:State={
    selectedChallenge:{id:"0",
        punteggioOttenuto:0,
        questions:[]}
}
export const StateContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({
    state: InitialState,
    dispatch: () => {}, // Funzione vuota come placeholder
});
