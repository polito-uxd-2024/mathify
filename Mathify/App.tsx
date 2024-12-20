import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import PlayScreen from "./PlayScreen";
import HomeScreen from "./HomeScreen";

export const Stack = createStackNavigator();





export default function App() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Play" component={PlayScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        padding: 10,
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 16,
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