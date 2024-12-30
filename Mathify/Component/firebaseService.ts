import { getDatabase, ref, get } from "firebase/database";
import {db} from "../Firebase";

export const fetchUser = async (userId: string) => {

    const userRef = ref(db, `Utenti/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        throw new Error("User not found");
    }
};

export const fetchChallenge = async (challengeId: string) => {

    const challengeRef = ref(db, `Sfide/${challengeId}`);
    const snapshot = await get(challengeRef);
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        throw new Error("Challenge not found");
    }
};
