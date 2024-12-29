import { ref, get } from 'firebase/database';
import { db } from '../Firebase';
import {Sfida} from "../pages/PlayScreen";


export async function fetchDataFromFirebase(sfidaName: string): Promise<Sfida | null> {
    try {
        const nodeRef = ref(db, `sfide/${sfidaName}`); // Create a reference to the specified node
        const snapshot = await get(nodeRef); // Fetch the data from the node
        if (snapshot.exists()) {
            const data = snapshot.val();
            const sfida: Sfida = {
                id: data.id, punteggioOttenuto: 0, questions: data.questions};
            return sfida; // Return the formatted object
        } else {
            console.log("No data available at the specified node");
            return null;
        }
    } catch (error) {
        console.error("Error fetching data from Firebase: ", error);
        throw error; // Rethrow the error for further handling
    }
}