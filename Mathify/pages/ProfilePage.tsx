import {FlatList, ImageBackground, View} from "react-native";
import { styles } from "../Component/style";
import {Appbar, Card, Text, Button, IconButton, ProgressBar, Divider} from "react-native-paper";
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
import * as Progress from 'react-native-progress';
import {black} from "react-native-paper/lib/typescript/styles/themes/v2/colors";
export default function ProfilePage() {
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
    const [state] = useContext(StateContext);
    useSetCurrentUser("Utente1");



    return (

        <View style={{ flex: 1 }}>
            <Appbar.Header style={styles.header}>
                <Appbar.Content title="Profilo" />
            </Appbar.Header>
            <ScrollView contentContainerStyle={{ paddingBottom: 20}}>
                <View style={{backgroundColor: myTheme.colors.gray}}>
                    {/* Immagine */}
                    <View style={[{padding: 20, marginLeft:10,marginRight:10,marginTop:10 }]}>
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
                            <View style={styles.card}>
                                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                {/* Livello e stella */}
                                    <View style={{alignItems: 'center', justifyContent: 'center' }}>
                                        <FontAwesome
                                            name="star"
                                            size={70}
                                            color={myTheme.colors.blue}
                                        />
                                        <Text style={{ position: "absolute", fontSize: 20, fontWeight: 'bold', color: "white", textAlign: "center" }}>
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
                                            <Progress.Bar
                                                progress={parseFloat((state.utente.livello.xpTotali / 5000).toFixed(2))}
                                                color={myTheme.colors.primary}

                                            />
                                            <Text style={{color: 'black', position: 'absolute', width: '100%', textAlign: 'left', fontWeight: 'bold', marginLeft: 20, marginBottom:0 }}>
                                                {(Math.round((state.utente.livello.xpTotali / 5000) * 100))}%
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
                            <View style={{borderColor: myTheme.colors.violet,
                                flex: 1,
                                marginHorizontal: 5,
                                backgroundColor: "white",
                                borderWidth: 2,
                                marginTop: 5,
                                borderRadius: 20,
                                padding: 16,
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{ fontSize: 13, textAlign: 'center',fontFamily:"Itim" }}>
                                    Sfide completate nell'ultima settimana
                                </Text>
                                <View style={{backgroundColor: myTheme.colors.blue,
                                    padding: 6,
                                    margin: 5,
                                    marginTop: 3,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,}}>
                                <Text style={{ fontSize: 40, fontWeight: 'bold', fontFamily: 'Itim', color: "white" }}>
                                    {state.utente.sfideCompletate.filter(item => new Date(item.dataCompletamento).getTime() >
                                        Date.now() - 7 * 24 * 60 * 60 * 1000).length}
                                </Text>
                                </View>
                            </View>

                            <View style={{borderColor: myTheme.colors.violet,
                                flex: 1,
                                marginHorizontal: 5,
                                backgroundColor: "white",
                                borderWidth: 2,
                                marginTop: 5,
                                borderRadius: 20,
                                padding: 16,
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{ fontSize: 13, textAlign: 'center',fontFamily:"Itim" }}>
                                    Sfide completate nell'ultimo mese
                                </Text>
                                <View style={{backgroundColor: myTheme.colors.blue,
                                    padding: 6,
                                    margin: 5,
                                    marginTop: 3,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,}}>
                                    <Text style={{ fontSize: 40, fontWeight: 'bold', fontFamily: 'Itim', color: "white" }}>
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
                                <Text style={{ fontSize: 16, color: myTheme.colors.violet }}>
                                    VEDI TUTTO
                                </Text>
                            </Button>
                        </View>

                        {/* Visualizzazione dei primi 3 badge */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16 }}>

                            {/* Mostra tutti i badge vinti */}
                            {state.utente.sfideCompletate.reverse().slice(0, 3).map((item, index) => ( // Limita a 3 badge vinti
                                <View key={index} style={{ alignItems: 'center', width: 100, marginRight: 16, backgroundColor:"white",borderRadius:10 }}>
                                    <View
                                        style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#3498db', justifyContent: 'center', alignItems: 'center',marginTop:10 }}
                                    >
                                        <MaterialCommunityIcons
                                            name="trophy"
                                            size={40}
                                            color="white"
                                        />
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 8, textAlign:"center" }}>
                                            {item.titolo} {/* Nome della sfida o del badge */}
                                            {item.argomento} {/* Nome della sfida o del badge */}
                                        </Text>
                                        <Text style={{ fontSize: 12, color: myTheme.colors.violet, textAlign: 'center', marginTop: 4 }}>
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
                            <View style={{backgroundColor: "white",
                                borderWidth: 2,
                                marginTop: 5,
                                borderColor: myTheme.colors.violet,
                                borderRadius: 20,
                                padding: 16,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                {/* Icona Trofeo */}
                                <View style={{width: 120,alignItems: 'center', padding: 10, paddingTop: 10, borderRadius: 10, backgroundColor:"white"}}>
                                    <MaterialCommunityIcons
                                        name="trophy"
                                        size={40}
                                        color="white"
                                        style={{backgroundColor: myTheme.colors.cardBorder, padding: 5, borderRadius: 100, borderWidth: 5, borderColor: 'gold'}}
                                    />
                                {/* Badge Fuoriclasse */}
                                <View style={{ marginTop: 5, backgroundColor: myTheme.colors.blue, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20}}>
                                    <Text style={{ color: 'white', fontSize: 12, fontFamily:"Itim"}}>
                                        Fuoriclasse
                                    </Text>
                                </View>
                                </View>

                                {/* Dettagli della Specialità */}
                                <View style={{ flex: 1, marginLeft: 20  }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, fontFamily:"Itim"}}>
                                        Logaritmi
                                    </Text>

                                    <Text style={{ fontSize: 14, color: myTheme.colors.violet, fontFamily:"Itim",marginBottom:10 }}>
                                        12 sfide completate
                                    </Text>
                                    <View style={[styles.calloutXp, { backgroundColor: myTheme.colors.blue }]}>
                                        <MaterialCommunityIcons
                                            name="star-four-points"
                                            size={18}
                                            color="gold"
                                        />
                                        <Text style={[styles.calloutText, {color: "white"}]}>
                                            +1500 XP
                                        </Text>
                                        <MaterialCommunityIcons
                                            name="star-four-points"
                                            size={18}
                                            color="gold"
                                        />
                                    </View>
                                </View>
                            </View>
                            </View>


                            <View style={styles.section}>
                                <Text style={styles.sectionText}>
                                    # 2
                                </Text>
                                <View style={{backgroundColor: "white",
                                    borderWidth: 2,
                                    marginTop: 5,
                                    borderColor: myTheme.colors.violet,
                                    borderRadius: 20,
                                    padding: 16,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    {/* Icona Trofeo */}
                                <View style={{width: 120,alignItems: 'center', padding: 10, paddingTop: 10, borderRadius: 10, backgroundColor:"white"}}>
                                    <MaterialCommunityIcons
                                        name="account-star"
                                        size={40}
                                        color="white"
                                        style={{backgroundColor: myTheme.colors.cardBorder, padding: 5, borderRadius: 100, borderWidth: 5, borderColor: 'gold'}}
                                    />

                                    <View style={{ marginTop: 5, backgroundColor: myTheme.colors.blue, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20}}>
                                        <Text style={{ color: 'white', fontSize: 12, fontFamily:"Itim"}}>
                                            Maestro
                                        </Text>
                                    </View>
                                </View>

                                {/* Dettagli della Specialità */}
                                <View style={{ flex: 1, marginLeft: 20 }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, fontFamily:"Itim"}}>
                                        Funzioni
                                    </Text>

                                    <Text style={{ fontSize: 14, color: myTheme.colors.violet, fontFamily:"Itim",marginBottom:10 }}>
                                        10 sfide completate
                                    </Text>
                                    <View style={[styles.calloutXp, { backgroundColor: myTheme.colors.blue }]}>
                                        <MaterialCommunityIcons
                                            name="star-four-points"
                                            size={18}
                                            color="gold"
                                        />
                                        <Text style={[styles.calloutText, {color: 'white'}]}>
                                            +1200 XP
                                        </Text>
                                        <MaterialCommunityIcons
                                            name="star-four-points"
                                            size={18}
                                            color="gold"
                                        />
                                    </View>
                                </View>
                            </View>
                            </View>



                            <View style={styles.section}>
                                <Text style={styles.sectionText}>
                                    # 3
                                </Text>
                                <View style={{backgroundColor: "white",
                                    borderWidth: 2,
                                    marginTop: 5,
                                    borderColor: myTheme.colors.violet,
                                    borderRadius: 20,
                                    padding: 16,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>

                                    {/* Icona Trofeo */}
                                <View style={{width: 120,alignItems: 'center', padding: 10, paddingTop: 10, borderRadius: 10,backgroundColor:"white"}}>
                                    <MaterialCommunityIcons
                                        name="telescope"
                                        size={40}
                                        color={"white"}
                                        style={{backgroundColor: myTheme.colors.cardBorder, padding: 5, borderRadius: 100, borderWidth: 5, borderColor: 'gold'}}
                                    />

                                    <View style={{ marginTop: 5, backgroundColor: myTheme.colors.blue, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20}}>
                                        <Text style={{ color: 'white', fontSize: 12}}>
                                            Esploratore
                                        </Text>
                                    </View>
                                </View>

                                {/* Dettagli della Specialità */}
                                <View style={{ flex: 1, marginLeft: 20}}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, fontFamily:"Itim"}}>
                                        Trigonometria
                                    </Text>

                                    <Text style={{ fontSize: 14, color: myTheme.colors.violet, fontFamily:"Itim",marginBottom:10 }}>
                                        5 sfide completate
                                    </Text>
                                    <View style={[styles.calloutXp, { backgroundColor: myTheme.colors.blue }]}>
                                        <MaterialCommunityIcons
                                            name="star-four-points"
                                            size={18}
                                            color="gold"
                                        />
                                        <Text style={[styles.calloutText, {color: "white"}]}>
                                            +500 XP
                                        </Text>
                                        <MaterialCommunityIcons
                                            name="star-four-points"
                                            size={18}
                                            color="gold"
                                        />
                                    </View>
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