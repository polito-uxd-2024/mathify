import React, { useState, useEffect, useContext } from "react";
import { View, Alert, ScrollView } from "react-native";
import { Appbar, Card, Button, Text, ProgressBar, IconButton, useTheme } from "react-native-paper";
import { Sfida } from "../Component/Interfaces";
import { StateContext } from "../Reducer";
import Collapsible from "react-native-collapsible";

import { getAuth } from "firebase/auth";
import registraSfidaCompletata from "../Component/writeOnDb";

export default function PlayScreen() {
    const { colors } = useTheme();
    const [state] = useContext(StateContext);

    const challenge: Sfida = {
        questions: state.selectedChallenge.questions,
        titolo: state.selectedChallenge.titolo,
        argomento: state.selectedChallenge.argomento,
        difficoltà: state.selectedChallenge.difficoltà,
    };

    const [progress, setProgress] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [punteggioOttenuto, setPunteggioOttenuto] = useState(0);
    const [timerProgress, setTimerProgress] = useState(0);
    const timerDuration = 10;
    const [changePage, setChangePage] = useState(false);
    const currentQuestion = challenge.questions[currentQuestionIndex];
    const [risposte, setRisposte] = useState<boolean[]>([]);
    const [revisione, setRevisione] = useState(4);
    const [listaRisposteDate, setListaRispsoteDate] = useState<string[]>([]);

    // Gestione del timer
    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimerProgress((prev) => {
                if (prev >= 1) {
                    if (!changePage) {
                        setRisposte((prev) => [...prev, false]);
                        setListaRispsoteDate((prev) => [...prev, "Nessuna risposta data"]);
                    }
                    handleNextQuestion();
                    return 0;
                }
                return prev + 1 / timerDuration;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [currentQuestionIndex, changePage]);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < challenge.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setProgress((currentQuestionIndex + 1) / challenge.questions.length);
            setTimerProgress(0);
        } else {
            setChangePage(true);
        }
    };

    useEffect(() => {
        if (changePage) {
            salvaSfida(); // Salva la sfida completata
        }
    }, [changePage]);

    const handleAnswerPress = (risposta: string) => {
        if (risposta === currentQuestion.Soluzione) {
            setPunteggioOttenuto(punteggioOttenuto + 1);
            setRisposte((prev) => [...prev, true]);
            setListaRispsoteDate((prev) => [...prev, risposta]);
        } else {
            setRisposte((prev) => [...prev, false]);
            setListaRispsoteDate((prev) => [...prev, risposta]);
        }
        handleNextQuestion();
    };

    // Funzione per salvare la sfida completata

    const salvaSfida = () => {




            const sfidaCompletata = {
                domande: challenge.questions.map((domanda, index) => ({
                    Testo: domanda.Testo,
                    Risposte: domanda.Risposte,
                    RispostaCorretta: domanda.Soluzione,
                    RispostaData: listaRisposteDate[index] || "Nessuna risposta data", // Aggiunge la risposta data dall'utente
                    tempoImpiegato: timerDuration, // Tempo per ogni domanda (puoi personalizzare per domanda)
                    correttezza: risposte[index] || false, // Se la risposta è corretta o no
                })),
                punteggio: punteggioOttenuto,
                tempoImpiegato: timerDuration * challenge.questions.length,
                xpGuadagnati: punteggioOttenuto * 100,
                id: state.selectedChallenge.titolo// Formula XP guadagnati
            };

            registraSfidaCompletata(sfidaCompletata)



    };


    if (!changePage) {
        return (
            <View>
                <Appbar.Header>
                    <Appbar.Content title="Challenge Screen" />
                    <IconButton icon="hourglass" />
                    <ProgressBar progress={progress} style={{ margin: 8 }} color={colors.primary} />
                </Appbar.Header>

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
                            <ProgressBar
                                progress={timerProgress}
                                style={{ marginTop: 16 }}
                                color={timerProgress > 0.8 ? "red" : "green"}
                            />
                            <Text style={{ marginTop: 8 }}>
                                Tempo rimasto: {Math.ceil((1 - timerProgress) * timerDuration)}s
                            </Text>
                            <Text style={{ marginTop: 8 }}>Domande corrette: {punteggioOttenuto}</Text>
                        </Card.Content>
                    </Card>
                </View>
            </View>
        );
    } else {
        return (
            <ScrollView style={{ padding: 16 }}>
                {risposte.map((valore, index) => (
                    <Card key={index} style={{ marginBottom: 8, backgroundColor: valore ? "green" : "red" }}>
                        <Card.Content>
                            <Text>Risposta corretta: {valore.toString()}</Text>
                            <Button
                                mode="contained"
                                onPress={() => setRevisione(index)}
                                style={{ marginTop: 8 }}
                            >
                                Rivedi domanda
                            </Button>
                            <Collapsible collapsed={revisione !== index}>
                                <View>
                                    <Text>Dettagli di revisione per l'indice {index}</Text>
                                    <Card>
                                        <Text>{state.selectedChallenge.questions[index].Testo}</Text>
                                        <Text>Risposta data: {listaRisposteDate[index]}</Text>
                                        <Text>Risposta corretta: {state.selectedChallenge.questions[index].Soluzione}</Text>
                                        <Text>Spiegazione: {state.selectedChallenge.questions[index].Spiegazione}</Text>
                                    </Card>
                                </View>
                            </Collapsible>
                        </Card.Content>
                    </Card>
                ))}
            </ScrollView>
        );
    }
}
