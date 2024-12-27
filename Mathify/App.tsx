import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {MD3LightTheme as DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import PlayScreen from './pages/PlayScreen';
import HomeScreen from './pages/HomeScreen';
import Classe from './pages/Classe';
import Materiale from './pages/Materiale';
import Navigation from "./navigation";

import { db } from './Firebase';
import {ref, get} from "firebase/database";
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
    const [Name, setName] = useState('');

    useEffect(() => {
        // Funzione per ottenere il nome dell'utente con id 'Utente1'
        const fetchName = async () => {
            try {

                const userRef = ref(db, 'Utenti/Utente1');  // Riferimento al nodo dell'utente1
                const snapshot = await get(userRef);  // Leggi i dati dal nodo
                if (snapshot.exists()) {
                    // Se i dati esistono, imposta il nome
                    setName(snapshot.val().Nome);  // Estrai il nome dell'utente
                    console.log("Trovato") //da togliere
                } else {
                    console.log("Utente non trovato");
                }
            } catch (error) {
                console.error("Errore nel recupero dei dati: ", error);
            }
        };

        fetchName();
    }, []);
    return (
        <PaperProvider theme={theme}>
            <Navigation/>
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