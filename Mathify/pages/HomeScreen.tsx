import React from "react";
import { View, ScrollView } from "react-native";
import { Appbar, Card, Button, Text, TextInput, Avatar, BottomNavigation } from "react-native-paper";
import { styles } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";
import Classe from "./Classe";
import Materiale from "./Materiale";

export default function HomeScreen({ navigation }: { navigation: StackNavigationProp<any> }) {
    const [index, setIndex] = React.useState(0);

    const ClasseRoute = Classe
        ;
    ;

    const MaterialeRoute = Materiale
    ;

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
            <View>
                <BottomNavigation
                    navigationState={{ index: index, routes: [
                            { key: 'classe', title: 'Classe', icon: 'school' },
                            { key: 'materiale', title: 'Materiale', icon: 'book' },
                        ] }}
                    onIndexChange={setIndex}
                    renderScene={BottomNavigation.SceneMap({
                        classe: ClasseRoute,
                        materiale: MaterialeRoute,
                    })}
                />
            </View>
        </ScrollView>
    );
}