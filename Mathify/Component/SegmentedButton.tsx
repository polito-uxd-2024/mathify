import * as React from 'react';
import {FlatList, ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';
import { Avatar, Button, Card, SegmentedButtons, Text,TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../App';
import SfideCompletate from "../pages/SfideCompletate";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import Navigation, {HomeStackParamList, PlayParamList, RootStackParamList} from "./navigation";
import {useContext, useState} from "react";
import {useSetCurrentChallenge} from "./setCurrentChallenge";
import {StateContext} from "../Reducer";
import {setSelectedChallenge} from "../Action";


export interface Challenge {
    id: string;
    title: string;
    icon: string;
}
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

const SegmentedButton = () => {
    const [value, setValue] = React.useState('esplora');
    const navigationAll = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    const navigationPlay = useNavigation<NativeStackNavigationProp<PlayParamList>>();
    const [sfida, setSfida] = useState<string>("Sfida1");
    const [index, setIndex] = useState(0);
    const [state, dispatch]= useContext(StateContext)

    useSetCurrentChallenge(sfida);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredChallenges = challenges.filter(challenge =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleChallengeChange = (sfida:string) => {
        setSfida(sfida)
        setIndex(Math.floor(Math.random()));
    };

    return (
        <>
            <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                    { value: 'esplora', label: 'Esplora' },
                    { value: 'completate', label: 'Completate' },
                    { value: 'programmate', label: 'Programmate' },
                ]}
            />
            {value === 'completate' && (
                <SfideCompletate/>
            )}
            {value === 'esplora' && (
                <View>
                    <Card style={{ marginBottom: 16, width: "100%", position: "relative" }}>
                        <Card.Content>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                {/* Sfide randomiche */}
                                <Text style={{ fontSize: 20 }}>
                                    Sfida random
                                </Text>
                            </View>

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
                                    setIndex(Math.floor(Math.random()));
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
                                            navigationPlay.navigate("Play")
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
                    <TextInput label="Cerca sfida" mode="outlined" value={searchQuery} onChangeText={setSearchQuery} style={{ marginBottom: 16 }} />

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        {/* Lista sfide */}
                        <Text style={{ fontSize: 20 }}>
                            Scopri le sfide
                        </Text>
                    </View>

                    <FlatList
                        data={filteredChallenges.slice(0, 5)} // Prendi solo le prime 5 sfide
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (

                            <Card style={styles.card}>
                                <Card.Title
                                    title={item.title}
                                    left={(props) => (
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Avatar.Icon icon={item.icon} size={20} style={{ marginRight: 8 }} />
                                        </View>
                                    )}
                                />
                                <Card.Actions>
                                    <Button onPress={() => {
                                         /*navigationAll.navigate(item.title)*/
                                        console.log(item.title + ' pressed');
                                    }} style={{ flex: 1 }}>
                                        Seleziona sfida
                                    </Button>
                                </Card.Actions>
                            </Card>)}
                    />
                    {filteredChallenges.length > 5 && (
                        <Button
                            onPress={() => navigationAll.navigate('AllListChallenges', { filteredChallenges })}
                            style={{ alignSelf: 'flex-end', marginTop: 16 }}>
                            VEDI TUTTO
                        </Button>
                    )}

                </View>
            )}
        </>

    );
};

export default SegmentedButton;