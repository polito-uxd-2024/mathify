import {DomandaSegnalata, Sfida, Utente} from "./Component/Interfaces";


export type Action =
    | { type: 'setSelectedChallenge'; challenge: Sfida}
    | { type: 'setPunteggio'; punteggio: number}
    | {type: 'setCurrentUser'; user: Utente}
    | {type: 'setChallengeList'; challengeList: Sfida[]}
| {type: 'setSegnalazioniList'; segnalazioniList: DomandaSegnalata[]};


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
export const setChallengeList= (challengeList: Sfida[]): Action => ({
    type: 'setChallengeList',
    challengeList,
});
export const setSegnalazioniList= (segnalazioniList: DomandaSegnalata[]): Action => ({
    type: 'setSegnalazioniList',
    segnalazioniList,
});