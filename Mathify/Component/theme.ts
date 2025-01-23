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
        primary: 'rgb(82,165,232)',
        cardBorder: 'rgb(197,226,250)',
        rightAnswer: 'rgb(176,227,198)',
        wrongAnswer: 'rgb(238,186,186)',
        gray: 'rgb(232,232,232)',



    },};