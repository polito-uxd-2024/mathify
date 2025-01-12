import {styles} from "./style";
import {Card, Text} from "react-native-paper";
import {View} from "react-native";

export default function BadgeList(){
    return (
        <View style={styles.section}>
            <View style={styles.article}>
                <View style={styles.cardBase}>
                    <Card style={styles.card}>
                        <Card.Title title="Badge" />
                        <Card.Content>
                            <Text>Badge: aggiornare interfaces</Text>
                            <Text>Argomento: aggiornare interfaces</Text>
                            <Text>Data Completamento: aggiornare interfaces</Text>
                        </Card.Content>
                    </Card>
                </View>
            </View>
        </View>
    );
}