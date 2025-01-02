/*
import React, {useState, useEffect, useContext} from "react";
import { View, Alert } from "react-native";
import { Appbar, Card, Button, Text, ProgressBar, IconButton } from "react-native-paper";
import { styles } from "../App";
import {Sfida} from "../Component/Interfaces";
import {StateContext} from "../Reducer";
import {fetchChallenge} from "../Component/firebaseService";
import {setSelectedChallenge} from "../Action";
import setCurrentChallenge from "../Component/setCurrentChallenge";



export default function PlayScreen() {
    const [progress, setProgress] = useState(0);
    const [state, dispatch] = useContext(StateContext);
    const sfide= fetchChallenge("0")



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
        <View>
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

*/

import React, { useState, useEffect, useContext } from "react";
import { View, Alert } from "react-native";
import { Appbar, Card, Button, Text, ProgressBar, IconButton } from "react-native-paper";
import { styles } from "../App";
import { StateContext } from "../Reducer";
import { fetchChallenge } from "../Component/firebaseService";

export default function PlayScreen() {
    const [progress, setProgress] = useState(0);
    const [state] = useContext(StateContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch challenge data
        const loadChallenge = async () => {
            try {
                const challenge = await fetchChallenge("sfida 1"); // Sostituisci "0" con l'ID dinamico se necessario
                setQuestions(challenge.questions);
                setLoading(false);
            } catch (error) {
                console.error("Errore nel recupero della sfida:", error);
            }
        };
        loadChallenge();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 1) {
                    clearInterval(interval);
                    Alert.alert("Tempo scaduto", "Hai finito il tempo!");
                    return 1;
                }
                return prev + 0.01;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleAnswer = (answer) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (answer === currentQuestion.RispostaCorretta) {
            Alert.alert("Risposta corretta!");
        } else {
            Alert.alert("Risposta sbagliata.");
        }
        // Vai alla prossima domanda o termina la sfida
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setProgress(0); // Resetta il timer per la prossima domanda
        } else {
            Alert.alert("Sfida completata", "Hai finito tutte le domande!");
        }
    };

    if (loading) {
        return (
            <View style={styles.content}>
                <Text>Caricamento...</Text>
            </View>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title="Challenge Screen" />
                <IconButton icon="hourglass" />
                <ProgressBar progress={progress} style={styles.progressBar} />
            </Appbar.Header>
            <View style={styles.content}>
                <Card style={styles.card}>
                    <Card.Title title={`Domanda ${currentQuestionIndex + 1}`} />
                    <Card.Content>
                        <Text style={styles.questionText}>{currentQuestion.Testo}</Text>
                        {currentQuestion.Risposte.map((risposta, index) => (
                            <Button
                                key={index}
                                mode="contained"
                                style={styles.answerButton}
                                onPress={() => handleAnswer(risposta)}
                            >
                                {risposta}
                            </Button>
                        ))}
                    </Card.Content>
                </Card>
            </View>
        </View>
    );
}

