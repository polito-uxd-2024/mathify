import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';

//importa pagine
import PlayScreen from './pages/PlayScreen';
import HomeScreen from './pages/HomeScreen';
import Classe from './pages/Classe';
import Materiale from './pages/Materiale';

// Importa il database e le azioni necessarie per utilizzarlo
import { db } from './Firebase';
import {ref, get} from "firebase/database";

export const Stack = createStackNavigator();

export default function App() {

    //ESEMPIO LETTURA DATABASE
    //ottengo il nome dell' "utente1"

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
        <PaperProvider>
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
        padding: 20,
        backgroundColor: '#6200ee',
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