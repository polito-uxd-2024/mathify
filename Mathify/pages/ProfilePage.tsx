import {FlatList, ImageBackground, View} from "react-native";
import { styles } from "../Component/style";
import {Appbar, Card, Text, Button, IconButton, ProgressBar} from "react-native-paper";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {ProfileStackParamList, RootStackParamList} from "../Component/navigation";
import {useSetCurrentUser} from "../Component/setUser";
import {StateContext} from "../Reducer";
import {useCallback, useContext} from "react";
import * as React from "react";
import CardContent from "react-native-paper/lib/typescript/components/Card/CardContent";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import { ScrollView } from 'react-native'

export default function ProfilePage() {
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
    const [state] = useContext(StateContext);
    useSetCurrentUser("Utente1");

    return (

        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <Card style={{ marginBottom: 16, width: "100%", position: "relative",alignItems:"center" }}>
                    {/* Immagine */}
                    <Card.Content>
                        <ImageBackground
                            source={{ uri: 'https://cdn.pixabay.com/photo/2017/05/02/15/05/addition-2278415_1280.jpg' }}
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 2, marginBottom: 10 }}
                            imageStyle={{ borderRadius: 0 }}
                        >
                            {/* Tasto Impostazioni in alto a destra */}
                            <IconButton
                                icon="cog" // Icona per le impostazioni
                                size={30}
                                onPress={() => {
                                    // Azione per il bottone delle impostazioni
                                    navigation.navigate("Impostazioni");
                                }}
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Colore di sfondo semitrasparente per visibilità
                                    borderRadius: 50, // Rende il bottone circolare
                                }}
                            />
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ alignItems: "center", marginVertical: 100 }}>
                                </View>
                            </View>
                        </ImageBackground>
                    </Card.Content>

                    <Card.Content>
                        {/* Nome e cognome */}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ fontSize: 35, fontWeight: "bold", marginLeft: 20 }}>
                                {state.utente.nome} {state.utente.cognome}
                            </Text>
                        </View>

                        {/* Visualizza email */}
                        <View style={{ paddingHorizontal: 16 }}>
                            <Text style={{ fontSize: 14, marginLeft: 7, color: "gray" }}>
                                {state.utente.email}
                            </Text>
                        </View>

                        {/* Visualizza Livello */}
                        <View style={{ paddingHorizontal: 16, marginVertical: 20 }}>
                            <Text style={{ fontSize: 25, marginLeft: 7 }}>
                                Livello
                            </Text>
                        </View>

                        <Card style={{ marginBottom: 16, position: "relative", alignSelf: "center", width: "70%" }}>
                            {/* Livello e stella */}
                            <View style={{ top: 10, right: 10, alignItems: 'left', marginLeft: 10 }}>
                                <MaterialCommunityIcons
                                    name="star"
                                    size={60}
                                    color="gold" // Colore dorato
                                    style={{ marginRight: 8 }}
                                />
                                <Text style={{ position: "absolute", fontSize: 20, fontWeight: 'bold', color: 'white', marginTop: 22, marginLeft: 18, textAlign: "center" }}>
                                    {state.utente.livello.numero} {/* Numero del livello */}
                                </Text>
                            </View>

                            {/* Livello Utente */}
                            <Text style={{ color: 'white', fontWeight: 'bold', textAlign: "center", marginTop: 8, color: "black" }}>
                                Apprendista {Math.round((state.utente.livello.xpTotali / 5000) * 100)}% {/* Percentuale calcolata */}
                            </Text>

                            {/* Barra di Progresso */}
                            <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 4, marginLeft: 5, marginBottom: 4, marginRight: 5 }}>
                                <ProgressBar
                                    progress={parseFloat((state.utente.livello.xpTotali / 5000).toFixed(1))} // Conversione esplicita
                                    color="orange"
                                    style={{ height: 8, borderRadius: 4, width: "100%" }}
                                />
                            </View>
                        </Card>

                        {/* Visualizza Attività */}
                        <View style={{ paddingHorizontal: 16, marginVertical: 20 }}>
                            <Text style={{ fontSize: 25, marginLeft: 7 }}>
                                Attività
                            </Text>
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16 }}>
                            {/* Prima Card */}
                            <View style={{ flex: 1, backgroundColor: '#f0f0f0', marginRight: 8, padding: 16, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, textAlign: 'center' }}>
                                    Sfide completate nell'ultima settimana
                                </Text>
                                <Text style={{ fontSize: 40, fontWeight: 'bold', marginTop: 10 }}>
                                    4
                                </Text>
                            </View>

                            {/* Seconda Card */}
                            <View style={{ flex: 1, backgroundColor: '#f0f0f0', marginLeft: 8, padding: 16, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, textAlign: 'center' }}>
                                    Sfide completate nell'ultimo mese
                                </Text>
                                <Text style={{ fontSize: 40, fontWeight: 'bold', marginTop: 10 }}>
                                    12
                                </Text>
                            </View>
                        </View>

                        {/* Visualizza Badge */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginVertical: 20 }}>
                            <Text style={{ fontSize: 25, marginLeft: 7 }}>
                                Badge
                            </Text>

                            {/* Tasto Vedi Tutto */}
                            <Button
                                onPress={() => {
                                    // Azione per il tasto "Vedi Tutto"
                                    navigation.navigate('TuttiIBadge');
                                }}
                            >
                                <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                                    Vedi Tutti >
                                </Text>
                            </Button>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16 }}>
                            {/* Velocista */}
                            <View style={{ alignItems: 'center',width:100 }}>
                                <View style={{width: 80, height: 80, borderRadius: 40, backgroundColor: '#ff6f61', // Colore di sfondo distintivo
                                    justifyContent: 'center', alignItems: 'center'}}>
                                    <MaterialCommunityIcons
                                        name="run-fast"
                                        size={40}
                                        color="white"
                                    />
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>
                                        Velocista
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'center', marginTop: 4 }}>
                                        Sfida completata in meno di due minuti
                                    </Text>
                                </View>
                            </View>

                            {/* Stakanovista */}
                            <View style={{ alignItems: 'center',width:100 }}>
                                <View style={{width: 80, height: 80, borderRadius: 40, backgroundColor: '#4caf50', // Colore di sfondo distintivo
                                    justifyContent: 'center',
                                    alignItems: 'center'}}>
                                    <MaterialCommunityIcons
                                        name="arm-flex"
                                        size={40}
                                        color="white"
                                    />
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>
                                        Stakanovista
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'center', marginTop: 4 }}>
                                        3 sfide nella stessa giornata
                                    </Text>
                                </View>
                            </View>

                            {/* Perfezionista */}
                            <View style={{ alignItems: 'center',width:100 }}>
                                <View style={{width: 80, height: 80, borderRadius: 40,
                                    backgroundColor: '#ffc107', // Colore di sfondo distintivo
                                    justifyContent: 'center', alignItems: 'center'}}>
                                    <MaterialCommunityIcons
                                        name="star"
                                        size={40}
                                        color="white"
                                    />
                                </View>
                                <View style={{marginTop:10}}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>
                                        Perfezionista
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'gray', textAlign: 'center', marginTop: 4 }}>
                                        10 domande di fila
                                    </Text>
                                </View>
                            </View>
                        </View>





                    </Card.Content>
                </Card>
            </ScrollView>
        </View>

    );
}


/*
<FlatList data={state.utente.sfideCompletate} renderItem={
                    ({ item }) => (
                        <View style={styles.cardBase}>
                            <Card style={styles.card}>
                                <Card.Title title={item.id} />
                                <Card.Content>
                                    <Text>{item.punteggio}</Text>
                                    <Text style={styles.callout}>
                                        <Text>{item.xpGuadagnati} XP</Text>
                                    </Text>

                                </Card.Content>
                            </Card>
                        </View>
                    )
                }/>

 */