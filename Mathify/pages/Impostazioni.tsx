import {styles} from "../App";
import {Button, Card} from "react-native-paper";
import {View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {ProfileStackParamList} from "../Component/navigation";

export default function Impostazioni() {
    const navigation=useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
    return (
        <View style={styles.container}>
            <Button onPress={()=>navigation.navigate("Profile")}>Profilo</Button>
            <Button onPress={()=>navigation.navigate("Classe")}>Classe</Button>
            <Button onPress={()=>navigation.navigate("Verifica")}>Verifica</Button>
        </View>
    );}