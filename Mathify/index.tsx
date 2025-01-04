import { registerRootComponent } from 'expo';
import {MD3DarkTheme, MD3LightTheme, Provider as PaperProvider} from 'react-native-paper';
import App from './App';
import {CombinedDarkTheme, myTheme} from "./Component/theme";


const Main = () => (
    <PaperProvider theme={myTheme}>
        <App />
    </PaperProvider>

);

registerRootComponent(Main);