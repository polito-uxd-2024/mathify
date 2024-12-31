import { View } from "react-native";
import { styles } from "../App";
import { Appbar, Card, Text, Button } from "react-native-paper";
import {useNavigation} from "@react-navigation/native";

export default function ProfilePage() {
    const navigation = useNavigation();
    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title="Profile" />
            </Appbar.Header>
            <View >
                <Card >
                    <Card.Title title="Profile Information" />
                    <Card.Content>
                        <View>
                            <Text >Name: John Doe</Text>
                            <Text>Email:</Text>
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