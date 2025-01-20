import * as React from 'react';
import {View, Text, FlatList, TextComponent, Button, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Avatar, Card, Icon, MD3Colors} from 'react-native-paper';
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
    const sfideCompletate = state.utente.sfideCompletate.map(sfida => ({
        ...sfida,
        stringacompletamento: timeAgo(sfida.dataCompletamento.toISOString())
    }));
    return (
            <View style={styles.section}>
                {sfideCompletate.map((item) => (
                <TouchableOpacity key={item.id} style={styles.article} onPress={() => navigation.navigate("SfidaDetail", { sfida: item })}>
                    <View style={styles.cardBase}>
                        <Card style={styles.card}>
                            <View style={{ paddingBottom: 10, paddingRight: 10, paddingLeft: 10, width: '100%'}}>

                                    <View style={{flexDirection: 'row', marginBottom: 'auto', justifyContent: 'flex-end'}}>
                                        <View style={styles.stars}>
                                            {[...Array(3)].map((star, index) => (
                                                <Avatar.Icon
                                                    key={index}
                                                    icon="star"
                                                    size={20}
                                                    color={index < state.selectedChallenge.difficolta ? 'white' : 'black'} // Colore delle stelle
                                                />
                                            ))}
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.cardTitle}>{item.titolo}</Text>
                                        <Text style={styles.subtitle}>{item.argomento}</Text>
                                        <Text style={styles.subtitle}>{item.xpGuadagnati}</Text>
                                        <View style={[styles.row,{justifyContent: 'space-between'}]}>
                                            <Text style={styles.subtitle}>{item.punteggio}/{item.domande.length}</Text>
                                            <Text style={styles.subtitle}>{item.stringacompletamento}</Text>
                                        </View>
                                    </View>

                            </View>
                        </Card>
                    </View>
                </TouchableOpacity>
                ))}
            <FlatList
                data={sfideCompletate}
                keyExtractor={(item) => item.id}
                renderItem={({ item}) => (
                    <View style={styles.article}>
                        <View style={styles.cardBase}>
                            <Card style={styles.card}>
                                <Card.Title title={item.titolo} />
                                <Card.Content>
                                    <Text>titolo {item.id}</Text>
                                    <Text>punteggio {item.punteggio}</Text>
                                    <Text style={styles.callout}>
                                        <Icon size={20} source="star" color='white' />
                                        <Text>{item.xpGuadagnati}</Text>
                                        <Icon size={20} source="star" color='white' />
                                    </Text>
                                    <Text>Argomento: {item.argomento}</Text>
                                    <Text>Data Completamento: {item.dataCompletamento.toISOString()}</Text>
                                    <Text>Data Completamento: {item.stringacompletamento}</Text>
                                    <Button title={"Dettagli"} onPress={() => navigation.navigate("SfidaDetail", { sfida: item })} />
                                </Card.Content>
                            </Card>
                        </View>
                    </View>
                )}
            />
            </View>

    );
}

