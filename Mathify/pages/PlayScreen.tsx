import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView } from "react-native";
import {
    Appbar,
    Card,
    Button,
    Text,
    ProgressBar,
    useTheme,
    Dialog,
    TextInput,
    Portal,
    Icon,
    Headline
} from "react-native-paper";
import {DomandaSegnalata, Sfida} from "../Component/Interfaces";
import { StateContext } from "../Reducer";
import Collapsible from "react-native-collapsible";
import {registraSfidaCompletata} from "../Component/writeOnDb";
import {aggiornaLivello} from "../Component/aggiornaLivello";
import {useSetCurrentUser} from "../Component/setUser";
import { Image, StyleSheet  } from 'react-native';
import {styles} from "../Component/style";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {myTheme} from "../Component/theme";
import {Header} from "@react-navigation/stack";
import {ScreenFooter} from "react-native-screens";


export default function PlayScreen() {
    const { colors } = useTheme();
    const [state] = useContext(StateContext);
    useSetCurrentUser("Utente1");

    const challenge: Sfida = {
        questions: state.selectedChallenge.questions,
        titolo: state.selectedChallenge.titolo,
        argomento: state.selectedChallenge.argomento,
        difficolta: state.selectedChallenge.difficolta,
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
    const [coloreRisposta, setColoreRisposta] = useState(false)
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const [ricompensa, setRicompensa] = useState(true)
    const [isWaiting, setIsWaiting] = useState(false)


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
        if (!changePage) {
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
        }
        else {
            return
        }
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
        if (state.selectedChallenge.questions[currentQuestionIndex].GraficList.length>0) {
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
            setColoreRisposta(false)
        } else {
            setChangePage(true);
        }
    };

    const handleAnswerPress = async (risposta: string, index: number) => {
        if (isWaiting) return;
        else {
            setIsWaiting(true)
            setClickedButtonIndex(index); // Registra il pulsante cliccato
            const isCorrect = risposta === currentQuestion.Soluzione;
            setIsCorrectAnswer(isCorrect);
            setColoreRisposta(true); // Attiva il colore

            // Aspetta 1 secondo per mostrare il colore
            await sleep(1000);
            setIsWaiting(false)

            // Aggiorna il punteggio e passa alla prossima domanda
            if (!tentativiAttivo) {
                setPunteggioOttenuto((prev) => (isCorrect ? prev + 1 : prev));
                setRisposte((prev) => [...prev, isCorrect]);
                setListaRispsoteDate((prev) => [...prev, risposta]);
                handleNextQuestion();
            } else {
                if (isCorrect) {
                    setPunteggioOttenuto((prev) => prev + 1);
                    setRisposte((prev) => [...prev, true]);
                    setListaRispsoteDate((prev) => [...prev, risposta]);
                    setTentativiAttivo(false);
                    handleNextQuestion();
                } else {
                    setTentativiAttivo(false);
                }
            }

            setColoreRisposta(false); // Resetta il colore dopo aver gestito la domanda
    }};

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
            setXp(state.selectedChallenge.difficolta * 50 + xpCorretto + tempoTotXP);
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

        const totaleXP = state.selectedChallenge.difficolta * 50 + xpCorretto + tempoTotXP;

        const sfidaCompletata = {
            domande: challenge.questions.map((domanda, index) => ({
                Testo: domanda.Testo,
                Risposte: domanda.Risposte,
                RispostaCorretta: domanda.Soluzione,
                RispostaData: listaRisposteDate[index] || "Nessuna risposta data",
                tempoImpiegato: listaTempoDomande[index] || 0,
                correttezza: risposte[index] || false,
                Spiegazione: domanda.Spiegazione,
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
            <View style={styles.content}>
                <View style={styles.content}>
                    <View style={styles.cover}>
                        <Text style={{ fontSize: 20, marginBottom: 10}}>{currentQuestion.Testo}</Text>
                        <ProgressBar
                            progress={parseFloat(timerProgress.toFixed(3))}
                            style={styles.progressBar}
                            color={timerProgress > 0.8 ? myTheme.colors.wrongAnswer : myTheme.colors.rightAnswer}
                        />
                    </View>
                    <ScrollView style={styles.questionBody}>
                        {graficoDomandaAttivo && (
                        <Image
                            source={{ uri: state.selectedChallenge.questions[currentQuestionIndex].GraficList[0] }}
                            style={{
                                width: 100,
                                height: 100,
                                margin: 8,
                                borderRadius: 4,
                                alignSelf:"center"
                            }}
                        />
                        )}
                        {currentQuestion.Risposte.map((risposta, index) => (
                        <View
                            key={index}
                            style={{
                                flexDirection: 'row', // Layout in fila
                                alignItems: 'center', // Allinea verticalmente
                                marginBottom: 20,      // Spaziatura tra i pulsanti
                            }}
                        >

                            <Button
                                mode="contained"
                                buttonColor={myTheme.colors.cardBorder}
                                labelStyle={{ fontSize: 18 }}
                                style={[styles.answerButton, {
                                    backgroundColor: coloreRisposta && clickedButtonIndex===index ? isCorrectAnswer ? myTheme.colors.rightAnswer : myTheme.colors.wrongAnswer : colors.primary }]} // Il pulsante occupa tutto lo spazio rimanente
                                onPress={() => handleAnswerPress(risposta, index)}
                            >
                                {risposta} {/* Modifica "risposta" in base alla struttura del tuo oggetto */}
                                {graficoRisposteAttivo && (
                                <Image
                                    source={{ uri: state.selectedChallenge.questions[currentQuestionIndex].GraficList[index] }}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        marginRight: 8,
                                        borderRadius: 4,
                                    }}
                                />
                            )}
                            </Button>
                        </View>
                    ))}
                    </ScrollView>
                </View>
                    {/*
                    <Text style={{ marginTop: 8 }}>
                        Tempo rimasto: {Math.ceil((1 - timerProgress) * timerDuration)}s
                    </Text>
                    TimerProgress: {timerProgress.toString()}
                    <Text style={{ marginTop: 8 }}>Domande corrette: {punteggioOttenuto}</Text>
                    <Text>GraficoRisposteAttivo: {graficoRisposteAttivo.toString()}</Text>
                    */}

                <View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        padding: 10,
                    }}
                >
                    <View style={styles.miniCardBase}>
                        <Card style={styles.miniCard}>
                            <Text
                                style={{ textAlign: "center", padding: 10 }}
                                onPress={bonusGrafico}
                            >
                                Mostra Grafico
                            </Text>
                            <View style={styles.insideCard}>
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{(grafico && state.selectedChallenge.questions[currentQuestionIndex].GraficList.length>0) ? "1" : (state.selectedChallenge.questions[currentQuestionIndex].GraficList.length>0) ? "0" : "Non disponibile"}</Text>
                            </View>
                        </Card>
                    </View>
                    <View style={styles.miniCardBase}>
                        <Card style={styles.miniCard} onPress={bonusTempo}>
                            <Text style={{ textAlign: "center", padding: 10 }}>+30 secondi</Text>
                            <View style={styles.insideCard}>
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{tempoMaggiore ? "1" : "0"}</Text>
                            </View>
                        </Card>
                    </View>
                    <View style={styles.miniCardBase}>
                        <Card style={styles.miniCard} onPress={bonusTentativi}>
                            <Text style={{ textAlign: "center", padding: 10 }}>Doppio tentativo</Text>
                            <View style={styles.insideCard}>
                                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{dueTentativi ? "1" : "0"}</Text>
                            </View>
                        </Card>
                    </View>
                </View>


                <Button style = {{width:"50%", alignSelf:"center"}} mode="contained-tonal" onPress={() => setDialogVisible(true)}>Apri Dialog</Button>
                </View>

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
            <View style={{flex:1}}>

                <Portal>
                    <Dialog visible={ricompensa} onDismiss={() => setRicompensa(false)}>
                        <Dialog.Title>
                            CONGRATULAZIONI!!
                        </Dialog.Title>
                        <Dialog.Content>
                            <Text style={{marginBottom:10}}>Nuovo badge sbloccato:</Text>
                            {/* Simbolo del badge */}
                            <View
                                style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#3498db', justifyContent: 'center', alignItems: 'center', alignSelf:"center" }}
                            >
                                <MaterialCommunityIcons
                                    name="trophy"
                                    size={40}
                                    color="white"
                                />
                            </View>
                            {/* Dettagli del badge */}
                            <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                                {state.selectedChallenge.titolo}
                            </Text>
                            <Text style={{ fontSize: 14, textAlign: 'center' }}>
                                {state.selectedChallenge.argomento}
                            </Text>
                            <Text style={{ fontSize: 14, textAlign: 'center', marginTop: 10 }}>
                                Hai guadagnato {xp} XP
                            </Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                        <Button onPress={() => setRicompensa(false)}>Vedi dettagli sfida</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
                <Text style={{fontSize:36, fontWeight:"bold", margin:5}}>COMPLIMENTI! HAI COMPLETATO LA SFIDA</Text>
                <Text style={{fontSize:20, margin:3}}>{state.selectedChallenge.argomento}</Text>
                <Text style={{fontSize:20,margin:3}}>{state.selectedChallenge.titolo}</Text>
                <View style={{height:500, marginRight: 20, marginLeft: 20}}>
                <ScrollView style={{ padding: 16, backgroundColor:"grey", borderRadius:5, flex:1 }} contentContainerStyle={{ flexGrow: 1 }}>
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
                                    <Text>Grafico del testo: </Text>
                                    {state.selectedChallenge.questions[index].GraficList.length===1 ? <Image
                                        source={{ uri: state.selectedChallenge.questions[currentQuestionIndex].GraficList[0] }}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            margin: 8,
                                            borderRadius: 4,
                                            alignSelf:"center"
                                        }}
                                    /> : "Grafico non disponibile"}

                            </Collapsible>
                        </Card.Content>
                    </Card>
                ))}
                </ScrollView>
                </View>
                <Card>
                    <Text>Conteggio punti:</Text>
                    <Text>Punti guadagnati dal tempo: {tempoTotaleXP}</Text>
                    <Text>Punti in base alla difficoltà: {state.selectedChallenge.difficolta * 50}</Text>
                    <Text>Punti per le risposte corrette: {xpCorrect}</Text>
                    <Text>Punti totali: {xp}</Text>
                </Card>

            </View>
        );
    }
}
