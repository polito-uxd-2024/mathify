import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Appbar, Card, Button, Text, TextInput, Avatar } from "react-native-paper";
import { styles } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";

export default function HomeScreen({navigation }: { navigation: StackNavigationProp<any> }) {
    return (
        <ScrollView style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Mathify" />
            </Appbar.Header>
            <View style={styles.content}>
                <Text style={styles.welcomeText}>Welcome to Our App!</Text>
                <Text style={styles.subText}>We are glad to have you here.</Text>
                <Card style={styles.card}>
                    <Card.Title title="Get Started" left={(props) => <Avatar.Icon {...props} icon="play-circle" />} />
                    <Card.Content>
                        <TextInput
                            label="Enter your name"
                            mode="outlined"
                            style={styles.input}
                        />
                    </Card.Content>
                    <Card.Actions>
                        <Button mode="contained" onPress={() => alert('Get Started Button Pressed!')}>
                            Get Started
                        </Button>
                    </Card.Actions>
                </Card>

                <Card style={styles.card}>
                    <Card.Title title="Play" left={(props) => <Avatar.Icon {...props} icon="gamepad-variant" />} />
                    <Card.Actions>
                        <Button mode="contained" onPress={() => navigation.navigate('Play')}>
                            Play
                        </Button>
                    </Card.Actions>
                </Card>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('Classe')}>
                    <Text style={styles.footerText}>Classe</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Materiale')}>
                    <Text style={styles.footerText}>Materiale</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}