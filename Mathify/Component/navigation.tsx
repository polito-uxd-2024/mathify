import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../pages/HomeScreen";
import ProfilePage from "../pages/ProfilePage";
import Classe from "../pages/Classe";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import PlayScreen from "../pages/PlayScreen";
import Materiale, {PredefinedMaterial} from "../pages/Materiale";
import Impostazioni from "../pages/Impostazioni";
import Verifica from "../pages/Verifica";

import {CombinedDarkTheme, myTheme} from "./theme";
import AllListChallenges from "../pages/AllListChallenges";
import {Challenge} from "./SegmentedButton";
import {SfidaCompletata} from "./Interfaces";
import SfidaDetail from "../pages/SfidaDetail";
import BadgeList from "./BadgeList";
import MaterialeDetail from "../pages/MaterialeDetail";
import Segnalazioni from "../pages/Segnalazioni";

export type RootStackParamList = {
    Main: undefined;
    Play: undefined;
    AllListChallenges: { filteredChallenges: Challenge[] };
}
export type TabParamList = {
    Home: undefined;
    Profile: undefined;
    Classe: undefined;
    Materiale: undefined;
}
export type ProfileStackParamList = {
    Profile: undefined;
    Impostazioni: undefined;
    Classe: undefined;
    Verifica: undefined;
    ListaBadge: undefined;
    Segnalazioni: undefined;
}
export type PlayParamList = {
    Play: undefined;
}
export type HomeStackParamList = {
    Home: undefined;
    AllListChallenges: { filteredChallenges: Challenge[] };
    SfidaDetail: { sfida: SfidaCompletata };
}
export type MaterialeStackParamList = {
    MaterialeDetail: { Materiale: PredefinedMaterial };
    Materiale: undefined;
}


const Tab = createBottomTabNavigator<TabParamList>();
const Play = createStackNavigator<PlayParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const MaterialeStack = createStackNavigator<MaterialeStackParamList>();
function MaterialeStackScreen() {
    return (
        <MaterialeStack.Navigator screenOptions={{headerShown:false}}>
            <MaterialeStack.Screen name="Materiale" component={Materiale} />
            <MaterialeStack.Screen name="MaterialeDetail" component={MaterialeDetail} options={{headerShown:true}} />
        </MaterialeStack.Navigator>
    );
}
function HomeStackScreen() {
    return (
        <HomeStack.Navigator screenOptions={{headerShown:false}}>
            <HomeStack.Screen name="Home" component={HomeScreen} />
            <HomeStack.Screen name="AllListChallenges" component={AllListChallenges} options={{headerShown:true}} />
            <HomeStack.Screen name={"SfidaDetail"} component={SfidaDetail} options={{headerShown:true, headerTitle:"Dettaglio Sfida"}} />
        </HomeStack.Navigator>
    );
}

function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator screenOptions={{headerShown:false}}>
            <ProfileStack.Screen name="Profile" component={ProfilePage} />
            <ProfileStack.Screen name="Impostazioni" component={Impostazioni} options={{headerShown:true}}/>
            <ProfileStack.Screen name="Classe" component={Classe}/>
            <ProfileStack.Screen name={"Segnalazioni"} component={Segnalazioni} options={{headerShown:true}}/>

            <ProfileStack.Screen name="Verifica" component={Verifica} options={{ presentation: 'modal', headerShown:true }} />
            <ProfileStack.Screen name="ListaBadge" component={BadgeList} options={{headerShown:true}}/>

        </ProfileStack.Navigator>
    );
}

function PlayScreenStack() {
    return (
        <Play.Navigator>
            <Play.Screen name="Play" component={PlayScreen} />
        </Play.Navigator>
    );
}

function Tabs() {
    return (
        <Tab.Navigator screenOptions={({ route, navigation }) => ({
            tabBarIcon: ({ color, focused, size }) => {
                let iconName;
                if (route.name === "Home") {
                    iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Profile") {
                    iconName = focused ? "person" : "person-outline";
                } else if (route.name === "Classe") {
                    iconName = focused ? "people" : "people-outline";
                }
                else if (route.name === "Materiale") {
                    iconName = focused ? "book": "book-outline";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            }, headerShown: false
        })}
        >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Materiale" component={MaterialeStackScreen}/>
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
            <Tab.Screen name="Classe" component={Classe} />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (

        <NavigationContainer theme={myTheme}>

            <RootStack.Navigator screenOptions={{headerShown:false}}>
                <RootStack.Screen name="Main" component={Tabs} />
                <RootStack.Screen name="Play" component={PlayScreenStack} />

            </RootStack.Navigator>

        </NavigationContainer>

    );
}