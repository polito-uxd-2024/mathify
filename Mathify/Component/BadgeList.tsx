import {styles} from "./style";
import {Card, Text} from "react-native-paper";
import {View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as React from "react";
import {useContext} from "react";
import {StateContext} from "../Reducer";

export default function BadgeList(){
    const [state] = useContext(StateContext);

    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', paddingHorizontal: 16, marginTop: 10 }}>

            {/* Mostra i badge fissi rimanenti */}
            {['Velocista', 'Stakanovista', 'Perfezionista'].slice(state.utente.sfideCompletate.length-1).map((badge, index) => (
                <View key={index} style={{ alignItems: 'center', width: 100 }}>
                    <View style={{
                        width: 80, height: 80, borderRadius: 40, backgroundColor: badge === 'Velocista' ? '#ff6f61' : badge === 'Stakanovista' ? '#4caf50' : '#ffc107',
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <MaterialCommunityIcons
                            name={badge === 'Velocista' ? 'run-fast' : badge === 'Stakanovista' ? 'arm-flex' : 'star'}
                            size={40}
                            color="white"
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>
                            {badge}
                        </Text>
                        <Text style={{ fontSize: 14, color: 'gray', textAlign: 'center', marginTop: 4 }}>
                            {badge === 'Velocista' ? 'Sfida completata in meno di due minuti' : badge === 'Stakanovista' ? '3 sfide nella stessa giornata' : '10 domande di fila'}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
}