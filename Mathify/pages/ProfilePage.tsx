import {FlatList, Image, ImageBackground, View} from "react-native";
import { styles } from "../Component/style";
import {Appbar, Card, Text, Button, IconButton, ProgressBar, Divider} from "react-native-paper";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {ProfileStackParamList, RootStackParamList} from "../Component/navigation";
import {useSetCurrentUser} from "../Component/setUser";
import {StateContext} from "../Reducer";
import {useCallback, useContext, useEffect, useState} from "react";
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
    const [items, setItems] = useState([]);
    const [numeroSfideCompletate, setNumeroSfideCompletate] = useState(0);

    // Array di badge (fuori da BadgeList)
    const badges = [
        {id: 1, name: "Determinato", image: require("../assets/Badge Image/flag_4158032.png"), description: "Hai completato 10 sfide nell'ultima settimana!"},
        {id: 2, name: "Precisino", image: require("../assets/Badge Image/goal_4158044.png"), description: "Hai risposto correttamente a tutte le domande"},
        {id: 3, name: "Ingegnere", image: require("../assets/Badge Image/graduation_4158029.png"), description: "Hai svolto 40 sfide dall'inizio del tuo percorso"},
        {id: 4, name: "Razzo", image: require("../assets/Badge Image/growth_4157905.png"), description: "Hai impiegato meno di 5 minuti per finire la sfida"},
        {id: 5, name: "Asso", image: require("../assets/Badge Image/star_4158051.png"), description: "Hai ottenuto il massimo risultato in 5 sfide"},
        {id: 6, name: "Geniaccio", image: require("../assets/Badge Image/idea_4158034.png"), description: "Hai ottenuto un risultato superiore a 8 nelle ultime 3 sfide"},
        {id: 7, name: "Intuitore", image: require("../assets/Badge Image/victory_4158038.png"), description: "Hai completato almeno 5 domande in meno di 20 secondi"},
    ];
    const trophys = [
        {id: 1, image: require("../assets/Badge Image/god_4158059.png")},
        {id: 2, image: require("../assets/Badge Image/trophy_4158048.png")},
        {id: 3, image: require("../assets/Badge Image/ladder_4158057.png")},
    ];

    // Funzione per ottenere un elemento casuale dalla lista badges
    const getRandomItem = (badges) => {
        if (badges.length === 0) return null; // Se la lista è vuota, restituisce null
        const randomIndex = Math.floor(Math.random() * badges.length); // Indice casuale
        return badges[randomIndex]; // Ritorna l'elemento all'indice casuale
    };

    useEffect(() => {
        // Controlla se ci sono sfide completate prima di aggiungere un nuovo elemento
        if (state.utente.sfideCompletate > numeroSfideCompletate) {
            setNumeroSfideCompletate(state.utente.sfideCompletate.length); // Aggiorna il numero di sfide completate
            const randomItem = getRandomItem(badges); // Prendi un elemento casuale
            if (randomItem) {
                setItems((prevItems) => [...prevItems, randomItem]); // Aggiungi l'elemento alla lista
            }
        }
    }, [state.utente.sfideCompletate, numeroSfideCompletate]); // Esegui quando cambia "sfideCompletate"



    return (

        <View style={{ flex: 1 }}>
            <Appbar.Header style={styles.header}>
                <Appbar.Content title="Profilo" />
            </Appbar.Header>
            <ScrollView contentContainerStyle={{ paddingBottom: 20}}>
                <View style={{backgroundColor: myTheme.colors.gray}}>
                    {/* Immagine */}
                        <View style={[{padding: 20, marginLeft:10,marginRight:10,marginTop:10 }]}>
                            <View style={[styles.coverImage, {justifyContent:"center", backgroundColor: 'white'}]}>
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
                                <Image
                                    source={require('../assets/student.png')}
                                    style={{ width: 150, height: 150, alignSelf: 'center'}}
                                />
                        </View>

                                {/* Tasto Impostazioni in alto a destra */}



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
                            <View style={[styles.card, {borderWidth: 2, borderColor: 'black'}]}>
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
                                    <View style={{ marginLeft: 10, backgroundColor: 'white', padding: 10, borderRadius: 10, flexDirection: 'column',
                                        alignItems: 'center',  marginBottom: 4}}>

                                        <Text style={{ fontWeight: 'bold', textAlign: "center", marginBottom: 4, }}>
                                            Apprendista{/* Percentuale calcolata */}
                                        </Text>
                                        <View style={{flexDirection:"row", width:200, alignItems:"center", paddingTop:10}}>
                                            <Progress.Bar
                                                progress={parseFloat((state.utente.livello.xpTotali / 5000).toFixed(2))}
                                                color={"gold"}
                                                style={{height:15, borderRadius:10}}
                                                borderColor={"black"}
                                                borderWidth={2}
                                                width={170}
                                                height={15}
                                            />
                                            <Text style={{color: 'black', width: '100%', textAlign: 'left', fontWeight: 'bold', fontSize:18, paddingLeft:10}}>
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
                                        <Image source={badges[index].image}
                                               style={[styles.cardImage, { position:"absolute", left:1}]}/>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', marginTop: 8, textAlign:"center" }}>
                                            {item.titolo} {/* Nome della sfida o del badge */}
                                        </Text>
                                        <Text style={[styles.subtitle, {textAlign:"center"}]}>
                                            {badges[index].name} {/* Nome della sfida o del badge */}
                                        </Text>
                                        <Text style={{ fontSize: 12, color: myTheme.colors.violet, textAlign: 'center', marginTop: 4 }}>
                                            {badges[index].description}
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
                                <View style={{width: 120,alignItems: 'center', padding: 10, paddingTop: 10, borderRadius: 10, backgroundColor: myTheme.colors.gray}}>
                                    <MaterialCommunityIcons
                                        name="trophy"
                                        size={40}
                                        color="white"
                                        style={{backgroundColor: myTheme.colors.cardBorder, padding: 5, borderRadius: 100, borderWidth: 5, borderColor: 'gold'}}
                                    />
                                {/* Badge Fuoriclasse */}
                                <View style={{ marginTop: 5, backgroundColor: myTheme.colors.primary, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20}}>
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
                                <View style={{width: 120,alignItems: 'center', padding: 10, paddingTop: 10, borderRadius: 10, backgroundColor: myTheme.colors.gray}}>
                                    <MaterialCommunityIcons
                                        name="account-star"
                                        size={40}
                                        color="white"
                                        style={{backgroundColor: myTheme.colors.cardBorder, padding: 5, borderRadius: 100, borderWidth: 5, borderColor: 'gold'}}
                                    />

                                    <View style={{ marginTop: 5, backgroundColor: myTheme.colors.primary, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20}}>
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
                                    <View style={{width: 120, alignItems: 'center', padding: 10, paddingTop: 10, borderRadius: 10, backgroundColor: myTheme.colors.gray}}>
                                        <View style={{ width: 80, height: 80, backgroundColor: myTheme.colors.cardBorder, borderRadius: 100, borderWidth: 5, borderColor: 'gold', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                            <Image
                                                source={trophys[2].image}
                                                style={{ width: 80, height: 80, position: 'absolute', top: -40, left: 0, right: 0, marginLeft: 'auto', marginRight: 'auto' }}
                                            />
                                        </View>
                                        <View style={{ marginTop: 5, backgroundColor: myTheme.colors.primary, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20}}>
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