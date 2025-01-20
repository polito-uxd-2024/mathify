import { StateContext } from "../Reducer";
import { useContext } from "react";
import {View, Text, ScrollView} from "react-native";
import {Card} from "react-native-paper";

export default function Segnalazioni() {
    const [state] = useContext(StateContext);

    return (
        <ScrollView>
            <View>
                {state.utente.sfideCompletate
                    .filter((sfida) => sfida.segnalazioni && sfida.segnalazioni.length > 0)
                    .map((sfida, sfidaIndex) => (
                        <View key={`sfida-${sfidaIndex}`}>
                            <Card style={{  padding: 16, borderRadius: 10, width: '80%', alignSelf: 'center',marginTop:10 }}>
                                <Text style={{fontSize: 25, fontWeight: "bold", marginLeft: 20 }}>
                                    {sfida.titolo}
                                </Text>

                                {sfida.segnalazioni.map((segnalazione, segnalazioneIndex) => (
                                    <View key={`segnalazione-${sfidaIndex}-${segnalazioneIndex}`}>
                                        <Text style={{ fontSize: 16, textAlign: 'center', marginVertical: 20, fontWeight: "bold" }}>
                                            Testo della domanda:
                                        </Text>
                                        <Text style={{ fontSize: 16, textAlign: 'center' }}>
                                            {segnalazione.domanda?.testo || "Domanda non disponibile"}
                                        </Text>
                                        <Text style={{ fontSize: 16, textAlign: 'center', marginVertical: 20,fontWeight: "bold" }}>
                                            Motivo della segnalazione:
                                        </Text>
                                        <Text style={{ fontSize: 16, textAlign: 'center' }}>
                                            {segnalazione.motivo || "Motivo non specificato"}
                                        </Text>
                                    </View>
                                ))}
                            </Card>
                        </View>
                    ))}
            </View>
        </ScrollView>

    );
}
