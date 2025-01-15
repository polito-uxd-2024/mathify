import {ProfileStackParamList} from "../Component/navigation";
import {RouteProp, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {useContext, useState} from "react";
import {StateContext} from "../Reducer";
import {useSetCurrentUser} from "../Component/setUser";
import {Image, ScrollView, TouchableOpacity, View} from "react-native";
import {styles} from "../Component/style";
import {Card, Divider, Icon, ProgressBar, Text} from "react-native-paper";
import Collapsible from "react-native-collapsible";

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
        <ScrollView>
            <Image source={require('../assets/placeholder.jpg')} style={styles.coverImage}/>
            <View style={styles.cover}>
                <View style={{flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'space-between'}}>
                    <Text style={styles.sectionText}>Titolo (non fetcha)</Text>
                    <Text>{sfida.stringacompletamento}</Text>
                </View>
                <Text style={styles.subtitle}>{sfida.argomento}</Text>
                <ProgressBar
                    style={{ height: 10 }} // Cambia l'altezza se necessario
                    progress={progress}
                    color="green" // Colore della barra completata
                />
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
            <View style={styles.content}>
                {sfida.domande.map((valore, index) => (
                    console.log(valore.RispostaCorretta, valore.Testo),
                        <View style={styles.article} key={index}>
                            <View style={styles.cardBase}>
                                <Card style={styles.card}>
                                    <Card.Title title={valore.Testo} />
                                    <Card.Content>
                                        <TouchableOpacity onPress={() => toggleExpand(index)}>
                                            <Text>Show Details</Text>
                                        </TouchableOpacity>
                                        <Collapsible collapsed={expandedIndex !== index}>
                                            <Text>{valore.correttezza.toString()}</Text>
                                            <Text>Comunque alla fine come facciamo a capire se il grafico è nelle domande o nelle risposte?</Text>
                                            {valore.Risposte.map((risposta, idx) => (
                                                <View key={idx} style={styles.answerCardBase}>
                                                    <View style={styles.answerCard}>
                                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                            <Image source={require('../assets/placeholder.jpg')} style={{width: 80, height: 80, marginRight: 10}}/>
                                                            <Text>Non fetcha la rispo e manca interfaccia grafico</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            ))}
                                            <Divider />
                                            <View style={styles.section}>
                                                <Text style={styles.sectionText}>Spiegazione</Text>
                                                <Text>Qui metterei la spiegazione ma bisogna mettere l'interfaccia a questionDone</Text>
                                            </View>
                                        </Collapsible>
                                    </Card.Content>
                                </Card>
                            </View>
                        </View>
                ))
                }
            </View>
        </ScrollView>
    );
}