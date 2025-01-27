import { StateContext } from "../Reducer";
import { useContext } from "react";
import {View, Text, ScrollView} from "react-native";
import {Card} from "react-native-paper";
import {styles} from "../Component/style";

export default function Segnalazioni() {
    const [state] = useContext(StateContext);

    return (
        <ScrollView style={styles.content}>
            <View style={styles.mainContent}>
                {state.utente.sfideCompletate
                    .filter((sfida) => sfida.segnalazioni && sfida.segnalazioni.length > 0)
                    .map((sfida, sfidaIndex) => (
                        <View key={`sfida-${sfidaIndex}`} style={styles.mainWhiteCard}>
                            <View>
                                <Text style={{fontSize: 25, fontWeight: "bold", marginLeft: 20, marginBottom:10 }}>
                                    {sfida.titolo}
                                </Text>

                                {sfida.segnalazioni.map((segnalazione, segnalazioneIndex) => (
                                    <View key={`segnalazione-${sfidaIndex}-${segnalazioneIndex}`} style={[styles.grayCard, {margin: 10}]}>
                                        <Text style={styles.welcomeText}>
                                            {segnalazioneIndex + 1}. Segnalazione
                                        </Text>
                                        <Text style={styles.calloutText}>
                                            Testo della domanda:
                                        </Text>
                                        <Text style={{ fontSize: 16, textAlign: 'center' }}>
                                            {segnalazione.domanda?.testo || "Domanda non disponibile"}
                                        </Text>
                                        <Text style={styles.calloutText}>
                                            Motivo della segnalazione:
                                        </Text>
                                        <Text style={{ fontSize: 16, textAlign: 'center' }}>
                                            {segnalazione.motivo || "Motivo non specificato"}
                                        </Text>
                                        <Text style={styles.calloutText}>
                                            Stato della segnalazione:
                                        </Text>
                                        <Text style={{ fontSize: 16, textAlign: 'center' }}>
                                            {Math.random() < 0.5 ? "Risolta" : "Non risolta"}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    ))}
            </View>
        </ScrollView>

    );
}
