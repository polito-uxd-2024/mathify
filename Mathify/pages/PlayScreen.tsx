import React, { useState, useEffect, useContext } from "react";
import { View, Alert } from "react-native";
import { Appbar, Card, Button, Text, ProgressBar, IconButton, useTheme } from "react-native-paper";
import { Sfida } from "../Component/Interfaces";
import { StateContext } from "../Reducer";


export default function PlayScreen() {
    const { colors } = useTheme(); //// Otteniamo i colori del tema
    const [state, dispatch] = useContext(StateContext);

    const challenge: Sfida = {
        questions:state.selectedChallenge.questions,
        titolo:state.selectedChallenge.titolo,
        argomento:state.selectedChallenge.argomento,
        difficoltà:state.selectedChallenge.difficoltà,




    };

    const [progress, setProgress] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [punteggioOttenuto, setPunteggioOttenuto] = useState(0);
    const [timeProgress, setTimeProgress] = useState(1); // Per la barra del tempo
    const [timerActive, setTimerActive] = useState(false); // Stato per controllare il timer
    const currentQuestion = challenge.questions[currentQuestionIndex];

    const resetTimer = () => {
        setTimeProgress(1);
        setTimerActive(false);
        setTimeout(() => setTimerActive(true), 100); // Breve pausa per riattivare il timer
    };

    const handleAnswerPress = (risposta: string) => {
        if (risposta === currentQuestion.Soluzione) {
            setPunteggioOttenuto(punteggioOttenuto + 1);
        }

        if (currentQuestionIndex < challenge.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setProgress((currentQuestionIndex + 1) / challenge.questions.length);
            resetTimer(); // Reset del timer per la prossima domanda
        } else {
            alert(`Finito! Punteggio: ${punteggioOttenuto}`);
        }
    };

    useEffect(() => {
        if (!timerActive) return;

        let timer = setInterval(() => {
            setTimeProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    Alert.alert("Tempo scaduto", "Non hai risposto in tempo!");
                    if (currentQuestionIndex < challenge.questions.length - 1) {
                        setCurrentQuestionIndex(currentQuestionIndex + 1);
                        setProgress((currentQuestionIndex + 1) / challenge.questions.length);
                        resetTimer(); // Reset del timer per la prossima domanda
                    } else {
                        alert(`Finito! Punteggio: ${punteggioOttenuto}`);
                    }
                }
                return prev - 0.01;
            });
        }, 100); // Aggiorniamo ogni 100ms per un timer fluido

        return () => clearInterval(timer); // Pulizia al cambio di domanda
    }, [timerActive, currentQuestionIndex]);

    useEffect(() => {
        resetTimer(); // Avvia il timer alla prima domanda
        //setCurrentChallenge("Sfida1")
    }, []);

    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title="Challenge Screen" />
                <IconButton icon="hourglass" />
                <ProgressBar progress={progress} style={{ margin: 8 }} color={colors.primary} />
            </Appbar.Header>
            <ProgressBar
                progress={timeProgress}
                style={{ height: 8, backgroundColor: colors.background }}
                // Usa il colore "accent" del tema
            />
            <View style={{ padding: 16 }}>
                <Card>
                    <Card.Title title="Challenge Question" />
                    <Card.Content>
                        <Text style={{ fontSize: 18, marginBottom: 16 }}>{currentQuestion.Testo}</Text>
                        {currentQuestion.Risposte.map((risposta, index) => (
                            <Button
                                key={index}
                                mode="contained"
                                style={{ marginBottom: 8 }}
                                onPress={() => handleAnswerPress(risposta)}
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
