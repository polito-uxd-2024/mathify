import {styles} from "./style";
import {Card, Text} from "react-native-paper";
import {Image, View} from "react-native";
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
        { id: 'Velocista', description: 'Complimenti! Hai guadagnato 150 XP', icon: 'run-fast', color: '#ff6f61', titolo: "Logaritmi" },
        { id: 'Stakanovista', description: 'Complimenti! Hai guadagnato 300 XP', icon: 'arm-flex', color: '#4caf50', titolo: "Radicali" },
        { id: 'Perfezionista', description: 'Complimenti! Hai guadagnato 450 XP', icon: 'star', color: '#ffc107', titolo: "Disequazioni" }
    ];

    // Combinare i badge non visibili e quelli fissi
    const allBadgesToShow = [...previousBadges,...fixedBadges];

    const badges = [
        {id: 1, name: "Determinato", image: require("../assets/Badge Image/flag_4158032.png"), description: "Hai completato 10 sfide nell'ultima settimana!"},
        {id: 2, name: "Precisino", image: require("../assets/Badge Image/goal_4158044.png"), description: "Hai risposto correttamente a tutte le domande"},
        {id: 3, name: "Ingegnere", image: require("../assets/Badge Image/graduation_4158029.png"), description: "Hai svolto 40 sfide dall'inizio del tuo percorso"},
        {id: 4, name: "Razzo", image: require("../assets/Badge Image/growth_4157905.png"), description: "Hai impiegato meno di 5 minuti per finire la sfida"},
        {id: 5, name: "Asso", image: require("../assets/Badge Image/star_4158051.png"), description: "Hai ottenuto il massimo risultato in 5 sfide"},
        {id: 6, name: "Geniaccio", image: require("../assets/Badge Image/idea_4158034.png"), description: "Hai ottenuto un risultato superiore a 8 nelle ultime 3 sfide"},
        {id: 7, name: "Intuitore", image: require("../assets/Badge Image/victory_4158038.png"), description: "Hai completato almeno 5 domande in meno di 20 secondi"},
    ];


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
                                <Image
                                    source={badges[index % badges.length].image}
                                    style={[styles.cardImage, { position:"absolute", left:1}]}
                                />
                            </View>

                            <View style={{ marginTop: 10 }}>

                                <Text style={{ fontSize: 14, fontWeight: 'bold', textAlign:"center" }}>
                                    {item.titolo } {/* Nome della sfida o del badge */}

                                </Text>

                                <Text style={[styles.subtitle, {textAlign:"center"}]}>
                                    {badges[index % badges.length].name}
                                </Text>

                                <Text style={{ fontSize: 12, color: myTheme.colors.violet, textAlign: 'center', marginTop: 4,marginBottom:4 }}>
                                    {badges[index % badges.length].description}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}