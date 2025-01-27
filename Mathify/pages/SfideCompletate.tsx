import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { styles } from "../Component/style";
import { timeAgo } from "../Component/timeago";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import { HomeStackParamList } from "../Component/navigation";
import { useContext } from "react";
import { StateContext } from "../Reducer";
import { useSetCurrentUser } from "../Component/setUser";
import moment from 'moment';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { myTheme } from "../Component/theme";
import { FontAwesome } from "react-native-vector-icons";

export default function SfideCompletate() {
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    const [state] = useContext(StateContext);
    useSetCurrentUser("Utente1");

    const sfideCompletate = state.utente.sfideCompletate.map(sfida => ({
        ...sfida,
        stringacompletamento: timeAgo(sfida.dataCompletamento.toISOString())
    }));

    const today = moment().startOf('day');
    const sevenDaysAgo = moment().subtract(7, 'days').startOf('day');

    const sfideOggi = sfideCompletate.filter(sfida => moment(sfida.dataCompletamento).isSame(today, 'day'));
    const sfideSettimana = sfideCompletate.filter(sfida => moment(sfida.dataCompletamento).isBetween(sevenDaysAgo, today, 'day', '[]') && !moment(sfida.dataCompletamento).isSame(today, 'day'));
    const sfideRimanenti = sfideCompletate.filter(sfida => !sfideOggi.includes(sfida) && !sfideSettimana.includes(sfida));

    const renderCard = (item) => (
        <TouchableOpacity key={item.dataCompletamento.toISOString()} style={styles.article} onPress={() => navigation.navigate("SfidaDetail", { sfida: item })}>
            <View style={styles.cardBase}>
                <Card style={styles.card}>
                    <View style={{ paddingBottom: 10, paddingRight: 10, paddingLeft: 10, width: '100%' }}>
                        <View style={{ flexDirection: 'row', marginBottom: 'auto', justifyContent: 'flex-end' }}>
                            <View style={styles.stars}>
                                {[...Array(3)].map((star, index) => (
                                    <FontAwesome
                                        key={index}
                                        name="star"
                                        size={20}
                                        color={index < state.selectedChallenge.difficolta ? 'gold' : 'rgba(255,255,255,0.5)'}
                                    />
                                ))}
                            </View>
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>{item.titolo}</Text>
                            <Text style={styles.subtitle}>{item.argomento}</Text>
                            <Text style={styles.subtitle}>
                                <FontAwesome
                                    name="check"
                                    size={16}
                                    color={myTheme.colors.primary}
                                />
                                <View style={{ width: 5 }} />
                                <Text style={{ fontWeight: 'bold' }}>{item.punteggio}</Text>/{item.domande.length} corrette
                            </Text>
                            <View style={[styles.row, { marginTop: 10, justifyContent: 'space-between' }]}>
                                <View style={[styles.calloutXp, { backgroundColor: myTheme.colors.blue }]}>
                                    <MaterialCommunityIcons
                                        name="star-four-points"
                                        size={18}
                                        color="gold"
                                    />
                                    <Text style={[styles.calloutText, { color: 'white' }]}>
                                        {item.xpGuadagnati} XP
                                    </Text>
                                    <MaterialCommunityIcons
                                        name="star-four-points"
                                        size={18}
                                        color="gold"
                                    />
                                </View>
                                <Text style={styles.secondary}>
                                    <FontAwesome
                                        name="clock-o"
                                        size={16}
                                    />
                                    <View style={{ width: 5 }} />
                                    {item.stringacompletamento}</Text>
                            </View>
                        </View>
                    </View>
                </Card>
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            {sfideOggi.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.welcomeText}>
                        Oggi
                        <View style={{ width: 5 }} />
                        <FontAwesome
                            name="calendar"
                            size={20}
                        />
                    </Text>
                    {sfideOggi.reverse().map(renderCard)}
                </View>
            )}

            {sfideSettimana.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.welcomeText}>
                        Questa Settimana
                        <View style={{ width: 5 }} />
                        <FontAwesome
                            name="calendar"
                            size={20}
                        />
                    </Text>
                    {sfideSettimana.reverse().map(renderCard)}
                </View>
            )}

            {sfideRimanenti.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.welcomeText}>
                        Tutte le sfide
                        <View style={{ width: 5 }} />
                        <FontAwesome
                            name="calendar"
                            size={20}
                        />
                    </Text>
                    {sfideRimanenti.reverse().map(renderCard)}
                </View>
            )}
        </View>
    );
}