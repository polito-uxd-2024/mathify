import {Sfida} from "./pages/PlayScreen";



export type Action =
    | { type: 'setSelectedChallenge'; challenge: Sfida};
export const setSelectedChallenge = (challenge: Sfida): Action => ({
    type: 'setSelectedChallenge',
    challenge,
});
