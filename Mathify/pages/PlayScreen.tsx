import React, { useState, useEffect, useContext } from "react";
import {View, Alert, ScrollView} from "react-native";
import {Appbar, Card, Button, Text, ProgressBar, IconButton, useTheme, Icon} from "react-native-paper";
import { Sfida } from "../Component/Interfaces";
import { StateContext } from "../Reducer";
import Collapsible from 'react-native-collapsible';

export default function PlayScreen() {
    const {colors} = useTheme();
    const [state, dispatch] = useContext(StateContext);

    const challenge: Sfida = {
        questions: state.selectedChallenge.questions,
        titolo: state.selectedChallenge.titolo,
        argomento: state.selectedChallenge.argomento,
        difficoltà: state.selectedChallenge.difficoltà,
    };

    const [progress, setProgress] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [punteggioOttenuto, setPunteggioOttenuto] = useState(0);
    const [timerProgress, setTimerProgress] = useState(0); // Progresso del timer
    const timerDuration = 60; // Durata del timer in secondi
    const [changePage, setChangePage] = useState(false)
    const currentQuestion = challenge.questions[currentQuestionIndex];
    const [risposte, setRisposte] = useState<boolean[]>([]);
    const [revisione, setRevisione] = useState(4)
    const [listaRisposteDate, setListaRispsoteDate] = useState<string[]>([])
    const [listaTempoDomande, setListaTempoDomande] = useState<number[]>([])
    const [startTime, setStartTime] = useState(Date.now());
    const [xp, setXp] = useState(0)
    const [tempoTotaleXP, settempoTotaleXP] = useState(0)
    const [xpCorrect, setXpCorrect] = useState(0)
    const [graficoAttivo, setGraficoAttivo] = useState(true)
    const [tempoMaggiore, setTempoMaggiore] = useState(true)
    const [dueTentativi, setDueTentativi] = useState(true)
    const [tentativiAttivo, setTentativiAttivo] = useState(false)


    // Gestione del timer
    useEffect(() => {

            const timerInterval = setInterval(() => {

                setTimerProgress((prev) => {
                    if (prev >= 1) {
                        if (!changePage) {
                            setRisposte((prev) => [...prev, false]);
                            setListaRispsoteDate((prev) => [...prev, "Nessuna risposta data"])
                        }
                        handleNextQuestion(); // Passa alla domanda successiva se il timer è pieno
                        return 0; // Reset del timer
                    }
                    return prev + 1 / timerDuration; // Incrementa il progresso
                });
            }, 1000);

            return () => clearInterval(timerInterval); // Pulisci l'intervallo quando cambia la domanda

    }, [currentQuestionIndex, changePage]);

    const bonusTempo = () => {
        if (tempoMaggiore && timerProgress > 0.5) {
            setTimerProgress((prev) => prev - 0.5)
            setTempoMaggiore(false)
        }
        if (tempoMaggiore && timerProgress <= 0.5) {
            setTimerProgress((prev) => 0)
            setTempoMaggiore(false)
        }
    }

    const bonusTentativi = () => {
        setTentativiAttivo(true)
        setDueTentativi(false)
    }

    const handleNextQuestion = () => {
        const currentTime = Date.now();
        const timeTaken = (currentTime - startTime) / 1000; // Tempo in secondi

        // Aggiungi il tempo impiegato per rispondere alla domanda precedente
        setListaTempoDomande((prev) => [...prev, timeTaken]);

        if (currentQuestionIndex < challenge.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setProgress((currentQuestionIndex + 1) / challenge.questions.length);
            setTimerProgress(0); // Reset del timer
            setStartTime(Date.now()); // Imposta l'ora di inizio per la prossima domanda
        } else {
            setChangePage(true);
        }
    };


    const handleAnswerPress = (risposta: string) => {
        if (!tentativiAttivo) {
            if (risposta === currentQuestion.Soluzione) {
                setPunteggioOttenuto(punteggioOttenuto + 1);
                setRisposte((prev) => [...prev, true]);
                setListaRispsoteDate((prev) => [...prev, risposta])
            } else {
                setRisposte((prev) => [...prev, false]);
                setListaRispsoteDate((prev) => [...prev, risposta])
            }
            handleNextQuestion(); // Passa manualmente alla prossima domanda
        }
        else{
            if (risposta === currentQuestion.Soluzione) {
                setPunteggioOttenuto(punteggioOttenuto + 1);
                setRisposte((prev) => [...prev, true]);
                setListaRispsoteDate((prev) => [...prev, risposta])
                setTentativiAttivo(false)
                handleNextQuestion()
            }
            else {
                setTentativiAttivo(false)
            }
        }
    };

    useEffect(() => {
        const correctAnswers = risposte.filter((risposta) => risposta === true).length
        setXpCorrect( 10 * correctAnswers)
        const xpCorretto = 10 * correctAnswers
        const tempoTotXP =Math.round(timerDuration * risposte.length - listaTempoDomande.reduce((accumulator, currentValue) => accumulator + currentValue, 0))
        settempoTotaleXP(Math.round(timerDuration * risposte.length - listaTempoDomande.reduce((accumulator, currentValue) => accumulator + currentValue, 0)));
        const totale = state.selectedChallenge.difficoltà * 50 + xpCorretto + tempoTotXP
        setXp(totale)
    }, [changePage]);


    if (!changePage) {

        return (
            <View>
                <Appbar.Header>
                    <Appbar.Content title="Challenge Screen"/>
                    <IconButton icon="hourglass"/>
                    <ProgressBar progress={progress} style={{margin: 8}} color={colors.primary}/>
                </Appbar.Header>

                <View style={{padding: 16}}>
                    <Card>
                        <Card.Title title="Challenge Question"/>
                        <Card.Content>
                            <Text style={{fontSize: 18, marginBottom: 16}}>{currentQuestion.Testo}</Text>
                            {currentQuestion.Risposte.map((risposta, index) => (
                                <Button
                                    key={index}
                                    mode="contained"
                                    style={{marginBottom: 8}}
                                    onPress={() => handleAnswerPress(risposta)}
                                >
                                    {risposta}
                                </Button>
                            ))}
                            <ProgressBar
                                progress={timerProgress}
                                style={{marginTop: 16}}
                                color={colors.accent}
                            />
                            <Text style={{marginTop: 8}}>Tempo
                                rimasto: {Math.ceil((1 - timerProgress) * timerDuration)}s</Text>
                            <Text style={{marginTop: 8}}>Domande corrette: {punteggioOttenuto}</Text>
                            <Text style={{marginTop: 8}}>Indice: {currentQuestionIndex}</Text>
                            <Text>ProgressTime: {timerProgress}</Text>

                        </Card.Content>
                    </Card>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 10 }}>
                    <Card style={{ flex: 1, margin: 5 }}>
                        <Text style={{ textAlign: 'center', padding: 10 }}>Grafico</Text>
                    </Card>
                    <Card style={{ flex: 1, margin: 5 }} onPress={bonusTempo}>
                        <Text style={{ textAlign: 'center', padding: 10 }}>+30 secondi</Text>
                        Disponibilità: {tempoMaggiore? "1" : "0"}
                    </Card>
                    <Card style={{ flex: 1, margin: 5 }}>
                        <Text style={{ textAlign: 'center', padding: 10 }} onPress={bonusTentativi}>Doppio tentativo</Text>
                        Disponibilità: {dueTentativi? "1" : "0"}
                    </Card>
                </View>
            </View>
        );
    }
    else {
        return (
            <View style={{ padding: 16 }}>
                {risposte.map((valore, index) => (
                    <Card key={index} style={{ marginBottom: 8, backgroundColor: valore? "green" : "red" }}>
                        <Card.Content>
                            <Text>{state.selectedChallenge.questions[index].Testo}</Text>
                            <Button
                                mode="contained"
                                onPress={() => setRevisione(index)}
                                //icon="arrow-downward"
                                style={{ marginTop: 8 }}
                            >
                                Dettagli
                            </Button>

                            <Collapsible collapsed={revisione !== index}>
                                <View>
                                    <Text>Dettagli di revisione per la domanda {index + 1}</Text>
                                    <Card color={colors.primary}>
                                        <Text>Tempo Impiegato: {listaTempoDomande[index]} s</Text>
                                        <Text>Risposta data: {listaRisposteDate[index]}</Text>
                                        <Text>Risposta corretta: {state.selectedChallenge.questions[index].Soluzione}</Text>
                                        <Text>Spiegazione: {state.selectedChallenge.questions[index].Spiegazione}</Text>
                                    </Card>
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
            </View>
        );
    }
}