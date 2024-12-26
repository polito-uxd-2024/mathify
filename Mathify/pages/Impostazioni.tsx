import {styles} from "../App";
import {Button, Card} from "react-native-paper";
import {View} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default function Impostazioni() {
    const navigation=useNavigation();
    return (
        <View style={styles.container}>
            <Button onPress={()=>navigation.navigate("Profile")}>Profilo</Button>
            <Button onPress={()=>navigation.navigate("Classe")}>Classe</Button>
            <Button onPress={()=>navigation.navigate("Verifica")}>Verifica</Button>
        </View>
    );}