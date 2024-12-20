import {View} from "react-native";
import {styles} from "../App";
import {Appbar, Card, Text} from "react-native-paper";

export default function ProfilePage(){
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
                </Card>
            </View>
        </View>
        )
}