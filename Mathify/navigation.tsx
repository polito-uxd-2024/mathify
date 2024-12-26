import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./pages/HomeScreen";
import ProfilePage from "./pages/ProfilePage";
import Classe from "./pages/Classe";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import PlayScreen from "./pages/PlayScreen";
import Materiale from "./pages/Materiale";
import Impostazioni from "./pages/Impostazioni";

const Tab = createBottomTabNavigator();
const Play = createStackNavigator();
const ProfileStack = createStackNavigator();
const RootStack = createStackNavigator();
function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="Profile" component={ProfilePage} />
            <ProfileStack.Screen name="Impostazioni" component={Impostazioni}/>
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
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Materiale" component={Materiale}/>
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
            <Tab.Screen name="Classe" component={Classe} />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <RootStack.Navigator>
                <RootStack.Screen name="Main" component={Tabs} />
                <RootStack.Screen name="Play" component={PlayScreenStack} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}