import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
    MD3DarkTheme,
    MD3LightTheme,
    adaptNavigationTheme,
} from 'react-native-paper';
import merge from 'deepmerge';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

export const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
export const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);
export const myTheme = {...CombinedDefaultTheme,  colors: {
        ...CombinedDefaultTheme.colors,
        primary: 'rgb(104,86,220)',
        cardBorder: 'rgb(212,196,250)',
        rightAnswer: 'rgb(98,218,152)',
        wrongAnswer: 'rgb(241,109,119)',
        gray: 'rgb(232,232,232)',
        blue: 'rgb(79,194,243)',
        violet: 'rgb(154,137,216)',
        darkBlue: 'rgb(24,49,81)'



    },};