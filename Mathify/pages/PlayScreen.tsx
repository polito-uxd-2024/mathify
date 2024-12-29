import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { Appbar, Card, Button, Text, ProgressBar, IconButton } from "react-native-paper";
import { styles } from "../App";
import {get, getDatabase, ref, child} from "firebase/database";



interface Domanda {
    A: string;
    B: string;
    C: string;
    D: string;
    testo: string;
}

interface Sfida {
    Argomento: string;
    Titolo: string;
    domande: Record<string, Domanda>;
}

export default function PlayScreen() {
    const [progress, setProgress] = useState(0);
    const [sfida, setSfida] = useState<Sfida | null>(null); // Stato per i dati della sfida

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 1) {
                    clearInterval(interval);
                    Alert.alert("Time's up", "You have run out of time!");
                    return 1;
                }
                return prev + 0.01;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Funzione per recuperare i dati della sfida
    const fetchSfida1 = async () => {
        try {
            const db = getDatabase();
            const dbRef = ref(db);

            const snapshot = await get(child(dbRef, `Sfide/Sfida1`));
            if (snapshot.exists()) {
                const sfidaData = snapshot.val() as Sfida;
                console.log("Dati della Sfida1:", sfidaData);
                setSfida(sfidaData); // Salva i dati nello stato
            } else {
                console.log("La Sfida1 non esiste nel database.");
            }
        } catch (error) {
            console.error("Errore durante il recupero dei dati della Sfida1:", error);
        }
    };

    useEffect(() => {
        fetchSfida1(); // Recupera i dati all'avvio
    }, []);

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Challenge Screen" />
                <IconButton icon="hourglass" />
                <ProgressBar progress={progress} style={styles.progressBar} />
            </Appbar.Header>
            <View style={styles.content}>
                <Card style={styles.card}>
                    <Card.Title title={sfida?.Titolo || "Caricamento..."} />
                    <Card.Content>
                        <Text style={styles.questionText}>
                            {sfida?.domande.domanda1.testo || "Caricamento..."}
                        </Text>
                        <Button
                            mode="contained"
                            style={styles.answerButton}
                            onPress={() => alert(`Risposta: ${sfida?.domande.domanda1.A}`)}
                        >
                            {sfida?.domande.domanda1.A || "A"}
                        </Button>
                        <Button
                            mode="contained"
                            style={styles.answerButton}
                            onPress={() => alert(`Risposta: ${sfida?.domande.domanda1.B}`)}
                        >
                            {sfida?.domande.domanda1.B || "B"}
                        </Button>
                        <Button
                            mode="contained"
                            style={styles.answerButton}
                            onPress={() => alert(`Risposta: ${sfida?.domande.domanda1.C}`)}
                        >
                            {sfida?.domande.domanda1.C || "C"}
                        </Button>
                        <Button
                            mode="contained"
                            style={styles.answerButton}
                            onPress={() => alert(`Risposta: ${sfida?.domande.domanda1.D}`)}
                        >
                            {sfida?.domande.domanda1.D || "D"}
                        </Button>
                    </Card.Content>
                </Card>
            </View>
        </View>
    );
}