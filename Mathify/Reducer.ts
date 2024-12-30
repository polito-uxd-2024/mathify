import {createContext} from "react";
import {Action} from "./Action";
import {Sfida} from "./pages/PlayScreen";

interface State{
    selectedChallenge:Sfida;

}
export function Reducer(state:State,action:Action):State{
    switch (action.type){
        case "setPunteggio":
            return ({
                ...state,
                selectedChallenge:{...state.selectedChallenge,
                    punteggioOttenuto:action.punteggio}
            })
    }
}

export const InitialState:State={
    selectedChallenge:{id:"0",
        punteggioOttenuto:0,
        questions:[]}
}
export const StateContext=
    createContext<[State,React.Dispatch<Action>]>([InitialState,(_:Action)=>{}])
