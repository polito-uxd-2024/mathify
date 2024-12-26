import React from "react";
import { View, ScrollView, Pressable } from "react-native";
import { Appbar, Card, Button, Text, TextInput, Avatar } from "react-native-paper";
import { styles } from "../App";
import { useNavigation } from "@react-navigation/native";
import PlayScreen from "./PlayScreen";

export default function HomeScreen() {
    const { navigate } = useNavigation();
    return (
        <ScrollView style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Mathify" />
            </Appbar.Header>
            <View style={styles.content}>


                <Card style={styles.card}>
                    <Card.Title title="Play" left={(props) => <Avatar.Icon icon="gamepad-variant" size={props.size} />} />
                    <Card.Actions>
                        <Button onPress={() => {
                            navigate("Play")
                        }}>
                            Play
                        </Button>
                    </Card.Actions>
                </Card>
            </View>
        </ScrollView>
    );
}