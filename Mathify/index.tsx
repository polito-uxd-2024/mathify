import { registerRootComponent } from 'expo';
import {MD3DarkTheme, MD3LightTheme, Provider as PaperProvider} from 'react-native-paper';
import App from './App';
import {theme} from "./Component/theme";

const Main = () => (
    <PaperProvider theme={theme}>
        <App />
    </PaperProvider>
);

registerRootComponent(Main);