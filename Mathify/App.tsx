import React, { useReducer, useEffect, useState, useMemo, useCallback } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Navigation from './Component/navigation';
import { InitialState, Reducer, StateContext } from "./Reducer";
import { CombinedDarkTheme, CombinedDefaultTheme } from "./Component/theme";
import { PreferencesContext } from "./Component/PreferencesContext";
import * as Font from 'expo-font';

export default function App() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [isThemeDark, setIsThemeDark] = useState(false);

    const loadFonts = async () => {
        try {
            await Font.loadAsync({
                'Itim-Regular': require('.Mathify/assets/fonts/Itim-Regular.ttf'),
            });
            setFontsLoaded(true);
        } catch (error) {
            console.error('Error loading fonts:', error);
        }
    };

    useEffect(() => {
        loadFonts();
    }, []);

    const theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

    const toggleTheme = useCallback(() => setIsThemeDark((prev) => !prev), []);

    const preferences = useMemo(
        () => ({
            toggleTheme,
            isThemeDark,
        }),
        [toggleTheme, isThemeDark]
    );

    const [state, dispatch] = useReducer(Reducer, InitialState);

    if (!fontsLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <StateContext.Provider value={[state, dispatch]}>
            <PreferencesContext.Provider value={preferences}>
                <PaperProvider theme={theme}>
                    <Navigation />
                </PaperProvider>
            </PreferencesContext.Provider>
        </StateContext.Provider>
    );
}

