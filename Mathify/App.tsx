import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {MD3LightTheme as DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import PlayScreen from './pages/PlayScreen';
import HomeScreen from './pages/HomeScreen';
import Classe from './pages/Classe';
import Materiale from './pages/Materiale';

export const Stack = createStackNavigator();


const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        secondary: 'yellow',
    },
};


export default function App() {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Play" component={PlayScreen} />
                    <Stack.Screen name="Classe" component={Classe} />
                    <Stack.Screen name="Materiale" component={Materiale} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subText: {
        fontSize: 20,
        marginBottom: 20,
    },
    card: {
        marginVertical: 10,
        width: '90%',
    },
    input: {
        marginBottom: 10,
    },
    footer: {
        padding: 20,

        alignItems: 'center',
    },
    footerText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        marginVertical: 5,
    },
    questionText: {
        fontSize: 20,
        marginBottom: 20,
    },
    answerButton: {
        marginVertical: 5,
    },
    progressBar: {
        flex: 1,
        marginHorizontal: 10,
    },
});