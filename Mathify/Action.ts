import {Sfida, Utente} from "./Component/Interfaces";


export type Action =
    | { type: 'setSelectedChallenge'; challenge: Sfida}
    | { type: 'setPunteggio'; punteggio: number}
    | {type: 'setCurrentUser'; user: Utente};


export const setPunteggio = (punteggio: number): Action => ({
    type: 'setPunteggio',
    punteggio,
});
export const setSelectedChallenge = (challenge: Sfida): Action => ({
    type: 'setSelectedChallenge',
    challenge,
})
export const setCurrentUser = (user: Utente): Action => ({
    type: 'setCurrentUser',
    user,
});