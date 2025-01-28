import { ProfileStackParamList } from "../Component/navigation";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/native-stack";
import React, { useContext, useState } from "react";
import { StateContext } from "../Reducer";
import { useSetCurrentUser } from "../Component/setUser";
import { Animated, Image, ScrollView, TouchableOpacity, View } from "react-native";
import { styles } from "../Component/style";
import { Card, Divider, Icon, ProgressBar, Text } from "react-native-paper";
import Collapsible from "react-native-collapsible";
import { myTheme } from "../Component/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {FontAwesome} from "react-native-vector-icons";



import * as Progress from 'react-native-progress';

export default function SfidaDetail({ route }: { route: RouteProp<ProfileStackParamList, "SfidaDetail"> }) {
    const { sfida } = route.params;
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
    const [state] = useContext(StateContext);
    useSetCurrentUser("Utente1");
    const totalQuestions = sfida.domande.length;
    const progress = sfida.punteggio / totalQuestions;
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <ScrollView>
            <View style={[styles.cover, { backgroundColor: 'white', paddingBottom: 20 }]}>
                <Image source={require("../assets/placeholder.jpg")} style={styles.coverImage} />
                <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.cardTitle}>{sfida.titolo}</Text>
                        <View style={[styles.stars, {backgroundColor: 'transparent'}]}>
                            {[...Array(3)].map((star, index) => (
                                <FontAwesome
                                    key={index}
                                    name="star"
                                    size={20}
                                    color={index < state.selectedChallenge.difficolta ? 'gold' : myTheme.colors.gray}
                                />
                            ))}
                        </View>
                    </View>
                    <Text style={styles.subtitle}>{sfida.argomento}</Text>
                    <Text style={styles.subtitle}>
                        <FontAwesome
                            name="check"
                            size={16}
                            color={myTheme.colors.primary}
                        />
                        <View style={{ width: 5 }} />
                        <Text style={{ fontWeight: 'bold' }}>{sfida.punteggio}</Text>/{sfida.domande.length} corrette
                    </Text>
                    <View style={[styles.row, { marginTop: 10, justifyContent: 'space-between' }]}>
                        <View style={[styles.calloutXp, { backgroundColor: myTheme.colors.blue }]}>
                            <MaterialCommunityIcons
                                name="star-four-points"
                                size={18}
                                color="gold"
                            />
                            <Text style={[styles.calloutText, { color: 'white' }]}>
                                {sfida.xpGuadagnati} XP
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
                            {sfida.stringacompletamento}</Text>
                    </View>




                <View style={{ paddingTop: 20}}>
                    <ProgressBar
                        style={styles.progressBar} // Cambia l'altezza se necessario
                        progress={progress}
                        color={myTheme.colors.rightAnswer} // Colore della barra completata
                    />
                    <Text style={{ alignSelf: "center" }}>{(progress * 100).toFixed(0).toString()}% corretta</Text>
                </View>
            </View>
            <View style={[styles.mainContent, {paddingVertical: 30}]}>
                {sfida.domande.map((valore, index) => (
                    <View style={styles.article} key={index}>
                        <View style={styles.cardBase}>
                            <Card style={{ borderRadius: 20, backgroundColor: myTheme.colors.cardBorder }} onPress={()=>toggleExpand(index)}>
                                <View style={[styles.card, { paddingBottom: 15 }]}>
                                    <Card.Content >
                                        <View style={{ flexDirection: "row", alignItems: "flex-start", paddingTop:15 }}>
                                            <Text style={{fontSize: 16, marginRight: 8, fontWeight: 'bold'}}>{index + 1}</Text>
                                            <Text style={{ fontSize: 16 }}>{valore.Testo}</Text>
                                        </View>
                                        <View>
                                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                                <View
                                                    style={[
                                                        styles.callout,
                                                        {
                                                            marginTop: 6,
                                                            backgroundColor:
                                                                valore.correttezza === true
                                                                    ? myTheme.colors.rightAnswer
                                                                    : myTheme.colors.wrongAnswer,
                                                        },
                                                    ]}
                                                >
                                                    <Text style={{paddingHorizontal: 6, color :'white', fontWeight: 'bold', fontFamily: 'Itim'}}>
                                                        {valore.correttezza ? 'corretta' : 'sbagliata'}
                                                    </Text>
                                                    <FontAwesome
                                                        name={valore.correttezza ? "check" : "times"}
                                                        size={16}
                                                        color="white"
                                                        style={{ marginRight: 6 }}
                                                    />

                                                </View>
                                            </View>
                                        </View>
                                    </Card.Content>
                                </View>
                                    <Collapsible collapsed={expandedIndex !== index}>
                                        <View style={[styles.card, { padding: 15 }]}>

                                            {state.selectedChallenge.questions[index].Risposte.map((risposta, index2) => (
                                                <View key={index2} style={{marginVertical: 8, padding: 8, borderRadius: 10,
                                                    backgroundColor: risposta === state.selectedChallenge.questions[index].Soluzione
                                                        ? (risposta === state.selectedChallenge.questions[index].Soluzione ? myTheme.colors.rightAnswer : myTheme.colors.wrongAnswer)
                                                        : 'rgb(245,245,245)'}}>
                                                    <Text style={{fontSize: 16, alignSelf:"center"}}>{risposta}</Text>
                                                    {state.selectedChallenge.questions[index].GraficList.length > 1 && (
                                                        <Image
                                                            source={{ uri: state.selectedChallenge.questions[index].GraficList[index2] }}
                                                            style={{
                                                                width: 150,
                                                                height: 150,
                                                                marginTop: 8,
                                                                borderRadius: 4,
                                                                alignSelf: "center"
                                                            }}
                                                        />
                                                    )}

                                                </View>
                                            ))}
                                            <View style={{ paddingTop: 10 }}>
                                                <Text style={styles.sectionText}>Spiegazione</Text>
                                                {state.selectedChallenge.questions[index].GraficList.length === 1 && (
                                                    <Image
                                                        source={{ uri: state.selectedChallenge.questions[index].GraficList[0] }}
                                                        style={{
                                                            width: 200,
                                                            height: 200,
                                                            margin: 8,
                                                            borderRadius: 4,
                                                            alignSelf: "center"
                                                        }}
                                                    />
                                                )}
                                                <Text>{valore.Spiegazione}</Text>
                                            </View>
                                        </View>
                                    </Collapsible>

                            </Card>
                        </View>
                    </View>
                ))}
            </View>
            </View>   );
        </ScrollView>)
}
