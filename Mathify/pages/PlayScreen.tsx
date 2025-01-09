import React, { useState, useEffect, useContext } from "react";
import { View, Alert, ScrollView } from "react-native";
import { Appbar, Card, Button, Text, ProgressBar, IconButton, useTheme } from "react-native-paper";
import { Sfida } from "../Component/Interfaces";
import { StateContext } from "../Reducer";
import Collapsible from "react-native-collapsible";

import { getAuth } from "firebase/auth";
import registraSfidaCompletata from "../Component/writeOnDb";
import {aggiornaLivello} from "../Component/aggiornaLivello";

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
    const timerDuration = 60;
    const [changePage, setChangePage] = useState(false);
    const currentQuestion = challenge.questions[currentQuestionIndex];
    const [risposte, setRisposte] = useState<boolean[]>([]);
    const [revisione, setRevisione] = useState(-1);
    const [listaRisposteDate, setListaRispsoteDate] = useState<string[]>([]);
    const [listaTempoDomande, setListaTempoDomande] = useState<number[]>([]);
    const [startTime, setStartTime] = useState(Date.now());
    const [xp, setXp] = useState(0);
    const [tempoTotaleXP, setTempoTotaleXP] = useState(0);
    const [xpCorrect, setXpCorrect] = useState(0);
    const [tempoMaggiore, setTempoMaggiore] = useState(true);
    const [dueTentativi, setDueTentativi] = useState(true);
    const [tentativiAttivo, setTentativiAttivo] = useState(false);

    // Gestione del timer
    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimerProgress((prev) => {
                if (prev >= 1) {
                    if (!changePage) {
                        setRisposte((prev) => [...prev, false]);
                        setListaRispsoteDate((prev) => [...prev, "Nessuna risposta data"]);
                        handleNextQuestion();
                        return 0;
                    }
                }
                return prev + 1 / timerDuration;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [currentQuestionIndex, changePage]);

    const bonusTempo = () => {
        if (tempoMaggiore) {
            setTimerProgress((prev) => Math.max(prev - 0.5, 0));
            setTempoMaggiore(false);
        }
    };

    const bonusTentativi = () => {
        setTentativiAttivo(true);
        setDueTentativi(false);
    };

    const handleNextQuestion = () => {
        const currentTime = Date.now();
        const timeTaken = (currentTime - startTime) / 1000;
        setListaTempoDomande((prev) => [...prev, timeTaken]);

        if (currentQuestionIndex < challenge.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setProgress((currentQuestionIndex + 1) / challenge.questions.length);
            setTimerProgress(0);
            setStartTime(Date.now());
        } else {
            setChangePage(true);
        }
    };

    const handleAnswerPress = (risposta: string) => {
        if (!tentativiAttivo) {
            const isCorrect = risposta === currentQuestion.Soluzione;
            setPunteggioOttenuto((prev) => (isCorrect ? prev + 1 : prev));
            setRisposte((prev) => [...prev, isCorrect]);
            setListaRispsoteDate((prev) => [...prev, risposta]);
            handleNextQuestion();
        } else {
            if (risposta === currentQuestion.Soluzione) {
                setPunteggioOttenuto((prev) => prev + 1);
                setRisposte((prev) => [...prev, true]);
                setListaRispsoteDate((prev) => [...prev, risposta]);
                setTentativiAttivo(false);
                handleNextQuestion();
            } else {
                setTentativiAttivo(false);
            }
        }
    };

    useEffect(() => {
        if (changePage) {
            const correctAnswers = risposte.filter((risposta) => risposta).length;
            const xpCorretto = correctAnswers * 10;
            const tempoTotXP = Math.round(timerDuration * risposte.length - listaTempoDomande.reduce((acc, cur) => acc + cur, 0));
            setXpCorrect(xpCorretto);
            setTempoTotaleXP(tempoTotXP);
            setXp(state.selectedChallenge.difficoltà * 50 + xpCorretto + tempoTotXP);
            salvaSfida();

        }
    }, [changePage]);
    const salvaSfida = () => {
        const correctAnswers = risposte.filter((risposta) => risposta === true).length;
        const xpCorretto = 10 * correctAnswers;

        const tempoTotXP = Math.max(
            0,
            Math.round(timerDuration * risposte.length - listaTempoDomande.reduce((accumulator, currentValue) => accumulator + currentValue, 0))
        );

        const totaleXP = state.selectedChallenge.difficoltà * 50 + xpCorretto + tempoTotXP;

        const sfidaCompletata = {
            domande: challenge.questions.map((domanda, index) => ({
                Testo: domanda.Testo,
                Risposte: domanda.Risposte,
                RispostaCorretta: domanda.Soluzione,
                RispostaData: listaRisposteDate[index] || "Nessuna risposta data",
                tempoImpiegato: listaTempoDomande[index] || 0,
                correttezza: risposte[index] || false,
            })),
            punteggio: punteggioOttenuto,
            tempoImpiegato: timerDuration * challenge.questions.length,
            xpGuadagnati: totaleXP, // Calcolo diretto qui
            id: state.selectedChallenge.titolo
        };

        console.log("XP inviati al database:", sfidaCompletata.xpGuadagnati);
        registraSfidaCompletata(sfidaCompletata);
        aggiornaLivello(sfidaCompletata.xpGuadagnati);
    };


    if (!changePage) {
        return (
            <View>
                <Appbar.Header>
                    <Appbar.Content title="Challenge Screen" />
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
                            <ProgressBar progress={timerProgress} style={{ marginTop: 16 }} color={timerProgress > 0.8 ? "red" : "green"} />
                            <Text style={{ marginTop: 8 }}>
                                Tempo rimasto: {Math.ceil((1 - timerProgress) * timerDuration)}s
                            </Text>
                            <Text style={{ marginTop: 8 }}>Domande corrette: {punteggioOttenuto}</Text>
                        </Card.Content>
                    </Card>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", padding: 10 }}>
                    <Card style={{ flex: 1, margin: 5 }}>
                        <Text style={{ textAlign: "center", padding: 10 }}>Grafico</Text>
                    </Card>
                    <Card style={{ flex: 1, margin: 5 }} onPress={bonusTempo}>
                        <Text style={{ textAlign: "center", padding: 10 }}>+30 secondi</Text>
                        Disponibilità: {tempoMaggiore ? "1" : "0"}
                    </Card>
                    <Card style={{ flex: 1, margin: 5 }} onPress={bonusTentativi}>
                        <Text style={{ textAlign: "center", padding: 10 }}>Doppio tentativo</Text>
                        Disponibilità: {dueTentativi ? "1" : "0"}
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
                            <Text>{state.selectedChallenge.questions[index].Testo}</Text>
                            <Button
                                mode="contained"
                                onPress={() => setRevisione(index)}
                                style={{ marginTop: 8 }}
                            >
                                Dettagli
                            </Button>

                            <Collapsible collapsed={revisione !== index}>
                                <View>
                                    <Text>Tempo Impiegato: {listaTempoDomande[index]} s</Text>
                                    <Text>Risposta data: {listaRisposteDate[index]}</Text>
                                    <Text>Risposta corretta: {state.selectedChallenge.questions[index].Soluzione}</Text>
                                </View>
                            </Collapsible>
                        </Card.Content>
                    </Card>
                ))}
                <Card>
                    <Text>COMPLIMENTI!! COMPLETANDO LA SFIDA HAI SBLOCCATO IL BADGE</Text>
                    <Text>{state.selectedChallenge.titolo}</Text>
                </Card>
                <Card>
                    <Text>Conteggio punti</Text>
                    <Text>Punti guadagnati dal tempo: {tempoTotaleXP}</Text>
                    <Text>Punti in base alla difficoltà: {state.selectedChallenge.difficoltà * 50}</Text>
                    <Text>Punti per le risposte corrette: {xpCorrect}</Text>
                    <Text>Punti totali: {xp}</Text>
                </Card>
            </ScrollView>
        );
    }
}
