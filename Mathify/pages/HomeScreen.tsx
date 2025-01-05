import React, {useContext, useEffect, useState} from "react";
import {View, ScrollView, ImageBackground, SafeAreaView,} from "react-native";
import {Appbar, Card, Button, Text, Avatar, ProgressBar, Switch, TextInput} from "react-native-paper";
import { styles } from "../App";
import { useNavigation } from "@react-navigation/native";
import  {useSetCurrentChallenge} from "../Component/setCurrentChallenge";
import {StateContext} from "../Reducer";
import {PreferencesContext} from "../Component/PreferencesContext";
import SegmentedButton from "../Component/SegmentedButton";
import AllListChallenges from "./AllListChallenges";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {RootStackParamList} from "../Component/navigation";

export default function HomeScreen() {
    const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [state] = useContext(StateContext);
    const [sfida, setSfida] = useState<string>("Sfida1");
    const [index, setIndex] = useState("0");


    useSetCurrentChallenge(sfida);
    const handleChallengeChange = (sfida:string) => {

        setSfida(sfida)
        setIndex(Math.floor(Math.random()).toString());
    };



    const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

    const challenges = [
        { id: "1", title: "Tangente",  icon: "alpha-a-box" },
        { id: "2", title: "Disequazioni di secondo grado", icon: "alpha-g-box" },
        { id: "3", title: "Triangoli equilateri", icon: "alpha-c-box" },
        { id: "4", title: "Studio della funzione", icon: "alpha-t-box" },
        { id: "5", title: "Equazioni", icon: "alpha-p-box" },
        { id: "6", title: "Statistica", icon: "alpha-s-box" },
        { id: "7", title: "Algebra", icon: "alpha-a-box" },
        { id: "8", title: "Geometria", icon: "alpha-g-box" },
        { id: "9", title: "Calcolo", icon: "alpha-c-box" },
        { id: "10", title: "Logaritmo", icon: "alpha-t-box" },
        { id: "11", title: "Equazioni", icon: "alpha-p-box" },
        { id: "12", title: "Statistica", icon: "alpha-s-box" },
    ];

    const [searchQuery, setSearchQuery] = useState("");

    const filteredChallenges = challenges.filter(challenge =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentScore = 75;
    const requiredScore = 100;

    return (

        <ScrollView>

            <Appbar.Header style={{justifyContent: "space-between", alignItems: "center"}}>

                {/* Titolo Mathify */}
                <View style={{ flex: 1 }}>
                    <Appbar.Content
                        title="Mathify"
                        titleStyle={{textAlign: 'left', fontWeight: 'bold'}}
                    />
                </View>

                {/* Switch Tema */} {/*ma questo dovrebbe andare via no?*/}
                <Switch
                    color="red"
                    value={isThemeDark}
                    onValueChange={toggleTheme}
                    style={{ marginLeft: 16 }}
                />

                {/* Informazioni Utente e Barra */}
                <View style={{ flexDirection: 'column', alignItems: 'flex-end', flex: 1 }}>
                    {/* Nome Utente */}
                    <Text style={{fontWeight: 'bold', color: '#fff' }}>
                        {state.utente.nome} {state.utente.cognome}
                    </Text>

                    {/* Livello Utente */}
                    <Text style={{ color: 'orange', fontWeight: 'bold' }}>
                        Liv {state.utente.livello.numero} - {Math.round((state.utente.xp / state.utente.livello.xpTotali) * 100)}% {/* Percentuale calcolata */}
                    </Text>

                    {/* Barra di Progresso */}
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop:4 }}>
                        <ProgressBar
                            progress={state.utente.xp / state.utente.livello.xpTotali} // Percentuale XP
                            color="orange"
                            style={{ height: 8, borderRadius: 4, width: 100 }}
                        />
                    </View>
                </View>

            </Appbar.Header>

            <View style={styles.content}>
                <Card style={{ marginBottom: 16, width: "100%", position: "relative" }}>
                    <Card.Content>
                        {/* Titolo e Stelle affiancate */}
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            {/* Titolo della sfida */}
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                                {state.selectedChallenge.titolo} {/* nome della sfida */}
                            </Text>

                            {/* Difficoltà (stelle) */}
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                {[...Array(3)].map((star, index) => (
                                    <Avatar.Icon
                                        key={index}
                                        icon="star"
                                        size={20}
                                        color={index < state.selectedChallenge.difficoltà ? 'red' : 'black'} // Colore delle stelle
                                        style={{ marginLeft: 8}}

                                    />
                                ))}
                            </View>
                        </View>

                        {/* Sottotitolo del macro argomento */}
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom:16 }}>
                            <Text style={{ fontSize: 15, fontWeight:"bold" }}>{state.selectedChallenge.argomento}</Text>
                        </View>
                    </Card.Content>

                    {/* Immagine */}
                    <Card.Content>
                        <ImageBackground
                            source={{ uri: 'https://cdn.pixabay.com/photo/2017/05/02/15/05/addition-2278415_1280.jpg' }}
                            style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10,}}
                            imageStyle={{ borderRadius: 10}}
                        >
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                                <View style={{ alignItems: "center", marginVertical: 100 }}>
                                </View>
                            </View>
                        </ImageBackground>
                    </Card.Content> {/*si deve sistemare l'immagine prendendolo dal database*/}


                    <Card.Actions style={{justifyContent: 'center' }}>
                    {/* Bottone "Cambia sfida" */}
                    <Button
                        mode="outlined"
                        onPress={() => {
                            const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
                            handleChallengeChange(randomChallenge.title);
                            setIndex(Math.floor(Math.random()).toString());
                        }}
                        contentStyle={{ height: 40 }}
                        labelStyle={{ fontSize: 14 }}
                        style={{ width: 'auto', alignSelf: 'flex-end'}}  // Posizionato a destra sopra Play
                    >
                        Cambia sfida
                    </Button>
                    </Card.Actions> {/*deve prendere sfide a caso dalla fetch*/}

                    <Card.Actions style={{justifyContent: 'center' }}>
                    {/* Bottone "Play" */}
                    <Button
                        mode="contained"
                        onPress={()=> {
                            (handleChallengeChange(sfida),
                            navigate("Play")
                        )
                        }}
                        contentStyle={{ height: 50 }}
                        labelStyle={{ fontSize: 16 }}
                        style={{ width: '100%', alignSelf: 'center' }}
                    >
                        Play
                    </Button>
                    </Card.Actions>
                </Card> {/*deve partire con la sfida selezionata*/}

                <Card style={{ flex: 1, padding: 16, borderRadius: 10, width: '100%' }}>
                    <TextInput label="Cerca sfida" mode="outlined" value={searchQuery} onChangeText={setSearchQuery} style={{ marginBottom: 16 }} />
                    <SegmentedButton filteredChallenges={filteredChallenges}/>
                </Card>
            </View>

        </ScrollView>

    );
}