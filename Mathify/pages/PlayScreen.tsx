import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { Appbar, Card, Button, Text, ProgressBar, IconButton } from "react-native-paper";
import { styles } from "../App";

interface Question {
    Testo: string;
    Risposte: string[];
    RispostaCorretta: string;
}
export interface Sfida{
    id: string;
    questions: Question[];
    punteggioOttenuto: number;
}


export default function PlayScreen() {
    const [progress, setProgress] = useState(0);
    const [sfida, setSfida] = useState<Sfida>()

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


    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Challenge Screen" />
                <IconButton icon="hourglass" />
                <ProgressBar progress={progress} style={styles.progressBar} />
            </Appbar.Header>
            <View style={styles.content}>
                <Card style={styles.card}>
                    <Card.Title title="Challenge Question" />
                    <Card.Content>
                        <Text style={styles.questionText}>What is 2 + 2?</Text>
                        <Button mode="contained" style={styles.answerButton} onPress={() => alert('Answer 1 Pressed')}>
                            3
                        </Button>
                        <Button mode="contained" style={styles.answerButton} onPress={() => alert('Answer 2 Pressed')}>
                            4
                        </Button>
                        <Button mode="contained" style={styles.answerButton} onPress={() => alert('Answer 3 Pressed')}>
                            5
                        </Button>
                        <Button mode="contained" style={styles.answerButton} onPress={() => alert('Answer 4 Pressed')}>
                            6
                        </Button>
                    </Card.Content>
                </Card>
            </View>
        </View>
    );
}