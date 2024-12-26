import { View } from "react-native";
import { styles } from "../App";
import { Appbar, Card, Text, Button } from "react-native-paper";
import {useNavigation} from "@react-navigation/native";

export default function ProfilePage() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Profile" />
            </Appbar.Header>
            <View style={styles.content}>
                <Card style={styles.card}>
                    <Card.Title title="Profile Information" />
                    <Card.Content>
                        <View>
                            <Text style={styles.questionText}>Name: John Doe</Text>
                            <Text style={styles.questionText}>Email:</Text>
                        </View>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => {
                            navigation.navigate("Impostazioni");
                        }}>
                            Impostazioni
                        </Button>
                    </Card.Actions>
                </Card>
            </View>
        </View>
    );
}