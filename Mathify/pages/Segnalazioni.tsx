import { StateContext } from "../Reducer";
import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import {Appbar, Card, IconButton} from "react-native-paper";
import { styles } from "../Component/style";
import { myTheme } from "../Component/theme";
import { FontAwesome } from "react-native-vector-icons";
import {useNavigation} from "@react-navigation/native";

export default function Segnalazioni() {
    const [state] = useContext(StateContext);
    const navigation=useNavigation();

    return (
        <>
            <Appbar.Header style={[styles.header]}>
                <View style={{ position: 'absolute', left: 0 }}>
                    <IconButton
                        icon="arrow-left"
                        size={24}
                        color="black"
                        onPress={() => navigation.goBack()}
                        style={{ marginLeft: 10 }}
                    />
                </View>
                <Appbar.Content title="Segnalazioni" style={{ alignSelf: "center", marginLeft: 50 }} />
            </Appbar.Header>
        <ScrollView style={styles.content}>

            <View style={styles.mainContent}>
                {state.utente.sfideCompletate
                    .filter((sfida) => sfida.segnalazioni && sfida.segnalazioni.length > 0)
                    .map((sfida, sfidaIndex) => (
                        <View key={`sfida-${sfidaIndex}`} style={{ paddingTop: 10 }}>
                            <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 0, marginBottom: 10 }}>
                                {sfida.titolo}
                            </Text>
                            <View style={{ padding: 10 }}>
                                {sfida.segnalazioni.map((segnalazione, segnalazioneIndex) => {
                                    // Randomize risolta property
                                    const isResolved = Math.random() < 0.5;

                                    return (
                                        <View
                                            key={`segnalazione-${sfidaIndex}-${segnalazioneIndex}`}
                                            style={[styles.mainWhiteCard, { marginBottom: 20, padding: 20, alignItems: "center" }]}
                                        >
                                            <View style={{ alignItems: "flex-start" }}>
                                                <Text style={styles.welcomeText}>
                                                    {segnalazioneIndex + 1}. Segnalazione
                                                </Text>
                                                <Text style={[styles.calloutText, { marginVertical: 10 }]}>
                                                    Testo della domanda:
                                                </Text>
                                                <Text style={{ fontSize: 16 }}>
                                                    {segnalazione.domanda?.testo || "Domanda non disponibile"}
                                                </Text>
                                                <Text style={[styles.calloutText, { marginVertical: 10 }]}>
                                                    Motivo della segnalazione:
                                                </Text>
                                                <Text style={{ fontSize: 16, textAlign: 'center' }}>
                                                    {segnalazione.motivo || "Motivo non specificato"}
                                                </Text>
                                                <Text style={[styles.calloutText, { marginVertical: 10 }]}>
                                                    Stato della segnalazione:
                                                </Text>
                                                <View
                                                    style={[
                                                        styles.callout,
                                                        {
                                                            marginTop: 6,
                                                            backgroundColor:
                                                                isResolved
                                                                    ? myTheme.colors.rightAnswer
                                                                    : myTheme.colors.wrongAnswer,
                                                        },
                                                    ]}
                                                >
                                                    <Text style={{ paddingHorizontal: 6, color: 'white', fontWeight: 'bold', fontFamily: 'Itim' }}>
                                                        {isResolved ? 'risolta' : 'non risolta'}
                                                    </Text>
                                                    <FontAwesome
                                                        name={isResolved ? "check" : "times"}
                                                        size={16}
                                                        color="white"
                                                        style={{ marginRight: 6 }}
                                                    />
                                                </View>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    ))}
            </View>
        </ScrollView>
            </>
    );
}
