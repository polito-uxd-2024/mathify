import { MaterialeStackParamList } from "../Component/navigation";
import { RouteProp } from "@react-navigation/native";
import { View, Image, StyleSheet } from "react-native";
import { Text, Card } from "react-native-paper";

export default function MaterialeDetail({ route }: { route: RouteProp<MaterialeStackParamList, 'MaterialeDetail'> }) {
    const { Materiale } = route.params;

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title={Materiale.title} />
                <Card.Content>
                    <Text style={styles.description}>{Materiale.description}</Text>
                    {Materiale.image && (
                        <Image
                            source={{ uri: Materiale.image }}
                            style={styles.image}
                        />
                    )}
                    <Text>{Materiale.longDescription}</Text>
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    card: {
        borderRadius: 8,
    },
    description: {
        marginBottom: 16,
    },
    image: {
        height: 150,
        borderRadius: 8,
    },
});