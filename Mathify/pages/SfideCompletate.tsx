import * as React from 'react';
import {View, Text, FlatList, TextComponent, Button, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Avatar, Card, Icon, MD3Colors} from 'react-native-paper';
import {styles} from "../Component/style";
import {timeAgo} from "../Component/timeago";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {HomeStackParamList, ProfileStackParamList} from "../Component/navigation";
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
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    const [state] = useContext(StateContext);
    useSetCurrentUser("Utente1");
    const sfideCompletate = state.utente.sfideCompletate.map(sfida => ({
        ...sfida,
        stringacompletamento: timeAgo(sfida.dataCompletamento.toISOString())
    }));
    return (
            <View style={styles.section}>
                {sfideCompletate.reverse().map((item) => (
                <TouchableOpacity key={item.dataCompletamento.toISOString()} style={styles.article} onPress={() => navigation.navigate("SfidaDetail", { sfida: item })}>
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
                                        <Text style={styles.callout}>
                                            <Icon size={16} source="star" color='white' />
                                            <Text style={{color: 'white', fontWeight: 'bold'}}>{item.xpGuadagnati} XP</Text>
                                            <Icon size={16} source="star" color='white' />
                                        </Text>
                                        <View style={[styles.row,{justifyContent: 'space-between'}]}>
                                            <Text style={styles.subtitle}>{item.punteggio}/{item.domande.length} corrette</Text>
                                            <Text style={styles.secondary}>{item.stringacompletamento}</Text>
                                        </View>
                                    </View>

                            </View>
                        </Card>
                    </View>
                </TouchableOpacity>
                ))}

            </View>

    );
}

