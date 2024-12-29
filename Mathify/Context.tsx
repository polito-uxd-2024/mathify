import {Sfida} from "./pages/PlayScreen";
import {createContext, useContext} from "react";

export interface State{
    selectedChallenge:Sfida|null;
}
export const InitialState:State={
    selectedChallenge:null
}

export type Action =
    | { type: 'setSelectedChallenge'; challenge: Sfida | null };
export const setSelectedChallenge = (challenge: Sfida | null): Action => ({
    type: 'setSelectedChallenge',
    challenge,
});
export const contextReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'setSelectedChallenge':
            return { ...state, selectedChallenge: action.challenge };
        default:
            throw new Error('Azione non riconosciuta');
    }
}
export const Context = createContext<{state: State;
    dispatch: React.Dispatch<Action>} | undefined>(undefined);
export const useContextState = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error('useContextState deve essere utilizzato all\'interno di un ContextProvider');
    }
    return context;
};