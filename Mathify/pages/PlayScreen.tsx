import React, { useState, useEffect, useContext } from "react";
import {View, Alert, ScrollView} from "react-native";
import { Appbar, Card, Button, Text, ProgressBar, IconButton, useTheme } from "react-native-paper";
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
    const timerDuration = 10; // Durata del timer in secondi
    const [changePage, setChangePage] = useState(false)
    const currentQuestion = challenge.questions[currentQuestionIndex];
    const [risposte, setRisposte] = useState<boolean[]>([]);
    const [revisione, setRevisione] = useState(4)
    const [listaRisposteDate, setListaRispsoteDate] = useState<string[]>([]) //da implementare

    // Gestione del timer
    useEffect(() => {

            const timerInterval = setInterval(() => {

                setTimerProgress((prev) => {
                    if (prev >= 1) {
                        if (!changePage) {
                            setRisposte((prev) => [...prev, false]);
                        }
                        handleNextQuestion(); // Passa alla domanda successiva se il timer è pieno
                        return 0; // Reset del timer
                    }
                    return prev + 1 / timerDuration; // Incrementa il progresso
                });
            }, 1000);

            return () => clearInterval(timerInterval); // Pulisci l'intervallo quando cambia la domanda

    }, [currentQuestionIndex, changePage]);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < challenge.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setProgress((currentQuestionIndex + 1) / challenge.questions.length);
            setTimerProgress(0); // Reset del timer
        } else {
            setChangePage(true);
        }
    };

    const handleAnswerPress = (risposta: string) => {
        if (risposta === currentQuestion.Soluzione) {
            setPunteggioOttenuto(punteggioOttenuto + 1);
            setRisposte((prev) => [...prev, true]);
        }
        else {
            setRisposte((prev) => [...prev, false]);
        }
        handleNextQuestion(); // Passa manualmente alla prossima domanda
    };


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

                        </Card.Content>
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
                            <Text>{valore.toString()}</Text>
                            <Button
                                mode="contained"
                                onPress={() => setRevisione(index)}
                                style={{ marginTop: 8 }}
                            >
                            </Button>
                            <Collapsible collapsed={revisione !== index}>
                                <View>
                                    <Text>Dettagli di revisione per l'indice {index}</Text>
                                    <Card>
                                        {state.selectedChallenge.questions[index].Testo}
                                        {state.selectedChallenge.questions[index].Risposte[0]}
                                        {state.selectedChallenge.questions[index].Risposte[1]}
                                        {state.selectedChallenge.questions[index].Risposte[2]}
                                        {state.selectedChallenge.questions[index].Risposte[3]}
                                        Spiegazione: {state.selectedChallenge.questions[index].Spiegazione}
                                    </Card>
                                </View>
                            </Collapsible>
                        </Card.Content>
                    </Card>
                ))}
            </View>
        );
    }
}