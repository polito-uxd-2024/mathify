import {ProfileStackParamList} from "../Component/navigation";
import {RouteProp, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {useContext, useState} from "react";
import {StateContext} from "../Reducer";
import {useSetCurrentUser} from "../Component/setUser";
import {Animated, Image, ScrollView, TouchableOpacity, View} from "react-native";
import {styles} from "../Component/style";
import {Card, Divider, Icon, ProgressBar, Text} from "react-native-paper";
import Collapsible from "react-native-collapsible";
import {myTheme} from "../Component/theme";

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
            <View style={styles.cover}>
                <Image source={require('../assets/placeholder.jpg')} style={styles.coverImage}/>
                <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={styles.welcomeText}>{sfida.titolo}</Text>
                    <Text style={{fontWeight: 'bold'}}>{sfida.stringacompletamento}</Text>
                </View>
                <Text style={styles.subtitle}>{sfida.argomento}</Text>
                <View style={{paddingTop: 15}}>
                    <ProgressBar
                        style={styles.progressBar} // Cambia l'altezza se necessario
                        progress={progress}
                        color={myTheme.colors.rightAnswer} // Colore della barra completata
                    />
                    <Text style={{alignSelf: 'center'}}>{progress.toString().substring(2)}% corretta</Text>
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <View style={styles.bookmark}>
                    <Text style={styles.callout}>
                        <Icon size={20} source="star" color='white' />
                        <Text style={styles.calloutText}>{sfida.xpGuadagnati} XP</Text>
                        <Icon size={20} source="star" color='white' />
                    </Text>
                </View>
            </View>
            <View style={styles.mainContent}>
                {sfida.domande.map((valore, index) => (
                    <View style={styles.article} key={index}>
                        <View style={styles.cardBase}>
                            <Card style={styles.card}>

                                <Card.Content>
                                    <Text style={{fontSize: 16}}>{valore.Testo}</Text>
                                    <View style={[styles.callout, {marginTop: 6, backgroundColor: valore.correttezza === false ? myTheme.colors.wrongAnswer : myTheme.colors.rightAnswer }]}>
                                     <Text style={{paddingHorizontal: 6}}>{valore.correttezza === false ? 'sbagliata' : 'corretta'}</Text>
                                    </View>
                                        <TouchableOpacity onPress={() => toggleExpand(index)}>
                                        <Text style={{paddingTop: 6, color: myTheme.colors.primary}}>
                                            {expandedIndex === index ? "Nascondi Dettagli ˄" : "Mostra Dettagli ˅"}
                                        </Text>
                                    </TouchableOpacity>
                                    <Collapsible collapsed={expandedIndex !== index}>
                                        <View style={{paddingTop: 10}}>
                                        <Divider />
                                        {valore.Risposte.map((risposta, index2) => (
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
                                </Card.Content>
                            </Card>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}