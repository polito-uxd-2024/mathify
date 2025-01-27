import {styles} from "./style";
import {Card, Text} from "react-native-paper";
import {View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as React from "react";
import {useContext} from "react";
import {StateContext} from "../Reducer";
import { ScrollView } from 'react-native'
import {myTheme} from "./theme";

export default function BadgeList(){
    const [state] = useContext(StateContext);

    // I badge che non sono visibili nel profilo (ovvero quelli prima delle ultime 3 sfide completate)
    const previousBadges = state.utente.sfideCompletate; // Badge prima delle ultime 3 sfide completate

    // I badge fissi (velocista, stakanovista, perfezionista) trattati come oggetti
    const fixedBadges = [
        { id: 'Velocista', description: 'Sfida completata in meno di due minuti', icon: 'run-fast', color: '#ff6f61' },
        { id: 'Stakanovista', description: '3 sfide nella stessa giornata', icon: 'arm-flex', color: '#4caf50' },
        { id: 'Perfezionista', description: '10 domande di fila', icon: 'star', color: '#ffc107' }
    ];

    // Combinare i badge non visibili e quelli fissi
    const allBadgesToShow = [...previousBadges,...fixedBadges];

    return (
        <View style={{backgroundColor: myTheme.colors.gray, flex:1}}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={{ flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'space-around', paddingHorizontal: 10, marginTop:20,marginLeft:11}}>
                    {allBadgesToShow.map((item, index) => (
                        <View key={index} style={{ alignItems: 'center', width: 100, marginRight: 16, backgroundColor:"white",borderRadius:10,marginBottom:20, flexBasis:"27%" }}>

                            <View
                                style={{ width: 80, height: 80, borderRadius: 40,
                                    backgroundColor: item.color || '#3498db', // Colore specifico per ogni badge
                                    justifyContent: 'center', alignItems: 'center',marginTop:10 }}
                            >
                                <MaterialCommunityIcons
                                    name={item.icon || "trophy"} // Usa l'icona specifica o una generica
                                    size={40}
                                    color="white"
                                />
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign:"center" }}>
                                    {item.titolo} {/* Nome della sfida o del badge */}
                                    {item.argomento || item.id}
                                </Text>

                                <Text style={{ fontSize: 12, color: myTheme.colors.violet, textAlign: 'center', marginTop: 4,marginBottom:4 }}>
                                    {item.xpGuadagnati ? `Complimenti! Hai guadagnato ${item.xpGuadagnati} XP` : item.description}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}