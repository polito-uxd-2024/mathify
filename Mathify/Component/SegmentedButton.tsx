import * as React from 'react';
import {
    FlatList,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    View,
    ViewComponent,
    VirtualizedList,
    Text,
    ScrollView, Image, TouchableOpacity, Modal
} from 'react-native';
import {Avatar, Button, Card, Divider, IconButton, SegmentedButtons, TextInput} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import SfideCompletate from "../pages/SfideCompletate";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import Navigation, {HomeStackParamList, PlayParamList, RootStackParamList} from "./navigation";
import {useContext, useState} from "react";
import {useSetCurrentChallenge} from "./setCurrentChallenge";
import {StateContext} from "../Reducer";
import {setSelectedChallenge} from "../Action";
import {handlePress} from "react-native-paper/lib/typescript/components/RadioButton/utils";
import {useSetChallengeList} from "./useSetChallengeList";
import {getBackgroundColor} from "@expo/metro-runtime/build/error-overlay/UI/LogBoxStyle";
import {myTheme} from "./theme";
import {FontAwesome} from "react-native-vector-icons";
import SfideProgrammate from "../pages/SfideProgrammate";



export interface Challenge {
    id: string;
    title: string;
    icon: string;
}
export const challenges = [
    { id: "1", title: "Circonferenza", icon: require(`../assets/circonferenze.png`), argomento: "Geometria analitica", difficoltà: 1 },
    { id: "2", title: "Dominio", icon: require(`../assets/domini.png`), argomento: "Funzioni", difficoltà: 1 },
    { id: "3", title: "Disequazioni", icon: require(`../assets/disequazioni.png`), argomento: "Algebra", difficoltà: 2 },
    { id: "4", title: "Equazioni", icon: require(`../assets/equazioni.png`), argomento: "Algebra", difficoltà: 3 },
    { id: "5", title: "Esponenziali", icon: require(`../assets/esponenziali.png`), argomento: "Algebra", difficoltà: 2 },
    { id: "6", title: "Probabilità condizionata", icon: require(`../assets/probabilita.png`), argomento: "Probabilità", difficoltà: 2 },
        { id: "7", title: "Derivate", icon: require(`../assets/derivate.png`), argomento: "Funzioni", difficoltà: 1 },
    { id: "8", title: "Funzioni sinusoidali", icon: require(`../assets/sinusoidi.png`), argomento: "Trigonometria", difficoltà: 3 },
    { id: "9", title: "Solidi euclidei", icon: require(`../assets/solidi euclidei.png`), argomento: "Geometria", difficoltà: 3 },
    { id: "9", title: "Pitagora", icon: require(`../assets/pitagora.png`), argomento: "Geometria", difficoltà: 3 },
];

export const SegmentedButton = () => {
    const [value, setValue] = React.useState('esplora');
    const navigationAll = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    const navigationPlay = useNavigation<NativeStackNavigationProp<PlayParamList>>();
    const [sfida] = useState<string>("Sfida1");
    const [index, setIndex] = useState(0);
    const [state, dispatch]= useContext(StateContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [icon, setIcon] = useState(require('../assets/placeholder.jpg'));
    //const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

    console.log(state.selectedChallenge)
    useSetChallengeList();
    useSetCurrentChallenge(sfida);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredChallenges = challenges.filter(challenge =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.argomento.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleChallengeChange = () => {
        dispatch(setSelectedChallenge(state.challengeList[index]));
        setIndex((index + 1) % state.challengeList.length);
    };

    const buttonTitles = ["Geometria analitica", "Funzioni", "Geometria", "Algebra", "Trigonometria", "Probabilità"];

    const handleButtonClick = (title: string) => {
        if (searchQuery === title) {
            setSearchQuery("");
        } else {
            setSearchQuery(title);
        }
    };
    const handleCardPress = (title, icon) => {
        if (state.challengeList.some(challenge => challenge.titolo === title)) {
            dispatch(setSelectedChallenge(state.challengeList.find(challenge => challenge.titolo === title)!));
            setModalVisible(true);
            setIcon(icon);
        } else {
            alert('Sfida non ancora implementata');
        }
    };
    const handleCloseModal = (title) => {
        setModalVisible(false);
    };

    function handleClick(title: string) {
        navigationPlay.navigate("Play");
        setModalVisible(false);
    }
    return (
        <View style={styles.content}>
            <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                    {   value: 'esplora',
                        label: 'Esplora',
                        labelStyle: {
                            fontFamily: 'Itim',
                            fontSize: 13
                        },
                        style: {
                            borderBottomWidth:  value === 'esplora' ? 3 : 0,
                            borderRadius: 0, borderWidth: 0, borderColor: 'black'}
                    },
                    {   value: 'completate',
                        label: 'Completate',
                        labelStyle: {
                            fontFamily: 'Itim',
                            fontSize: 13
                        },
                        style: {
                            borderBottomWidth:  value === 'completate' ? 3 : 0,
                            borderRadius: 0, borderColor: 'black', borderWidth: 0}
                    },
                    {   value: 'programmate',
                        label: 'Programmate',
                        labelStyle: {
                            fontFamily: 'Itim',
                            fontSize: 13
                        },
                        style: {
                            borderBottomWidth:  value === 'programmate' ? 3 : 0,
                            borderRadius: 0, borderColor: 'black', borderWidth: 0}
                    },
                ]}
            />
            <ScrollView style={styles.mainContent}>
                {value === 'completate' && (
                    <SfideCompletate/>
                )}
                {value === 'programmate' && (
                    <SfideProgrammate/>
                )}
                {value === 'esplora' && (
                    <View style={{marginBottom: 30}}>
                        {/* Sfida random */}
                        <View style={styles.section}>
                            <View style={styles.article}>

                                    <View style={styles.mainWhiteCard}>
                                        <Card.Content>


                                            <View style={[styles.coverImage, { justifyContent: "center", backgroundColor: myTheme.colors.gray, borderRadius: 18, borderWidth: 0 }]}>
                                                {/* Immagine di sfondo */}
                                                <Image
                                                    source={challenges.find(challenge => challenge.title === state.selectedChallenge.titolo)?.icon || require('../assets/placeholder.jpg')}
                                                    style={{
                                                        width: 140,
                                                        height: 140,
                                                        position: "absolute",
                                                        resizeMode: "cover",
                                                        alignSelf: 'center',
                                                        top: '5%', // Imposta la distanza dall'alto per centrarla meglio o per spostarla verso l'alto
                                                    }}
                                                />

                                                {/* Stelline in alto a destra */}
                                                <View style={{ flexDirection: "row", justifyContent: "flex-end", position: "absolute", top: 0, right: 0 }}>
                                                    <View style={[styles.stars, { marginTop: 0 , borderRadius:18, borderTopLeftRadius:0, borderBottomRightRadius: 0}]}>
                                                        {[...Array(3)].map((star, index) => (
                                                            <FontAwesome
                                                                key={index}
                                                                name="star"
                                                                size={20}
                                                                color={index < state.selectedChallenge.difficolta ? "gold" : "rgba(255,255,255,0.5)"} // Colore delle stelle
                                                            />
                                                        ))}
                                                    </View>
                                                </View>
                                                {/* Titoli in basso a sinistra */}
                                                <View style={{ position: "absolute", bottom: 10, left: 10 }}>
                                                    <Text style={[styles.sectionText, {fontSize: 20}]}>{state.selectedChallenge.titolo}</Text>
                                                    <Text style={[styles.subtitle, {fontSize: 15}]}>{state.selectedChallenge.argomento}</Text>
                                                </View>
                                            </View>




                                            {/*<ImageBackground
                                                source={challenges.find(challenge => challenge.title === state.selectedChallenge.titolo)?.icon || require('../assets/placeholder.jpg')}
                                                style={{flex: 1, height: 200, width: '100%', justifyContent: 'flex-end'}}
                                                imageStyle={{ height: 120, width:120, alignSelf:"center", marginHorizontal:90, marginVertical:30}}
                                            >
                                                <View style={{ paddingHorizontal: 20, marginVertical: 0, paddingBottom: 8, marginTop: 0}}>
                                                    <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 80}}>
                                                        <View style={styles.stars}>
                                                            {[...Array(3)].map((star, index) => (
                                                                <FontAwesome
                                                                    key={index}
                                                                    name="star"
                                                                    size={20}
                                                                    color={index < state.selectedChallenge.difficolta ? 'gold' : 'rgba(255,255,255,0.5)'} // Colore delle stelle
                                                                />
                                                            ))}
                                                        </View>
                                                    </View>
                                                    <View>
                                                        <Text style={styles.sectionText}>{state.selectedChallenge.titolo}</Text>
                                                        <Text style={styles.subtitle}>{state.selectedChallenge.argomento}</Text>
                                                    </View>
                                                </View>
                                            </ImageBackground>*/}

                                        </Card.Content>
                                        <View style={{alignItems: 'center'}}>
                                            <View style={{width: 200, flexDirection: 'row'}}>
                                                <View style={styles.iconButtonBase}>
                                                    <IconButton
                                                        mode="outlined"
                                                        onPress={() => {
                                                            handleChallengeChange();
                                                        }}
                                                        contentStyle={{ height: 40, color: myTheme.colors.darkBlue }}
                                                        labelStyle={{ fontSize: 14, fontWeight: 'bold', fontFamily: 'Itim', color: 'black' }}
                                                        icon="shuffle"  // Utilizza "shuffle" direttamente come nome dell'icona
                                                        color={myTheme.colors.darkBlue}
                                                        style={styles.iconButton}
                                                    >
                                                    </IconButton>
                                                </View>
                                                <View style={styles.expandButtonBase}>
                                                    <Button
                                                        mode="contained"
                                                        onPress={()=> {
                                                            (
                                                                navigationPlay.navigate("Play")
                                                            )
                                                        }}
                                                        contentStyle={{ height: 40}}
                                                        labelStyle={{  fontSize: 14, fontWeight: 'bold', fontFamily: 'Itim', color: 'white' }}
                                                        style={styles.expandButton}
                                                    >
                                                        Gioca Subito!
                                                    </Button>
                                                </View>
                                            </View>

                                        </View>
                                    </View>

                            </View>
                        </View>
                        <Divider style={{marginTop: 20, backgroundColor: 'lightgray', height: 2}}/>

                        <View style={styles.section}>
                            <Text style={styles.welcomeText}>Cerca Sfide</Text>
                            <View style={styles.article}>
                                <TextInput
                                    label="Cerca sfida"
                                    mode='outlined'
                                    value={searchQuery}
                                    outlineStyle={{ borderRadius: 15, borderWidth: 2, borderColor: 'black' }}
                                    onChangeText={setSearchQuery}
                                    left={<TextInput.Icon icon="magnify" color={myTheme.colors.primary} size={30} />}
                                />

                                <ScrollView horizontal={true} style={{ marginTop: 10 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        {buttonTitles.map((title, index) => (
                                            <Button
                                                key={index}
                                                mode={searchQuery === title ? "contained" : "outlined"}
                                                onPress={() => handleButtonClick(title)}
                                                style={styles.buttonTile}

                                            >
                                                {title}
                                            </Button>
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>

                            {/* Lista sfide */}
                            <View style={styles.section}>
                                {filteredChallenges.slice(0, 5).map((item) => (
                                    <TouchableOpacity key={item.id} style={styles.article} onPress={() => handleCardPress(item.title, item.icon)}>
                                        <View style={styles.cardBase}>
                                            <View style={styles.card}>
                                                <View style={{flexDirection: 'row', marginBottom: 10, marginHorizontal: 10}}>
                                                    <View style={{marginTop: 10}}>
                                                        <Image
                                                            source={item.icon || require('../assets/placeholder.jpg')}
                                                            style={styles.cardImage}
                                                        />
                                                    </View>
                                                    <View style={{flex: 1}}>
                                                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 'auto', marginLeft: 'auto'}}>
                                                            <View style={styles.stars}>
                                                                {[...Array(3)].map((star, index) => (
                                                                    <FontAwesome
                                                                        key={index}
                                                                        name="star"
                                                                        size={20}
                                                                        color={index < state.selectedChallenge.difficolta ? 'gold' : 'rgba(255,255,255,0.5)'} // Colore delle stelle
                                                                    />
                                                                ))}
                                                            </View>
                                                        </View>
                                                        <View>
                                                            <Text style={styles.cardTitle}>{item.title}</Text>
                                                            <Text style={styles.subtitle}>{item.argomento}</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                                {filteredChallenges.length > 5 && (
                                    <Button
                                        onPress={() => navigationAll.navigate('AllListChallenges', { filteredChallenges })}
                                        style={{ alignSelf: 'flex-end', marginTop: 16 }}>
                                        VEDI TUTTO
                                    </Button>
                                )}
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>




                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={handleCloseModal}
                >
                    <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={handleCloseModal}>
                        <TouchableOpacity style={styles.modalBase} activeOpacity={1}>
                            <View>
                                <View style={[styles.card, {borderWidth: 3, borderColor: myTheme.colors.primary, backgroundColor: myTheme.colors.gray}]}>
                                    <View style={[styles.modalContent]}>
                                        <View style={[styles.coverImage, {justifyContent:"center", backgroundColor: 'white'}]}>
                                            <View style={{flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute', top: 0, right: 25}}>
                                                <View style={styles.stars}>
                                                    {[...Array(3)].map((star, index) => (
                                                        <FontAwesome
                                                            key={index}
                                                            name="star"
                                                            size={20}
                                                            color={index < state.selectedChallenge.difficolta ? 'gold' : 'rgba(255,255,255,0.5)'} // Colore delle stelle
                                                        />
                                                    ))}
                                                </View>
                                            </View>
                                            <Image
                                                source={icon}
                                                style={{ width: 150, height: 150, alignSelf: 'center'}}
                                            />
                                        </View>
                                        <View style={{alignItems: 'flex-start', paddingBottom:20}}>
                                            <Text style={styles.modalTitle}>{state.selectedChallenge.titolo}</Text>
                                            <Text style={styles.modalSubtitle}>{state.selectedChallenge.argomento}</Text>
                                        </View>
                                        <View style={{flexDirection: "row"}}>
                                            <View style={[styles.expandButtonBase, {marginRight: 10, height:50}]}>
                                            <Button
                                                mode="outlined"
                                                onPress={handleCloseModal}

                                                labelStyle={{ fontSize: 16, color:"black" }}
                                                style={[styles.expandButton, {backgroundColor: "white"}]}
                                            >
                                                Chiudi
                                            </Button>
                                            </View>
                                            <View style={[styles.expandButtonBase, {marginLeft: 10, height: 50}]}>
                                            <Button
                                                mode="contained"
                                                onPress={() => handleClick(state.selectedChallenge.titolo)}

                                                labelStyle={{ fontSize: 16, color:"white" }}
                                                style={[styles.expandButton]}
                                            >
                                                Play
                                            </Button>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>
        </View>
    );
};

export default SegmentedButton;