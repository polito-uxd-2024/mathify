import {FlatList, View} from "react-native";
import { styles } from "../App";
import { Appbar, Card, Text, Button } from "react-native-paper";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {ProfileStackParamList, RootStackParamList} from "../Component/navigation";
import {useSetCurrentUser} from "../Component/setUser";
import {StateContext} from "../Reducer";
import {useCallback, useContext} from "react";

export default function ProfilePage() {
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();

    const [state] = useContext(StateContext);

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
            <FlatList data={state.utente.sfideCompletate} renderItem={
                ({ item }) => (
                    <View style={styles.cardBase}>
                        <Card style={styles.card}>
                            <Card.Title title={item.titolo} />
                            <Card.Content>
                                <Text>{item.argomento}</Text>
                                <Text style={styles.callout}>
                                    <Text>{item.xp} XP</Text>
                                </Text>
                                <Text>{item.stringacompletamento}</Text>
                            </Card.Content>
                        </Card>
                    </View>
                )
            }/>
        </View>
    );
}