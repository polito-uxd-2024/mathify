import {styles} from "../Component/style";
import {Appbar, Button, Card, IconButton} from "react-native-paper";
import {View, Text, ScrollView, SafeAreaView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {ProfileStackParamList} from "../Component/navigation";
import React, {useContext, useEffect, useState} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {StateContext} from "../Reducer";
import { Modal, Pressable } from 'react-native';
import {useSetCurrentUser} from "../Component/setUser";
import {registraVerifica} from "../Component/writeOnDb";
import {myTheme} from "../Component/theme";

export default function Impostazioni() {
    const navigation=useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
    const [state] = useContext(StateContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [verificationModal, setVerificationModal] = useState(false);
    const [successModal, setSuccessModal] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [hasShownSuccessModal, setHasShownSuccessModal] = useState(false);  // Flag per controllare se il pop-up è già stato mostrato
    useSetCurrentUser("Utente1");

    const handleVerification = () => {
        if (state.utente.verifica) {
            setFeedbackMessage("Il tuo account è già verificato");
            setVerificationModal(true);
        } else {
            registraVerifica("Utente1");
            setFeedbackMessage("Ti abbiamo inviato una email a " + state.utente.email + ". Per completare la verifica clicca sul link presente nella email.");
            setVerificationModal(true);
        }
    };

    const closeVerificationModal = () => {
        setVerificationModal(false);
        if (state.utente.verifica && !hasShownSuccessModal) {
            setSuccessModal(true);
            setHasShownSuccessModal(true);  // Imposta il flag per non farlo ripetere
        }
    };

    const closeSuccessModal = () => {
        setSuccessModal(false);
    };

    useEffect(() => {
        // Verifica se l'utente è verificato e il pop-up non è ancora stato mostrato
        if (state.utente.verifica && !hasShownSuccessModal) {
            setSuccessModal(true); // Mostra il pop-up di successo
            setHasShownSuccessModal(true);  // Imposta il flag per non farlo ripetere
        }
    }, [state.utente.verifica]); // Ora dipende solo da `state.utente.verifica`

    return (
        <>
        <SafeAreaView style={[styles.header, { flexDirection: "row", alignItems: "center", justifyContent: "center" }]}>
            {/* Back Icon */}
            <View style={{ flex: 1 }}>
                <IconButton
                    icon="arrow-left"
                    size={24}
                    color="black"
                    onPress={() => navigation.goBack()}
                    style={{ marginRight: 10 }}
                />
            </View>
            {/* Title */}
            <Text style={[styles.welcomeText, { flex: 1, textAlign: "center"}]}>Impostazioni</Text>
            <View style={{ flex: 1 }} />
        </SafeAreaView>

        <ScrollView style={[styles.mainContent]}>
            <SafeAreaView>

            <Card style={styles.randomCard}>
                <Card.Content>
                    <Text style={styles.welcomeText}>
                        Account Studente
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.sectionText}>
                            {state.utente.verifica ? "Verificato" : "Non verificato"}
                        </Text>

                        <Pressable onPress={() => setModalVisible(true)}>
                            <MaterialCommunityIcons
                                name="information-outline"
                                size={20}
                                color="black"
                            />
                        </Pressable>
                    </View>

                        {!state.utente.verifica&&(<View style={styles.settingsCardBase}>
                            <Button
                            onPress={handleVerification}
                            style={styles.settingsCard}
                            disabled={state.utente.verifica}  // Disabilita il pulsante se l'utente è verificato
                        >
                            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                                Verifica
                            </Text>
                        </Button>
                        </View>)}


                </Card.Content>
            </Card>

            {/* Info Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{width: '80%', backgroundColor: 'white',borderRadius: 10, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5,
                        position: 'relative' // Posizione relativa per posizionare elementi assoluti all'interno
                    }}>
                        {/* Pulsante X in alto a destra */}
                        <Pressable
                            style={{position: 'absolute', top: 10, right: 10, backgroundColor: '#e74c3c', borderRadius: 15, padding: 5}}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>X</Text>
                        </Pressable>

                        <Text style={{ fontSize: 16, textAlign: 'center', marginVertical: 20 }}>
                            Informazioni sul tuo account.
                        </Text>

                        {/* Controllo dello stato di verifica */}
                        {state.utente.verifica ? (
                            <>
                                {parseInt(state.utente.livello.numero, 10)  >= 10 ? (
                                    <Text style={{ fontSize: 16, marginBottom: 20, textAlign: 'center', marginTop: 20 }}>
                                        Il tuo account è verificato e hai il livello necessario per modificare gli argomenti.
                                    </Text>
                                ) : (
                                    <Text style={{ fontSize: 16, marginBottom: 20, textAlign: 'center', marginTop: 20 }}>
                                        Il tuo account è verificato, ma il tuo livello attuale è {state.utente.livello.numero}. Devi avere il livello 10 o superiore per modificare gli argomenti.
                                    </Text>
                                )}
                            </>
                        ) : (
                            <Text style={{ fontSize: 16, marginBottom: 20, textAlign: 'center', marginTop: 20 }}>
                                Non hai effettuato la verifica della mail associata all'account.
                                Gli utenti non verificati non possono modificare i contenuti dell'app.
                            </Text>
                        )}

                        {/* Pulsante "Ho capito" in basso */}
                        <Pressable
                            style={{backgroundColor: '#ddd', padding: 10, borderRadius: 8, marginTop: 20, width: '80%'}}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={{ fontSize: 16, color: '#555', textAlign: 'center' }}>Ho capito</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Verification Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={verificationModal}
                onRequestClose={closeVerificationModal}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{backgroundColor: 'white', borderRadius: 10, padding: 20, alignItems: 'center', position: 'relative'}}>
                        <Pressable
                            style={{ position: 'absolute', top: 10, right: 10, backgroundColor: '#e74c3c', borderRadius: 15, padding: 5 }}
                            onPress={closeVerificationModal}
                        >
                            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>X</Text>
                        </Pressable>
                        <Text style={{ fontSize: 16, textAlign: 'center', marginVertical: 20 }}>
                            {feedbackMessage}
                        </Text>
                        {!state.utente.verifica && (
                            <Button onPress={() => setFeedbackMessage("Una nuova email è stata inviata!")}>
                                Inviami un'altra email
                            </Button>
                        )}
                        <Pressable
                            style={{backgroundColor: '#ddd', padding: 10, borderRadius: 8, marginTop: 20, width: '80%'}}
                            onPress={closeVerificationModal}
                        >
                            <Text style={{ fontSize: 16, color: '#555', textAlign: 'center' }}>Chiudi</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {/* Success Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={successModal}
                onRequestClose={closeSuccessModal}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{backgroundColor: 'white', borderRadius: 10, padding: 20, alignItems: 'center', position: 'relative'}}>
                        <Pressable
                            style={{ position: 'absolute', top: 10, right: 10, backgroundColor: '#e74c3c', borderRadius: 15, padding: 5 }}
                            onPress={closeSuccessModal}
                        >
                            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>X</Text>
                        </Pressable>
                        <Text style={{ fontSize: 16, textAlign: 'center', marginVertical: 20 }}>
                            Hai verificato il tuo account!
                            {parseInt(state.utente.livello.numero, 10) >= 10 && (
                                <Text> Ora puoi modificare gli argomenti.</Text>
                            )}
                        </Text>
                        <Pressable
                            style={{backgroundColor: '#ddd', padding: 10, borderRadius: 8, marginTop: 20, width: '80%'}}
                            onPress={closeSuccessModal}
                        >
                            <Text style={{ fontSize: 16, color: '#555', textAlign: 'center' }}>Chiudi</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={styles.section}>
            <Card style={styles.randomCard}>
                <Card.Content>
                    <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 20 }}>
                        La mia Classe
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
                        <Text style={styles.sectionText}>
                            5A, Prof. Giovanni Rossi</Text>

                    </View>
                    <View style={styles.settingsCardBase}>
                        <Button style={styles.settingsCard}>
                            <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                            Gestisci >
                            </Text>
                        </Button>
                    </View>
                </Card.Content>
            </Card>
            </View>
            <View style={styles.section}>
            <Card style={styles.randomCard}><View style={{padding: 20}}>
                <View style={styles.settingsCardBase}>

                <Button style={styles.settingsCard}>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                        Preferenze >
                    </Text>
                </Button>
                </View>
                <View style={styles.settingsCardBase}>
                    <Button style={styles.settingsCard}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                        Profilo >
                    </Text>
                    </Button>
                </View>
                <View style={styles.settingsCardBase}>
                    <Button style={styles.settingsCard}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                        Pagine Modificate >
                    </Text>
                    </Button>
                </View>
                <View style={styles.settingsCardBase}>
                    <Button style={styles.settingsCard} onPress={()=>navigation.navigate("Segnalazioni")}>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                        Segnalazioni >
                    </Text>
                    </Button>
                </View>
                <View style={styles.settingsCardBase}>
                    <Button style={styles.settingsCard}>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                        Supporto >
                    </Text>
                </Button>
                </View>
                </View>
            </Card>
            </View>

            <Card style={{ flex: 1, marginTop: 15, padding: 16, borderRadius: 10, width: '100%', alignSelf: 'center' }}>
                {/* Nome e cognome con il bottone "ESCI" */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
                        {state.utente.nome} {state.utente.cognome}
                    </Text>

                    <Button>
                        <MaterialCommunityIcons
                            name="door-open"
                            size={20}
                            color="#e74c3c"
                            style={{ marginRight: 5 }}
                        />
                        <Text style={{ fontSize: 14, color: "#e74c3c" }}>
                            ESCI
                        </Text>
                    </Button>
                </View>

                {/* Visualizza email */}
                <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
                    <Text style={{ fontSize: 14, marginLeft: 7, color: "gray" }}>
                        {state.utente.email}
                    </Text>
                </View>
            </Card>
            </SafeAreaView>
        </ScrollView>
        </>
    );
}