import { StateContext } from "../Reducer";
import { useContext } from "react";
import { View, Text } from "react-native";

export default function Segnalazioni() {
    const [state] = useContext(StateContext);

    return (
        <View>
            <Text>Segnalazioni</Text>
            {state.utente.sfideCompletate
                .filter((sfida) => sfida.segnalazioni && sfida.segnalazioni.length > 0)
                .map((sfida, sfidaIndex) => (
                    <View key={`sfida-${sfidaIndex}`}>
                        <Text>{sfida.titolo}</Text>
                        {sfida.segnalazioni.map((segnalazione, segnalazioneIndex) => (
                            <View key={`segnalazione-${sfidaIndex}-${segnalazioneIndex}`}>
                                <Text>{segnalazione.domanda?.testo || "Domanda non disponibile"}</Text>
                                <Text>{segnalazione.motivo || "Motivo non specificato"}</Text>
                            </View>
                        ))}
                    </View>
                ))}
        </View>
    );
}
