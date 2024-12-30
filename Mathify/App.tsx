import React, { useEffect, useReducer, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigation from './navigation';
import {InitialState, Reducer, StateContext} from "./Reducer";




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
        <StateContext.Provider value={useReducer(Reducer, InitialState)}>
            <PaperProvider theme={theme}>
                <Navigation />
            </PaperProvider>
        </StateContext.Provider>
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
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});