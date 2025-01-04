import React, {ReducerState, useReducer, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigation from './Component/navigation';
import {InitialState, Reducer, StateContext} from "./Reducer";
import {State} from "react-native-paper/lib/typescript/components/TextInput/types";
import {CombinedDarkTheme, CombinedDefaultTheme} from "./Component/theme";
import {PreferencesContext} from "./Component/PreferencesContext";
import {DarkTheme} from "@react-navigation/native";





export default function App() {

    const [isThemeDark, setIsThemeDark] = React.useState(false);

    let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

    const toggleTheme = React.useCallback(() => {
        return setIsThemeDark(!isThemeDark);
    }, [isThemeDark]);

    const preferences = React.useMemo(
        () => ({
            toggleTheme,
            isThemeDark,
        }),
        [toggleTheme, isThemeDark]
    );


    return (


                <StateContext.Provider value={useReducer(Reducer, InitialState)}>
                    <PreferencesContext.Provider value={preferences}>
                        <Navigation />
                    </PreferencesContext.Provider>
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
    cardBase: {
        flex: 1,
        width: '100%',
        backgroundColor: 'gray',
        paddingHorizontal: 8,
        paddingTop: 8,
        paddingBottom: 16,
        borderRadius: 15,
        marginVertical: 6,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
    },
    callout: {
        backgroundColor: 'gray',
        padding: 2,
        borderRadius: 10,
        width: 100,
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