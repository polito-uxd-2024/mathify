import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView } from "react-native";
import {Appbar, Card, Button, Text, ProgressBar, useTheme, Dialog, TextInput, Portal} from "react-native-paper";
import {DomandaSegnalata, Sfida} from "../Component/Interfaces";
import { StateContext } from "../Reducer";
import Collapsible from "react-native-collapsible";
import {registraSfidaCompletata} from "../Component/writeOnDb";
import {aggiornaLivello} from "../Component/aggiornaLivello";
import {useSetCurrentUser} from "../Component/setUser";
import { Image, StyleSheet  } from 'react-native';
import {styles} from "../Component/style";


export default function PlayScreen() {
    const { colors } = useTheme();
    const [state] = useContext(StateContext);
    useSetCurrentUser("Utente1");

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
    const [grafico, setGrafico] = useState(true)
    const [graficoRisposteAttivo, setGraficoRisposteAttivo] = useState(false)
    const [graficoDomandaAttivo, setGraficoDomandaAttivo] = useState(false)
    const [clickedButtonIndex, setClickedButtonIndex] = useState<number | null>(null);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);


    //Gestione della Segnalazione
    const [segnalazioni, setSegnalazioni] = useState<DomandaSegnalata[]>([]);
    const [motivo, setMotivo] = useState("");
    const [isDialogVisible, setDialogVisible] = useState(false);
    const handleSegnala=()=>{

        const domanda=state.selectedChallenge.questions[currentQuestionIndex]
        const sfida=state.selectedChallenge
        console.log("Domanda",domanda)
        const segnalazione={
            domanda:{testo:domanda.Testo,risposte:domanda.Risposte,rispostaCorretta:domanda.Soluzione},
            motivo:motivo,
            sfida:{titolo:sfida.titolo,argomento:sfida.argomento}
        }
        setSegnalazioni([...segnalazioni,segnalazione])
        setDialogVisible(false)

    }
    // Gestione del timer
    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimerProgress((prev) => {
                if (prev < 1) {
                    const newProgress = prev + 1 / timerDuration;
                    return newProgress >= 1 ? 1 : parseFloat(newProgress.toFixed(3));
                } else {
                    handleAnswerPress("Tempo scaduto!!", -1);
                    return 0; // Assicurati che il timer si fermi
                }
            });
        }, 1000);

        // Pulizia per evitare timer duplicati
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

    const bonusGrafico = () => {
        if (state.selectedChallenge.questions[currentQuestionIndex].Grafico) {
            setGrafico(false)
            if (state.selectedChallenge.questions[currentQuestionIndex].GraficList.length > 1) {
                setGraficoRisposteAttivo(true)
            } else {
                setGraficoDomandaAttivo(true)
            }
        }
    }

    const handleNextQuestion = () => {
        const currentTime = Date.now();
        const timeTaken = (currentTime - startTime) / 1000;
        setListaTempoDomande((prev) => [...prev, timeTaken]);

        if (currentQuestionIndex < challenge.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setProgress((currentQuestionIndex + 1) / challenge.questions.length);
            setTimerProgress(0);
            setStartTime(Date.now());
            setGraficoDomandaAttivo(false)
            setGraficoRisposteAttivo(false)
        } else {
            setChangePage(true);
        }
    };

    const handleAnswerPress = (risposta: string, index: number) => {
        const isCorrect = risposta === currentQuestion.Soluzione;
        setIsCorrectAnswer(isCorrect);
        setClickedButtonIndex(index);

        if (!tentativiAttivo) {
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
            //const tempoTotXP = Math.round(timerDuration * risposte.length - listaTempoDomande.reduce((acc, cur) => acc + cur, 0));
            const tempoTotXP = listaTempoDomande.reduce((sum, num, index) => {
                // Arrotonda il numero prima di moltiplicarlo
                const numArrotondato = Math.round(timerDuration - num);
                return sum + (numArrotondato * (risposte[index] ? 1 : 0));  // Moltiplica solo se il booleano è true
            }, 0);
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
            titolo: state.selectedChallenge.titolo,
            argomento: state.selectedChallenge.argomento,
            dataCompletamento: new Date(),
            segnalazioni: segnalazioni,

        };

        console.log("XP inviati al database:", sfidaCompletata.xpGuadagnati);
        registraSfidaCompletata(sfidaCompletata, state.selectedChallenge);
        aggiornaLivello(sfidaCompletata.xpGuadagnati);

    };


    if (!changePage) {
        return (
            <View>
                <Card.Content>
                    <Text style={{ fontSize: 18, marginBottom: 16 }}>{currentQuestion.Testo}</Text>
                    {graficoDomandaAttivo && (
                        <Image
                            source={{ uri: 'https://cdn.pixabay.com/photo/2017/05/02/15/05/addition-2278415_1280.jpg' }}
                            style={{
                                width: 100,
                                height: 100,
                                marginRight: 8,
                                borderRadius: 4,
                            }}
                        />
                    )}
                    {currentQuestion.Risposte.map((risposta, index) => (
                        <View
                            key={index}
                            style={{
                                flexDirection: 'row', // Layout in fila
                                alignItems: 'center', // Allinea verticalmente
                                marginBottom: 8,      // Spaziatura tra i pulsanti
                            }}
                        >
                            {graficoRisposteAttivo && (
                                <Image
                                    source={{ uri: 'https://cdn.pixabay.com/photo/2017/05/02/15/05/addition-2278415_1280.jpg' }}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        marginRight: 8,
                                        borderRadius: 4,
                                    }}
                                />
                            )}
                            <Button
                                mode="contained"
                                style={{ flex: 1, backgroundColor: clickedButtonIndex===index ? isCorrectAnswer ? "green" : "red" : colors.primary }} // Il pulsante occupa tutto lo spazio rimanente
                                onPress={() => handleAnswerPress(risposta, index)}
                            >
                                {risposta} {/* Modifica "risposta" in base alla struttura del tuo oggetto */}
                            </Button>
                        </View>
                    ))}
                    <ProgressBar
                        progress={parseFloat(timerProgress.toFixed(3))}
                        style={{ marginTop: 16 }}
                        color={timerProgress > 0.8 ? "red" : "green"}
                    />
                    <Text style={{ marginTop: 8 }}>
                        Tempo rimasto: {Math.ceil((1 - timerProgress) * timerDuration)}s
                    </Text>
                    TimerProgress: {timerProgress.toString()}
                    <Text style={{ marginTop: 8 }}>Domande corrette: {punteggioOttenuto}</Text>
                    <Text>GraficoRisposteAttivo: {graficoRisposteAttivo.toString()}</Text>
                </Card.Content>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        padding: 10,
                    }}
                >
                    <Card style={{ flex: 1, margin: 5 }}>
                        <Text
                            style={{ textAlign: "center", padding: 10 }}
                            onPress={bonusGrafico}
                        >
                            Grafico
                        </Text>
                        <Text> Disponibilità: {(grafico && state.selectedChallenge.questions[currentQuestionIndex].Grafico) ? "1" : (state.selectedChallenge.questions[currentQuestionIndex].Grafico) ? "0" : "Non disponibile"}</Text>
                    </Card>
                    <Card style={{ flex: 1, margin: 5 }} onPress={bonusTempo}>
                        <Text style={{ textAlign: "center", padding: 10 }}>+30 secondi</Text>
                        <Text> Disponibilità: {tempoMaggiore ? "1" : "0"}</Text>
                    </Card>
                    <Card style={{ flex: 1, margin: 5 }} onPress={bonusTentativi}>
                        <Text style={{ textAlign: "center", padding: 10 }}>Doppio tentativo</Text>
                        <Text>Disponibilità: {dueTentativi ? "1" : "0"}</Text>
                    </Card>

                </View>
                <Button style = {{width:"50%", alignSelf:"center"}} mode="contained-tonal" onPress={() => setDialogVisible(true)}>Apri Dialog</Button>

                <Portal>
                    <Dialog visible={isDialogVisible} onDismiss={() => setDialogVisible(false)}>
                        <Dialog.Title>Motivo per segnalare</Dialog.Title>
                        <Dialog.Content>
                            <TextInput
                                label="Motivo"
                                value={motivo}
                                onChangeText={setMotivo}
                                multiline
                                numberOfLines={4}
                                style={styles.input}
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={() => setDialogVisible(false)}>Annulla</Button>
                            <Button onPress={handleSegnala}>Segnala</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
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

                                    <Text>Tempo Impiegato: {Math.round(listaTempoDomande[index])} s</Text>
                                    <Text>Risposta data: {listaRisposteDate[index]}</Text>
                                    <Text>Risposta corretta: {state.selectedChallenge.questions[index].Soluzione}</Text>
                                    <Text>Soluzione: {state.selectedChallenge.questions[index].Soluzione}</Text>
                                    <Text>Punti guadagnati: {risposte[index]? Math.round(10 + timerDuration - listaTempoDomande[index])  : 0}</Text>

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
