import * as React from 'react';
import {View, Text, FlatList, TextComponent} from 'react-native';
import {Card, Icon, MD3Colors} from 'react-native-paper';
import {styles} from "../Component/style";
import {timeAgo} from "../Component/timeago";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {ProfileStackParamList} from "../Component/navigation";
import {useContext} from "react";
import {StateContext} from "../Reducer";
import {useSetCurrentUser} from "../Component/setUser";


export default function SfideCompletate() {
    /*
    const sfideCompletate = [
        { id: 'Sfida1', titolo: 'Circonferenze', argomento: 'Geometria Analitica', difficolta: 1, tempoimpiegato: 234, xp: 600, datacompletamento: "2025-01-04T14:26:19.138975" },
        { id: 'Sfida2', titolo: 'Equazioni di secondo grado', argomento: 'Algebra', difficolta: 2, tempoimpiegato: 234, xp: 230, datacompletamento: "2025-01-04T14:26:19.138975" },
        { id: 'Sfida3', titolo: 'Parabole', argomento: 'Geometria Analitica', difficolta: 3, tempoimpiegato: 234, xp: 550, datacompletamento: "2025-01-04T14:26:19.138975" },
        { id: 'Sfida4', titolo: 'Integrali notevoli', argomento: 'Integrali', difficolta: 4, tempoimpiegato: 234, xp: 670, datacompletamento: "2025-01-04T14:26:19.138975" },
        { id: 'Sfida5', titolo: 'Integrali impropri', argomento: 'Integrali', difficolta: 5, tempoimpiegato: 234, xp: 120, datacompletamento: "2025-01-04T14:26:19.138975" },
    ].map(sfida => ({
        ...sfida,
        stringacompletamento: timeAgo(sfida.datacompletamento)
    }));
    */
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
    const [state] = useContext(StateContext);
    useSetCurrentUser("Utente1");
    const sfideCompletate = state.utente.sfideCompletate
    return (
            <View style={styles.section}>
            <FlatList
                data={sfideCompletate}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.article}>
                        <View style={styles.cardBase}>
                            <Card style={styles.card}>
                                <Card.Title title={item.id} />
                                <Card.Content>
                                    <Text>punteggio {item.punteggio}</Text>
                                    <Text style={styles.callout}>
                                        <Icon size={20} source="star" color='white' />
                                        <Text>{item.xpGuadagnati} XP non funziona</Text>
                                        <Icon size={20} source="star" color='white' />
                                    </Text>
                                    <Text>Argomento: aggiornare interfaces</Text>
                                    <Text>Data Completamento: aggiornare interfaces</Text>
                                </Card.Content>
                            </Card>
                        </View>
                    </View>
                )}
            />
            </View>

    );
}

