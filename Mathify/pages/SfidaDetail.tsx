import {ProfileStackParamList} from "../Component/navigation";
import {RouteProp, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {useContext} from "react";
import {StateContext} from "../Reducer";
import {useSetCurrentUser} from "../Component/setUser";
import {View} from "react-native";
import {styles} from "../Component/style";
import {Card, Icon, Text} from "react-native-paper";

export default function SfidaDetail({ route }: { route: RouteProp<ProfileStackParamList, 'SfidaDetail'> }) {
    const { sfida } = route.params;
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
    const [state] = useContext(StateContext);
    useSetCurrentUser("Utente1");
    return (
        <View style={styles.section}>
            <View style={styles.article}>
                <View style={styles.cardBase}>
                    <Card style={styles.card}>
                        <Card.Title title={sfida.id} />
                        <Card.Content>
                            <Text>punteggio {sfida.punteggio}</Text>
                            <Text style={styles.callout}>
                                <Icon size={20} source="star" color='white' />
                                <Text>{sfida.xpGuadagnati} XP non funziona</Text>
                                <Icon size={20} source="star" color='white' />
                            </Text>
                            <Text>Argomento: aggiornare interfaces</Text>
                            <Text>Data Completamento: aggiornare interfaces</Text>
                        </Card.Content>
                    </Card>
                </View>
            </View>
        </View>
    );
}