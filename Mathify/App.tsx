import React, {ReducerState, useEffect, useReducer, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Navigation from './Component/navigation';
import {InitialState, Reducer, StateContext} from "./Reducer";
import {State} from "react-native-paper/lib/typescript/components/TextInput/types";
import {CombinedDarkTheme, CombinedDefaultTheme} from "./Component/theme";
import {PreferencesContext} from "./Component/PreferencesContext";
import {DarkTheme} from "@react-navigation/native";

import useFonts from './useFonts';



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

    //const [fontsLoaded, setFontsLoaded] = useState(false);
    {/*
    useEffect(() => {
        async function loadFonts() {
            await useFonts();
            setFontsLoaded(true);
        }
        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return <AppLoading />;
    }*/}
    return (


                <StateContext.Provider value={useReducer(Reducer, InitialState)}>
                    <PreferencesContext.Provider value={preferences}>
                        <Navigation />
                    </PreferencesContext.Provider>
                </StateContext.Provider>

    );
}


