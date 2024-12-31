import {MD3DarkTheme, MD3LightTheme, MD3LightTheme as DefaultTheme} from 'react-native-paper';

export const theme = {
    ...MD3DarkTheme, // or MD3DarkTheme
    roundness: 2,
    colors: {
        ...MD3DarkTheme.colors,
        primary: '#3498db',
        secondary: '#f1c40f',
        tertiary: '#a1b2c3',
    },
};