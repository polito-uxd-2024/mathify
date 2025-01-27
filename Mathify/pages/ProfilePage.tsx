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
import {myTheme} from "../Component/theme";
import { FontAwesome } from 'react-native-vector-icons';
export default function ProfilePage() {
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
    const [state] = useContext(StateContext);
    useSetCurrentUser("Utente1");



    return (

        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20}}>
                <View >
                    {/* Immagine */}
                    <View style={{padding: 20}}>

                            <ImageBackground
                                source={{ uri: 'https://i.sstatic.net/y9DpT.jpg' }}
                                style={{flex: 1}}
                                imageStyle={styles.coverImage}
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
                                        top: 20,
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



                        {/* Nome e cognome */}
                        <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={styles.bigWelcomeText}>
                                {state.utente.nome} {state.utente.cognome}
                            </Text>
                        </View>
                        <View >
                            <Text style={styles.subtitle}>
                                {state.utente.email}
                            </Text>
                        </View>
                    </View>
                        <View>

                        <View style={{ paddingHorizontal: 16, marginVertical: 20 }}>
                            <Text style={styles.welcomeText}>
                                Livello
                            </Text>
                        </View>
                        <View style={{paddingHorizontal: 16}}>
                        <View style={styles.primaryCard}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            {/* Livello e stella */}
                                <View style={{alignItems: 'center', justifyContent: 'center' }}>
                                    <FontAwesome
                                        name="star"
                                        size={70}
                                        color= 'white'
                                    />
                                    <Text style={{ position: "absolute", fontSize: 20, fontWeight: 'bold', color: myTheme.colors.primary, textAlign: "center" }}>
                                    {state.utente.livello.numero}{/* Numero del livello */}
                                    </Text>
                                </View>
                                <View>
                                {/* Livello Utente */}


                                {/* Barra di Progresso */}
                                <View style={{ marginLeft: 10, backgroundColor: 'white', padding: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'center', paddingLeft: 15, marginBottom: 4, marginRight: 5 }}>

                                    <Text style={{ fontWeight: 'bold', textAlign: "center", marginBottom: 4 }}>
                                        Apprendista{/* Percentuale calcolata */}
                                    </Text>
                                    <View style={{ position: 'relative', width: 180}}>
                                        <ProgressBar
                                            progress={parseFloat((state.utente.livello.xpTotali / 5000).toFixed(2))}
                                            color={myTheme.colors.primary}
                                            style={[styles.progressBar, { width: '100%'}]}
                                        />
                                        <Text style={{color: 'white', position: 'absolute', width: '100%', textAlign: 'left', fontWeight: 'bold', marginLeft: 20, }}>
                                            {Math.round((state.utente.livello.xpTotali / 5000) * 100)}%
                                        </Text>
                                    </View>
                                </View>
                                </View>
                            </View>
                        </View>
                        </View>

                        {/* Visualizza Attività */}
                        <View style={{ paddingHorizontal: 16, marginVertical: 20 }}>
                            <Text style={styles.welcomeText}>
                                Attività
                            </Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16 }}>
                            {/* Prima Card */}

                            <View style={styles.grayCard}>
                                <Text style={{ fontSize: 13, textAlign: 'center' }}>
                                    Sfide completate nell'ultima settimana
                                </Text>
                                <View style={styles.insideCardWhite}>
                                <Text style={{ fontSize: 40, fontWeight: 'bold', fontFamily: 'Itim', color: myTheme.colors.primary }}>
                                    {state.utente.sfideCompletate.filter(item => new Date(item.dataCompletamento).getTime() >
                                        Date.now() - 7 * 24 * 60 * 60 * 1000).length}
                                </Text>
                                </View>
                            </View>
                            <View style={styles.grayCard}>
                                <Text style={{ fontSize: 13, textAlign: 'center' }}>
                                    Sfide completate nell'ultimo mese
                                </Text>
                                <View style={styles.insideCardWhite}>
                                    <Text style={{ fontSize: 40, fontWeight: 'bold', fontFamily: 'Itim', color: myTheme.colors.primary }}>
                                        {state.utente.sfideCompletate.filter(item => new Date(item.dataCompletamento).getTime() >
                                            Date.now() - 30 * 24 * 60 * 60 * 1000).length}
                                    </Text>
                                </View>
                            </View>
                        </View>



                        {/* Visualizza Badge */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginVertical: 20 }}>
                            <Text style={styles.welcomeText}>
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
                                    Vedi Tutti
                                </Text>
                            </Button>
                        </View>

                        {/* Visualizzazione dei primi 3 badge */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16 }}>

                            {/* Mostra tutti i badge vinti */}
                            {state.utente.sfideCompletate.reverse().slice(0, 3).map((item, index) => ( // Limita a 3 badge vinti
                                <View key={index} style={{ alignItems: 'center', width: 100, marginRight: 16 }}>
                                    <View
                                        style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#3498db', justifyContent: 'center', alignItems: 'center' }}
                                    >
                                        <MaterialCommunityIcons
                                            name="trophy"
                                            size={40}
                                            color="white"
                                        />
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8 }}>
                                            {item.titolo} {/* Nome della sfida o del badge */}
                                            {item.argomento} {/* Nome della sfida o del badge */}
                                        </Text>
                                        <Text style={{ fontSize: 14, color: 'gray', textAlign: 'center', marginTop: 4 }}>
                                            Complimenti! Hai guadagnato {item.xpGuadagnati} XP
                                        </Text>
                                    </View>
                                </View>
                            ))}

                            {/* Mostra i badge fissi nella schermata del profilo */}
                            {['Velocista', 'Stakanovista', 'Perfezionista']
                                .filter(badge => !state.utente.sfideCompletate.some(item => item.id === badge)) // Mostra solo i badge che non sono stati vinti
                                .reverse()
                                .slice(0, 3 - state.utente.sfideCompletate.length) // Limita il numero dei badge fissi per mantenere 3 badge in totale
                                .map((badge, index) => (
                                    <View key={index} style={{ alignItems: 'center', width: 100 }}>
                                        <View style={{
                                            width: 80, height: 80, borderRadius: 40,
                                            backgroundColor: badge === 'Velocista' ? '#ff6f61' : badge === 'Stakanovista' ? '#4caf50' : '#ffc107',
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
                            <Text style={styles.welcomeText}>
                                Le tue Specialità
                            </Text>
                            <View style={styles.section}>
                            <Text style={styles.sectionText}>
                                # 1
                            </Text>
                            {/* Card per Logaritmi */}
                            <View style={styles.grayCardRow}>
                                {/* Icona Trofeo */}
                                <View style={{width: 120,alignItems: 'center', padding: 10, paddingTop: 10, backgroundColor: 'white', borderRadius: 10}}>
                                    <MaterialCommunityIcons
                                        name="trophy"
                                        size={40}
                                        color="white"
                                        style={{backgroundColor: myTheme.colors.cardBorder, padding: 5, borderRadius: 100, borderWidth: 5, borderColor: 'gold'}}
                                    />
                                {/* Badge Fuoriclasse */}
                                <View style={{ marginTop: 5, backgroundColor: myTheme.colors.primary, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20}}>
                                    <Text style={{ color: 'white', fontSize: 12}}>
                                        Fuoriclasse
                                    </Text>
                                </View>
                                </View>

                                {/* Dettagli della Specialità */}
                                <View style={{ flex: 1, marginLeft: 20 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
                                        Logaritmi
                                    </Text>
                                    <View style={styles.calloutXp}>
                                    <MaterialCommunityIcons
                                        name="star-four-points"
                                        size={18}
                                        color="gold"
                                    />
                                    <Text style={[styles.calloutText, {color: 'gray'}]}>
                                        +1500 XP
                                    </Text>
                                    <MaterialCommunityIcons
                                        name="star-four-points"
                                        size={18}
                                        color="gold"
                                    />
                                    </View>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>
                                        12 sfide completate
                                    </Text>
                                </View>
                            </View>
                            </View>
                            {/* Card per Logaritmi */}
                            <View style={styles.section}>
                                <Text style={styles.sectionText}>
                                    # 2
                                </Text>
                                <View style={styles.grayCardRow}>    {/* Icona Trofeo */}
                                <View style={{width: 120,alignItems: 'center', padding: 10, paddingTop: 10, backgroundColor: 'white', borderRadius: 10}}>
                                    <MaterialCommunityIcons
                                        name="account-star"
                                        size={40}
                                        color="white"
                                        style={{backgroundColor: myTheme.colors.cardBorder, padding: 5, borderRadius: 100, borderWidth: 5, borderColor: 'gold'}}
                                    />
                                    {/* Badge Fuoriclasse */}
                                    <View style={{ marginTop: 5, backgroundColor: myTheme.colors.primary, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20}}>
                                        <Text style={{ color: 'white', fontSize: 12}}>
                                            Maestro
                                        </Text>
                                    </View>
                                </View>

                                {/* Dettagli della Specialità */}
                                <View style={{ flex: 1, marginLeft: 20 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
                                        Funzioni
                                    </Text>
                                    <View style={styles.calloutXp}>
                                        <MaterialCommunityIcons
                                            name="star-four-points"
                                            size={18}
                                            color="gold"
                                        />
                                        <Text style={[styles.calloutText, {color: 'gray'}]}>
                                            +1200 XP
                                        </Text>
                                        <MaterialCommunityIcons
                                            name="star-four-points"
                                            size={18}
                                            color="gold"
                                        />
                                    </View>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>
                                        10 sfide completate
                                    </Text>
                                </View>
                            </View>
                            </View>


                            {/* Card per Logaritmi */}
                            <View style={styles.section}>
                                <Text style={styles.sectionText}>
                                    # 3
                                </Text>
                                <View style={styles.grayCardRow}>    {/* Icona Trofeo */}
                                <View style={{width: 120,alignItems: 'center', padding: 10, paddingTop: 10, backgroundColor: 'white', borderRadius: 10}}>
                                    <MaterialCommunityIcons
                                        name="telescope"
                                        size={40}
                                        color="white"
                                        style={{backgroundColor: myTheme.colors.cardBorder, padding: 5, borderRadius: 100, borderWidth: 5, borderColor: 'gold'}}
                                    />
                                    {/* Badge Fuoriclasse */}
                                    <View style={{ marginTop: 5, backgroundColor: myTheme.colors.primary, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20}}>
                                        <Text style={{ color: 'white', fontSize: 12}}>
                                            Esploratore
                                        </Text>
                                    </View>
                                </View>

                                {/* Dettagli della Specialità */}
                                <View style={{ flex: 1, marginLeft: 20 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
                                        Trigonometria
                                    </Text>
                                    <View style={styles.calloutXp}>
                                        <MaterialCommunityIcons
                                            name="star-four-points"
                                            size={18}
                                            color="gold"
                                        />
                                        <Text style={[styles.calloutText, {color: 'gray'}]}>
                                            +500 XP
                                        </Text>
                                        <MaterialCommunityIcons
                                            name="star-four-points"
                                            size={18}
                                            color="gold"
                                        />
                                    </View>
                                    <Text style={{ fontSize: 14, color: 'gray' }}>
                                        5 sfide completate
                                    </Text>
                                </View>
                            </View>
                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>

    );
}