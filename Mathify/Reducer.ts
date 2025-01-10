import {createContext} from "react";
import {Action} from "./Action";

import {Sfida, Utente} from "./Component/Interfaces";


interface State{
    selectedChallenge:Sfida;
    utente:Utente;
    challengeList:Sfida[];
}
export function Reducer(state: State, action: Action) {
    switch (action.type) {
        case "setPunteggio":
            return {
                ...state,
                selectedChallenge: {
                    ...state.selectedChallenge,
                    punteggioOttenuto: action.punteggio
                }
            };
        case "setSelectedChallenge":
            return {
                ...state,
                selectedChallenge: action.challenge
            };
            case "setCurrentUser":
                return {
                    ...state,
                    utente: action.user
                }
                case "setChallengeList":
                    return {
                        ...state,
                        challengeList: action.challengeList
                    }
        default:
            return state;
    }
}

export const InitialState:State={
    selectedChallenge:{argomento:"Geometria Analitica",
        difficoltà:1,
        questions:[],titolo:"Rette sul piano",
    }
    ,
    utente:{
        nome:"Giovanni",
        cognome:"Rossi",
        livello:{numero:1,xpTotali:10},
        sfideCompletate:[],
        verifica:false},
    challengeList:[]
}
export const StateContext=
    createContext<[State,React.Dispatch<Action>]>([InitialState,(_:Action)=>{}])
