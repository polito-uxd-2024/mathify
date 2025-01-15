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
                                    navigation.navigate('ListaBadge');
                                }}
                            >
                                <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                                    Vedi Tutti >
                                </Text>
                            </Button>
                        </View>

                        {/* Visualizzazione dei primi 3 badge */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16 }}>

                            {/* Mostra prima il badge con gli XP guadagnati */}
                            {state.utente.sfideCompletate.map((item, index) =>  (
                                <View key={index} style={{ alignItems: 'center', width: 100, marginRight: 16 }}>
                                    <View
                                        style={{width: 80, height: 80, borderRadius: 40, backgroundColor: '#3498db', // Colore fisso, può essere cambiato
                                            justifyContent: 'center', alignItems: 'center',
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="trophy" // Icona generica per il badge
                                            size={40}
                                            color="white"
                                        />
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>
                                            {item.titolo} {/* Nome della sfida o del badge */}
                                        </Text>
                                        <Text style={{ fontSize: 14, color: 'gray', textAlign: 'center', marginTop: 4 }}>
                                           Complimenti! Hai guadagnato {item.xpGuadagnati} XP {/* Punteggio guadagnato */}
                                        </Text>
                                    </View>
                                </View>
                            ))}

                            {/* Mostra i badge fissi nella prima pagina */}
                            {state.utente.sfideCompletate.length < 3 && ['Velocista', 'Stakanovista', 'Perfezionista'].slice(0, 3 - state.utente.sfideCompletate.length).map((badge, index) => (
                                <View key={index} style={{ alignItems: 'center', width: 100 }}>
                                    <View style={{width: 80, height: 80, borderRadius: 40, backgroundColor: badge === 'Velocista' ? '#ff6f61' : badge === 'Stakanovista' ? '#4caf50' : '#ffc107', // Colore distintivo
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

                        {/* Visualizza Specialità */}
                        <View style={{ paddingHorizontal: 16, marginVertical: 20 }}>
                            <Text style={{ fontSize: 25, marginLeft: 7 }}>
                                Le tue Specialità
                            </Text>

                            {/* Card per Logaritmi */}
                            <View style={{backgroundColor: '#f5f5f5', borderRadius: 10, padding: 16, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                {/* Icona Trofeo */}
                                <MaterialCommunityIcons
                                    name="trophy"
                                    size={40}
                                    color="#f39c12"
                                />

                                {/* Dettagli della Specialità */}
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                        Logaritmi
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'gray', marginTop: 5 }}>
                                        +1500 XP
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>
                                        12 sfide completate
                                    </Text>
                                </View>

                                {/* Badge Fuoriclasse */}
                                <View style={{backgroundColor: '#3498db', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20}}>
                                    <Text style={{ color: 'white', fontSize: 14 }}>
                                        Fuoriclasse
                                    </Text>
                                </View>
                            </View>

                            {/* Card per Trigonometria */}
                            <View style={{backgroundColor: '#f5f5f5', borderRadius: 10, padding: 16, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                {/* Icona libro */}
                                <MaterialCommunityIcons
                                    name="book"
                                    size={40}
                                    color="#2ecc71"
                                />

                                {/* Dettagli della Specialità */}
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                        Trigonometria
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'gray', marginTop: 5 }}>
                                        +1200 XP
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>
                                        10 sfide completate
                                    </Text>
                                </View>

                                {/* Badge Maestro */}
                                <View style={{backgroundColor: '#8e44ad', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20}}>
                                    <Text style={{ color: 'white', fontSize: 14 }}>
                                        Maestro
                                    </Text>
                                </View>
                            </View>

                            {/* Card per Funzioni */}
                            <View style={{backgroundColor: '#f5f5f5', borderRadius: 10, padding: 16, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                {/* Icona Telescopio */}
                                <MaterialCommunityIcons
                                    name="telescope"
                                    size={40}
                                    color="#9b59b6"
                                />

                                {/* Dettagli della Specialità */}
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                        Funzioni
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'gray', marginTop: 5 }}>
                                        +5000 XP
                                    </Text>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>
                                        5 sfide completate
                                    </Text>
                                </View>

                                {/* Badge Esploratore */}
                                <View style={{backgroundColor: '#9b59b6', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20}}>
                                    <Text style={{ color: 'white', fontSize: 14 }}>
                                        Esploratore
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