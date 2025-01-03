import React, { useState, useEffect, useContext } from "react";
import { View, Alert } from "react-native";
import { Appbar, Card, Button, Text, ProgressBar, IconButton, useTheme } from "react-native-paper";
import { Sfida } from "../Component/Interfaces";
import { StateContext } from "../Reducer";
import setCurrentChallenge from "../Component/setCurrentChallenge";

export default function PlayScreen() {
    const { colors } = useTheme(); // Otteniamo i colori del tema
    const challenge: Sfida = {
        id: "challenge001",
        questions: [
            {
                Testo: "Qual è la capitale della Francia?",
                Risposte: ["Parigi", "Londra", "Madrid", "Berlino"],
                RispostaCorretta: "Parigi",
                Grafico: false
            },
            {
                Testo: "Chi ha dipinto la Monna Lisa?",
                Risposte: ["Van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
                RispostaCorretta: "Leonardo da Vinci",
                Grafico: false
            },
            {
                Testo: "Qual è il simbolo chimico dell'ossigeno?",
                Risposte: ["O", "Ox", "Og", "Ogx"],
                RispostaCorretta: "O",
                Grafico: false
            },
            {
                Testo: "Qual è il numero atomico del ferro?",
                Risposte: ["26", "55", "47", "10"],
                RispostaCorretta: "26",
                Grafico: false
            },
            {
                Testo: "Qual è l'unità di misura della velocità?",
                Risposte: ["Meter/secondo", "Kilometri/ora", "Miglio/ora", "None of the above"],
                RispostaCorretta: "Meter/secondo",
                Grafico: false
            },
            {
                Testo: "Chi ha scritto 'Romeo e Giulietta'?",
                Risposte: ["Shakespeare", "Goethe", "Hemingway", "Dostoevskij"],
                RispostaCorretta: "Shakespeare",
                Grafico: false
            },
            {
                Testo: "Qual è il pianeta più vicino al Sole?",
                Risposte: ["Mercurio", "Venere", "Marte", "Terra"],
                RispostaCorretta: "Mercurio",
                Grafico: false
            },
            {
                Testo: "Qual è la capitale dell'Italia?",
                Risposte: ["Roma", "Milano", "Napoli", "Torino"],
                RispostaCorretta: "Roma",
                Grafico: false
            },
            {
                Testo: "Qual è l'elemento chimico con simbolo 'Hg'?",
                Risposte: ["Oro", "Mercurio", "Zinco", "Argento"],
                RispostaCorretta: "Mercurio",
                Grafico: false
            },
            {
                Testo: "Qual è la valuta ufficiale degli Stati Uniti?",
                Risposte: ["Euro", "Yen", "Dollaro", "Libra"],
                RispostaCorretta: "Dollaro",
                Grafico: false
            }
        ],
        punteggioOttenuto: 0
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
        if (risposta === currentQuestion.RispostaCorretta) {
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
