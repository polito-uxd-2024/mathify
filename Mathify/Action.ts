import {Sfida} from "./Component/Interfaces";


export type Action =
    | { type: 'setSelectedChallenge'; challenge: Sfida}
    | { type: 'setPunteggio'; punteggio: number};


export const setPunteggio = (punteggio: number): Action => ({
    type: 'setPunteggio',
    punteggio,
});
export const setSelectedChallenge = (challenge: Sfida): Action => ({
    type: 'setSelectedChallenge',
    challenge,
})