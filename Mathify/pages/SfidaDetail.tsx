import {ProfileStackParamList} from "../Component/navigation";
import {RouteProp, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import React, {useContext, useState} from "react";
import {StateContext} from "../Reducer";
import {useSetCurrentUser} from "../Component/setUser";
import {Animated, Image, ScrollView, TouchableOpacity, View} from "react-native";
import {styles} from "../Component/style";
import {Card, Divider, Icon, ProgressBar, Text} from "react-native-paper";
import Collapsible from "react-native-collapsible";
import {myTheme} from "../Component/theme";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function SfidaDetail({ route }: { route: RouteProp<ProfileStackParamList, 'SfidaDetail'> }) {
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
        <ScrollView >
            <View style={[styles.cover, {backgroundColor: myTheme.colors.cardBorder, marginBottom: 20}]}>
                <Image source={require('../assets/placeholder.jpg')} style={styles.coverImage}/>
                <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={styles.welcomeText}>{sfida.titolo}</Text>
                    <Text style={{fontWeight: 'bold'}}>{sfida.stringacompletamento}</Text>

                </View>
                <Text style={styles.subtitle}>{sfida.argomento}</Text>
                <Text style={[styles.callout, {backgroundColor: 'white', marginTop: 10}]}>
                    <Icon size={16} source="star" color={myTheme.colors.primary} />
                    <Text style={{color: myTheme.colors.primary, fontWeight: 'bold'}}>{sfida.xpGuadagnati} XP</Text>
                    <Icon size={16} source="star" color={myTheme.colors.primary} />
                </Text>
                <View style={{paddingTop: 15}}>
                    <ProgressBar
                        style={styles.progressBar} // Cambia l'altezza se necessario
                        progress={progress}
                        color={myTheme.colors.rightAnswer} // Colore della barra completata
                    />
                    <Text style={{alignSelf: 'center'}}>{(progress * 100).toFixed(0).toString()}% corretta</Text>
                </View>

            </View>
            {/*
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <View style={styles.bookmark}>
                    <Text style={styles.callout}>
                        <Icon size={20} source="star" color={myTheme.colors.primary} />
                        <Text style={styles.calloutText}>{sfida.xpGuadagnati} XP</Text>
                        <Icon size={20} source="star" color={myTheme.colors.primary} />
                    </Text>
                </View>
            </View>*/}
            <View style={styles.mainContent}>
                {sfida.domande.map((valore, index) => (


                            <View style={styles.article}>
                                <View style={styles.cardBase}>
                                    <Card key={index} style={{borderRadius: 20, backgroundColor: myTheme.colors.cardBorder}}>
                                        <Card.Content style={[styles.card, {paddingBottom: 15, }]}>
                                            <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
                                                <Text style={{fontSize: 16, marginRight: 8, fontWeight: 'bold'}}>{index+1}</Text>
                                                <Text style={{fontSize: 16}}>{valore.Testo}</Text>
                                            </View>
                                            <View>
                                                <View style={{flexDirection: 'row',justifyContent: 'center', alignItems: 'center'}}>
                                                    <View style={[styles.callout, {marginTop: 6, backgroundColor: valore.correttezza === true ? myTheme.colors.rightAnswer : myTheme.colors.wrongAnswer }]}>
                                                        <Text style={{paddingHorizontal: 6}}>{valore.correttezza === true  ? 'corretta' : 'sbagliata'}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </Card.Content>
                                        <TouchableOpacity onPress={() => toggleExpand(index)}
                                                          style={{
                                                              flex: 1,
                                                              paddingTop: 0, paddingBottom: 10,
                                                              backgroundColor: myTheme.colors.cardBorder,
                                                              alignItems: 'flex-end',
                                                              borderBottomLeftRadius: 20, borderBottomRightRadius: 20
                                                          }}>
                                            <Text style={{color: myTheme.colors.primary, paddingRight: 30, fontWeight: 'bold'}}>
                                                {expandedIndex === index ?
                                                    <MaterialCommunityIcons
                                                        name="eye-off"
                                                        size={24}
                                                        color="black"
                                                    /> :
                                                    <MaterialCommunityIcons
                                                        name="eye"
                                                        size={24}
                                                        color="black"
                                                    />
                                                }
                                            </Text>
                                        </TouchableOpacity>
                                        <Collapsible collapsed={expandedIndex !== index} >
                                            <View style={[styles.card, {padding: 15}]}>
                                                <Divider />

                                                {state.selectedChallenge.questions[index].Risposte.map((risposta, index2) => (
                                                    <View key={index2}>
                                                        <View style={{marginVertical: 8, padding: 8, borderRadius: 10,
                                                            backgroundColor:
                                                                risposta === valore.RispostaData
                                                                    ? (risposta === valore.Soluzione ? myTheme.colors.rightAnswer : myTheme.colors.wrongAnswer)
                                                                    : 'rgb(245,245,245)'}}>
                                                            <Text style={{fontSize: 16}}>{risposta}</Text>
                                                        </View>
                                                        <Divider />
                                                    </View>
                                                ))}
                                                <View style={{paddingTop: 10}}>
                                                    <Text style={styles.sectionText}>Spiegazione</Text>
                                                    <Text>{valore.Spiegazione}</Text>
                                                </View>
                                            </View>
                                        </Collapsible>
                                    </Card>
                                </View>
                            </View>))};
            </View></ScrollView>)};



