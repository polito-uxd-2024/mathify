import React, {useState, useEffect, useContext, useRef} from "react";
import * as Progress from 'react-native-progress';
import {View, ScrollView, TouchableOpacity, Modal, Animated, Easing, ViewStyle, Alert} from "react-native";
import {Appbar, Card,
    Button,
    Text,
    ProgressBar,
    useTheme,
    Dialog,
    TextInput,
    Portal,
    Icon,
    Headline, IconButton, Divider
} from "react-native-paper";
import {DomandaSegnalata, Sfida} from "../Component/Interfaces";
import { StateContext } from "../Reducer";
import Collapsible from "react-native-collapsible";
import {registraSegnalazione, registraSfidaCompletata} from "../Component/writeOnDb";
import {aggiornaLivello} from "../Component/aggiornaLivello";
import {useSetCurrentUser} from "../Component/setUser";
import { Image, StyleSheet  } from 'react-native';
import {styles} from "../Component/style";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {myTheme} from "../Component/theme";
import {Header} from "@react-navigation/stack";
import {ScreenFooter} from "react-native-screens";
import {RadioButton} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {PlayParamList} from "../Component/navigation";
import CustomModal from "../Component/CustomModal";

export default function PlayScreen() {
    const { colors } = useTheme();
    const [state] = useContext(StateContext);
    const navigation = useNavigation<NativeStackNavigationProp<PlayParamList>>()
    useSetCurrentUser("Utente1");

    const challenge: Sfida = {
        questions: state.selectedChallenge.questions,
        titolo: state.selectedChallenge.titolo,
        argomento: state.selectedChallenge.argomento,
        difficolta: state.selectedChallenge.difficolta,
    };
    const [isModalVisible, setModalVisible] = useState(false);
    const [pendingAction, setPendingAction] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener("beforeRemove", (e: any) => {
            if (changePage) {
                // Navigazione normale senza impedimenti
                navigation.dispatch(e.data.action);
            } else {
                // Impedisce la navigazione predefinita e mostra il modal
                e.preventDefault?.();
                setModalVisible(true);
                setPendingAction(e.data.action);
            }
        });

        return unsubscribe; // Pulisce il listener quando il componente viene smontato
    }, [navigation]);



    const confirmExit = () => {
        setModalVisible(false);
        if (pendingAction) {
            navigation.dispatch(pendingAction);
        }
    };

    const cancelExit = () => {
        setModalVisible(false);
        setPendingAction(null);
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
    const [selectedSuggestion, setSelectedSuggestion] = useState('');
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);


    const handleCloseModal = (title) => {
        setMotivo("");
        setDialogVisible(false);
        setSelectedSuggestion("");
    };
    const handleSegnala=()=>{

        const domanda=state.selectedChallenge.questions[currentQuestionIndex]
        const sfida=state.selectedChallenge
        console.log("Domanda",domanda)
        const segnalazione={
            domanda:{testo:domanda.Testo,risposte:domanda.Risposte,rispostaCorretta:domanda.Soluzione},
            motivo:motivo,
            sfida:{titolo:sfida.titolo,argomento:sfida.argomento}
        }
        registraSegnalazione(segnalazione)

        setDialogVisible(false)

    }
    // Gestione del timer
    useEffect(() => {
        if (!changePage) {
            const timerInterval = setInterval(() => {
                setTimerProgress((prev) => {
                    if (prev < 1) {
                        const newProgress = prev + 1 / timerDuration;
                        return newProgress >= 1 ? 1 : parseFloat(newProgress.toFixed(2));

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
    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };
    const handleNextQuestion = () => {
        const currentTime = Date.now();
        const timeTaken = parseFloat(((currentTime - startTime) / 1000).toFixed(2));
        setListaTempoDomande((prev) => [...prev, timeTaken]);

        if (currentQuestionIndex < challenge.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setProgress(parseFloat(((currentQuestionIndex + 1) / challenge.questions.length).toFixed(2)))
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
                GraficList: domanda.GraficList,
            })),
            punteggio: punteggioOttenuto,
            tempoImpiegato: timerDuration * challenge.questions.length,
            xpGuadagnati: totaleXP, // Calcolo diretto qui
            titolo: state.selectedChallenge.titolo,
            argomento: state.selectedChallenge.argomento,
            dataCompletamento: new Date(),
            segnalazioni: [],

        };

        console.log("XP inviati al database:", sfidaCompletata.xpGuadagnati);
        registraSfidaCompletata(sfidaCompletata, state.selectedChallenge);
        aggiornaLivello(sfidaCompletata.xpGuadagnati);

    };


    if (!changePage) {
        return (
            <View style={styles.content}>
                <View style={styles.challengeHeader}>
                    <Text style={styles.welcomeText}>{state.selectedChallenge.titolo}</Text>

                </View>
                    <View style={{
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        backgroundColor: myTheme.colors.cardBorder,
                        paddingHorizontal: 20,
                        paddingBottom: 20,

                    }}>

                        <Progress.Pie
                            progress={timerProgress}
                            //width={200}
                            color={timerProgress > 0.8 ? 'red' : 'green'}
                            size={30}
                        />



                    </View>
                <CustomModal
                    isVisible={isModalVisible}
                    onConfirm={confirmExit}
                    onCancel={cancelExit}
                    changePage={changePage}
                />
               <View style={{flex: 1}}>
                    <ScrollView style={{flex: 1}}>
                        <View style={styles.questionBody} contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={styles.questionCardBase}>
                            <Card style={styles.questionCard}>
                                <Text>

                                    {currentQuestionIndex + 1}/{challenge.questions.length}
                                </Text>
                                <Progress.Bar
                                    progress={(currentQuestionIndex + 1) / challenge.questions.length}
                                    width={200}
                                    color={colors.primary}
                                />

                                <Text style={{ fontSize: 18}}>{currentQuestion.Testo}</Text>
                                {graficoDomandaAttivo && (
                                <Image
                                    source={{ uri: state.selectedChallenge.questions[currentQuestionIndex].GraficList[0] }}
                                    style={{
                                        width: 230,
                                        height: 230,
                                        margin: 8,
                                        borderRadius: 4,
                                        alignSelf:"center"
                                    }}
                                />
                                )}
                            </Card>
                            </View>
                            <View style={{marginTop: 10}}>
                            {currentQuestion.Risposte.map((risposta, index) => (
                            <View
                                key={index}
                                style={{
                                    flexDirection: 'row', // Layout in fila
                                    alignItems: 'center', // Allinea verticalmente
                                       // Spaziatura tra i pulsanti
                                }}
                            >
                                <View style={styles.answerCardBase}>
                                    <Button
                                        mode="contained"

                                        labelStyle={{ fontSize: 18}}
                                        style={[styles.answerButton, {
                                            backgroundColor: coloreRisposta && clickedButtonIndex===index ? isCorrectAnswer ? myTheme.colors.rightAnswer : myTheme.colors.wrongAnswer : 'white' }]} // Il pulsante occupa tutto lo spazio rimanente
                                        onPress={() => handleAnswerPress(risposta, index)}
                                    >
                                        <View style={{ alignItems: 'center' }}>
                                            <Text>{risposta}</Text>
                                            {graficoRisposteAttivo && (
                                                <Image
                                                    source={{ uri: state.selectedChallenge.questions[currentQuestionIndex].GraficList[index] }}
                                                    style={{
                                                        width: 200,
                                                        height: 200,
                                                        marginTop: 8,
                                                        borderRadius: 4,
                                                    }}
                                                />
                                            )}
                                        </View>
                                    </Button>
                                </View>
                            </View>
                        ))}</View>
                        </View>
                    </ScrollView>
                </View>
                <View>
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                            padding: 10,
                            backgroundColor: myTheme.colors.cardBorder,
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                        }}
                    >
                        {(grafico) && (state.selectedChallenge.questions[currentQuestionIndex].GraficList.length>0) && (
                        <TouchableOpacity style={styles.miniCardBase} onPress={bonusGrafico}>
                            <Card style={[styles.miniCard]}>
                                <View style={{height: 40, alignItems: 'center', justifyContent: 'center'}}>
                                <Text
                                    style={{ fontSize: 12, textAlign: "center", padding: 3 }}
                                >
                                    Mostra Grafico
                                </Text>
                                </View>
                                <View style={styles.insideCard}>
                                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{(grafico && state.selectedChallenge.questions[currentQuestionIndex].GraficList.length>0) ? "1" : (state.selectedChallenge.questions[currentQuestionIndex].GraficList.length>0) ? "0" : "-"}</Text>
                                </View>

                            </Card>
                        </TouchableOpacity>)}
                        <TouchableOpacity style={styles.miniCardBase} onPress={bonusTempo} >
                            <Card style={[styles.miniCard, {backgroundColor: (tempoMaggiore) ? 'white':myTheme.colors.gray  }]}>
                                <View style={{height: 40, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{ fontSize: 12, textAlign: "center", padding: 3 }}>+30 secondi</Text>
                                </View>
                                    <View style={styles.insideCard}>
                                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{tempoMaggiore ? "1" : "0"}</Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.miniCardBase} onPress={bonusTentativi}>
                            <Card style={[styles.miniCard, {backgroundColor: (dueTentativi) ? 'white':myTheme.colors.gray  }]}>
                                <View style={{height: 40, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={{ fontSize: 12, textAlign: "center", padding: 3 }}>Doppio tentativo</Text>
                                </View>
                                <View style={styles.insideCard}>
                                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{dueTentativi ? "1" : "0"}</Text>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    </View>

                </View>


            </View>
        );

    } else {
       ;
        return (
            <View style={{flex:1}}>
                <CustomModal
                    isVisible={isModalVisible}
                    onConfirm={confirmExit}
                    onCancel={cancelExit}
                    changePage={changePage}
                />
                <Portal style={styles.modalContainer} >
                    <Dialog visible={ricompensa} onDismiss={() => setRicompensa(false)} style={styles.modalBase}>
                        <View style={[styles.cardBase, {marginTop: 0}]}>
                            <View style={styles.card}>
                        <View style={styles.modalContent}>
                        <Dialog.Title style={styles.modalTitle}>CONGRATULAZIONI!!</Dialog.Title>
                        <Dialog.Content >
                            <Text style={{marginBottom:10}}>Nuovo badge sbloccato:</Text>
                            <View style={styles.insideCard}>
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

                            </Text></View>
                            <Text style={{ fontSize: 14, textAlign: 'center', marginTop: 10 }}>

                                Hai guadagnato {xp} XP
                            </Text>
                            <View  style={[styles.progressBar,{flexDirection: 'row', paddingTop: 0}]}>
                                <View
                                    style={
                                        { width: `${Math.min((state.utente.livello.xpTotali / 5000) * 100)}%`,
                                            backgroundColor: myTheme.colors.cardBorder,
                                            paddingVertical: 10,
                                            borderBottomLeftRadius: 10,
                                            borderTopLeftRadius: 10,
                                        } as ViewStyle}
                                ></View>
                                <View
                                    style={{ width: `${Math.min((xp/5000) * 100)}%`,
                                        backgroundColor: myTheme.colors.primary,
                                        paddingVertical: 10,

                                } as ViewStyle}
                                /></View>
                        </Dialog.Content>
                        <Dialog.Actions style={{padding: 0, justifyContent: 'center', paddingTop: 0}}>
                            <Button style={styles.button} onPress={() => setRicompensa(false)}>Vai al riepilogo</Button>
                        </Dialog.Actions>
                        </View>
                        </View>
                        </View>
                    </Dialog>
                </Portal>






                <View style={styles.cover}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', fontSize: 30, color: 'white'}}>Complimenti! </Text>
                        <Text style={{fontSize: 16, color: 'white'}}>Sfida Completata</Text>
                    </View>
                </View>

                <ScrollView>

                    <View style={{flex: 1}}>

                    <View style={styles.mainContent}>
                    <View style={[styles.grayCard, {marginTop: 20, paddingHorizontal: 50, borderRadius: 25}]}>

                        <Text style={styles.subtitle}>{state.selectedChallenge.argomento}</Text>
                        <Text style={styles.sectionText}>{state.selectedChallenge.titolo}</Text>
                        <View style={{marginVertical: 5, backgroundColor: 'white', paddingVertical: 5, paddingHorizontal: 25, borderRadius: 10}}>
                            <Text style={{fontSize: 18}}>{punteggioOttenuto} / {challenge.questions.length}</Text>
                        </View>
                    </View>
                        {risposte.map((valore, index) => (
                            <View style={styles.article} key={`question-${index}`}>
                                <View style={styles.cardBase}>
                                    <Card style={{borderRadius: 20, backgroundColor: myTheme.colors.cardBorder}}>
                                        <Card.Content style={[styles.card, {paddingBottom: 15}]}>
                                            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                                                <Text style={{fontSize: 16, marginRight: 8, fontWeight: 'bold'}}>{index + 1}</Text>
                                                <Text style={{fontSize: 16}}>{state.selectedChallenge.questions[index].Testo}</Text>
                                            </View>
                                            <IconButton
                                                mode="contained-tonal"
                                                onPress={() => setDialogVisible(true)}
                                                contentStyle={{ height: 30 }}
                                                labelStyle={{ fontSize: 14 }}
                                                style={{backgroundColor: 'transparent', margin: 0}}
                                                icon="alert"
                                            />
                                            <View>
                                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                                    <View style={[styles.callout, {marginTop: 6, backgroundColor: valore ? myTheme.colors.rightAnswer : myTheme.colors.wrongAnswer}]}>
                                                        <Text style={{paddingHorizontal: 6}}>{valore ? 'corretta' : 'sbagliata'}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </Card.Content>
                                        <TouchableOpacity onPress={() => toggleExpand(index)}
                                                          style={{
                                                              flex: 1,
                                                              paddingTop: 0,
                                                              paddingBottom: 10,
                                                              backgroundColor: myTheme.colors.cardBorder,
                                                              alignItems: 'flex-end',
                                                              borderBottomLeftRadius: 20,
                                                              borderBottomRightRadius: 20
                                                          }}>
                                            <Text style={{color: myTheme.colors.primary, paddingRight: 30, fontWeight: 'bold'}}>
                                                {expandedIndex === index ?
                                                    <MaterialCommunityIcons name="eye-off" size={24} color="black" /> :
                                                    <MaterialCommunityIcons name="eye" size={24} color="black" />
                                                }
                                            </Text>
                                        </TouchableOpacity>
                                        <Collapsible collapsed={expandedIndex !== index}>
                                            <View style={[styles.card, {padding: 15}]}>
                                                <Divider />
                                                {state.selectedChallenge.questions[index].Risposte.map((risposta, index2) => (
                                                    <View key={`answer-${index}-${index2}`} style={{marginVertical: 8, padding: 8, borderRadius: 10,
                                                        backgroundColor: risposta === listaRisposteDate[index]
                                                            ? (risposta === state.selectedChallenge.questions[index].Soluzione ? myTheme.colors.rightAnswer : myTheme.colors.wrongAnswer)
                                                            : 'rgb(245,245,245)'}}>
                                                        <Text style={{fontSize: 16}}>{risposta}</Text>
                                                        <Divider />
                                                    </View>
                                                ))}
                                                <View style={{paddingTop: 10}}>
                                                    <Text style={styles.sectionText}>Spiegazione</Text>
                                                    <Text>{state.selectedChallenge.questions[index].Spiegazione}</Text>
                                                </View>
                                            </View>
                                        </Collapsible>
                                    </Card>
                                </View>
                            </View>
                        ))}

                        <View style={styles.section}>
                            <Card style={{alignItems: 'flex-between',backgroundColor: myTheme.colors.cardBorder, padding: 20, borderRadius: 25}}>
                                <Text style={styles.sectionText}>Conteggio punti</Text>
                                <View style={{flexDirection: 'row', paddingTop: 10}}>
                                <View style={styles.miniWhiteCardBase}>
                                    <View style={[styles.miniCard, {borderColor: 'white'}]}>
                                        <View style={styles.insideCard}>
                                            <View style={styles.row}>
                                                <MaterialCommunityIcons
                                                    name="lightning-bolt"
                                                    size={24}
                                                    color="black"
                                                />
                                                <Text style={{fontWeight: 'bold',marginLeft: 5,padding: 5, paddingHorizontal: 'auto'}}>
                                                    {tempoTotaleXP}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{paddingHorizontal: 3, paddingVertical: 5, alignItems: 'center'}}>
                                            <Text style={styles.smallText}>Punti guadagnati per la velocità</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.miniWhiteCardBase}>
                                    <View style={[styles.miniCard, {borderColor: 'white'}]}>
                                        <View style={styles.insideCard}>
                                            <View style={styles.row}>
                                                <MaterialCommunityIcons
                                                    name="weight-lifter"
                                                    size={24}
                                                    color="black"
                                                />
                                                <Text style={{fontWeight: 'bold',marginLeft: 5,padding: 5, paddingHorizontal: 'auto'}}>
                                                    {state.selectedChallenge.difficolta * 50}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{paddingHorizontal: 3, paddingVertical: 5, alignItems: 'center'}}>
                                            <Text style={styles.smallText}>Punti guadagnati in base alla difficoltà</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.miniWhiteCardBase}>
                                    <View style={[styles.miniCard, {borderColor: 'white'}]}>
                                        <View style={styles.insideCard}>
                                            <View style={styles.row}>
                                                <MaterialCommunityIcons
                                                    name="check"
                                                    size={24}
                                                    color="black"
                                                />
                                                <Text style={{fontWeight: 'bold',marginLeft: 5,padding: 5, paddingHorizontal: 'auto'}}>
                                                    {xpCorrect}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{paddingHorizontal: 3, paddingVertical: 5, alignItems: 'center'}}>
                                            <Text style={styles.smallText}>Punti per le risposte corrette</Text>
                                        </View>
                                    </View>
                                </View>
                                </View>
                                <View style={{paddingTop: 10, paddingRight: 5, alignItems: 'center'}}>
                                    <Text>Punti totali</Text>
                                    <View style={{backgroundColor: 'white', padding: 5, paddingHorizontal: 30, borderRadius: 10}}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold', fontFamily: 'Itim', color: myTheme.colors.primary}}>{xp}</Text>
                                    </View>
                                    </View>
                            </Card>
                        </View>
                    </View>
                        <View style={{flex: 1, padding: 20, paddingHorizontal: 60}}>
                        <View style={styles.buttonBase}>
                            <Button style={styles.whiteButton} onPress={()=>
                                navigation.goBack()}>Torna alla Home</Button>
                        </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={[styles.modalContainer, {backgroundColor: 'rgba(255,255,255,0)'}]}>
                    <Modal
                        visible={isDialogVisible}
                        style={styles.drawerModalBase}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setDialogVisible(false)}
                    >
                        <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={() => setDialogVisible(false)}>>
                            <TouchableOpacity style={styles.drawerModalBase} activeOpacity={1} >
                                <Dialog.Title><Text style={styles.welcomeText}>Perchè vuoi segnalare questa domanda?</Text></Dialog.Title>
                                <Dialog.Content>
                                    <RadioButton.Group onValueChange={value => setMotivo(value)} value={motivo}>
                                        <RadioButton.Item label="Grammatica o scrittura" value="grammatica o scrittura" />
                                        <RadioButton.Item label="Domanda ripetuta" value="domanda ripetuta" />
                                        <RadioButton.Item label="Risposta sbagliata" value="risposta sbagliata" />
                                    </RadioButton.Group>


                                    <TextInput
                                        label="Motivo"
                                        value={motivo}
                                        onChangeText={setMotivo}
                                        multiline
                                        style={{marginVertical: 5}}
                                        numberOfLines={4}
                                        mode="outlined"
                                        outlineStyle={{borderRadius: 50, borderWidth: 2}}
                                    />

                                </Dialog.Content>
                                <Dialog.Actions>

                                    <Button
                                        mode="outlined"
                                        style={styles.expandButton}
                                        onPress={handleCloseModal}>Annulla</Button>
                                    <Button
                                        mode="contained"
                                        style={styles.expandButton}
                                        onPress={handleSegnala}>Segnala</Button>

                                </Dialog.Actions>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Modal>
                </View>



            </View>
    );
    }
}
