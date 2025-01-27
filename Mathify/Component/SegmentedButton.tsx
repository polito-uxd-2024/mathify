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



export interface Challenge {
    id: string;
    title: string;
    icon: string;
}
const challenges = [
    { id: "1", title: "Circonferenza", icon: "alpha-a-box", argomento: "Geometria analitica", difficoltà: 1 },
    { id: "2", title: "Equazioni", icon: "alpha-g-box", argomento: "Algebra", difficoltà: 1 },
    { id: "3", title: "Dominio", icon: "alpha-c-box", argomento: "Funzioni", difficoltà: 1 },
    { id: "4", title: "Triangoli equilateri", icon: "alpha-t-box", argomento: "Geometria", difficoltà: 3 },
    { id: "5", title: "Disequazioni", icon: "alpha-p-box", argomento: "Algebra", difficoltà: 2 },
    { id: "6", title: "Triangoli", icon: "alpha-s-box", argomento: "Geometria", difficoltà: 1 },
    { id: "7", title: "Algebra", icon: "alpha-a-box", argomento: "Algebra", difficoltà: 2 },
    { id: "8", title: "Geometria", icon: "alpha-g-box", argomento: "Geometria", difficoltà: 1 },
    { id: "9", title: "Calcolo", icon: "alpha-c-box", argomento: "Analisi", difficoltà: 3 },
    { id: "10", title: "Logaritmo", icon: "alpha-t-box", argomento: "Algebra", difficoltà: 2 },
    { id: "11", title: "Probabilità", icon: "alpha-p-box", argomento: "Algebra", difficoltà: 2 },
    { id: "12", title: "Statistica", icon: "alpha-s-box", argomento: "Statistica", difficoltà: 1 },
];

export const SegmentedButton = () => {
    const [value, setValue] = React.useState('esplora');
    const navigationAll = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
    const navigationPlay = useNavigation<NativeStackNavigationProp<PlayParamList>>();
    const [sfida] = useState<string>("Sfida1");
    const [index, setIndex] = useState(0);
    const [state, dispatch]= useContext(StateContext)
    const [modalVisible, setModalVisible] = useState(false);
    //const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

    console.log(state.selectedChallenge)
    useSetChallengeList();
    useSetCurrentChallenge(sfida);

    const [searchQuery, setSearchQuery] = useState("");

    const filteredChallenges = challenges.filter(challenge =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleChallengeChange = () => {
        dispatch(setSelectedChallenge(state.challengeList[index]));
        setIndex((index + 1) % state.challengeList.length);
    };

    const handleCardPress = (title) => {
        if (state.challengeList.some(challenge => challenge.titolo === title)) {
            dispatch(setSelectedChallenge(state.challengeList.find(challenge => challenge.titolo === title)!));
            setModalVisible(true);
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
                            borderRadius: 0, borderColor: 'black', borderWidth: 0}
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
                {value === 'esplora' && (
                    <View>
                        {/* Sfida random */}
                        <View style={styles.section}>
                            <View style={styles.article}>

                                    <Card style={[styles.randomCard, {backgroundColor: myTheme.colors.gray}]}>
                                        <Card.Content>
                                            <Text style={styles.welcomeText}>Sorteggia</Text>
                                            <View style={{borderWidth: 1, borderRadius: 10, marginVertical: 8,}}>
                                            <ImageBackground
                                                source={{ uri: 'https://i.sstatic.net/y9DpT.jpg' }}
                                                style={{flex: 1}}
                                                imageStyle={{ borderRadius: 10,  margin: 0, borderWidth: 4, borderColor: myTheme.colors.cardBorder}}
                                            >
                                                <View style={{ paddingHorizontal: 20, marginVertical: 0, paddingBottom: 8}}>
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
                                            </ImageBackground>
                                            </View>
                                        </Card.Content>
                                        <View style={{alignItems: 'center'}}>
                                            <View style={{width: 200, flexDirection: 'row'}}>
                                                <View style={styles.iconButtonBase}>
                                                    <IconButton
                                                        mode="outlined"
                                                        onPress={() => {
                                                            handleChallengeChange();
                                                        }}
                                                        contentStyle={{ height: 40 }}
                                                        labelStyle={{ fontSize: 14, fontWeight: 'bold', fontFamily: 'Itim', color: 'black' }}
                                                        icon="shuffle"  // Utilizza "shuffle" direttamente come nome dell'icona
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
                                                        labelStyle={{  fontSize: 18, fontWeight: 'bold', fontFamily: 'Itim', color: 'white' }}

                                                        style={styles.expandButton}
                                                    >
                                                        Play
                                                    </Button>
                                                </View>
                                            </View>

                                        </View>
                                    </Card>

                            </View>
                        </View>
                        <Divider style={{marginTop: 20, backgroundColor: 'lightgray', height: 2}}/>

                        <View style={styles.section}>
                            <Text style={styles.welcomeText}>Scopri le sfide</Text>
                            <View style={styles.article}>
                                <TextInput label="Cerca sfida"
                                           mode='outlined'
                                           value={searchQuery}
                                           outlineStyle={{borderRadius: 15, borderWidth: 2, borderColor: 'black'}}
                                           onChangeText={setSearchQuery}
                                           left={<TextInput.Icon icon="magnify" color={myTheme.colors.primary} size={30}/>}

                                />
                            </View>

                            {/* Lista sfide */}
                            <View style={styles.section}>
                                {filteredChallenges.slice(0, 5).map((item) => (
                                    <TouchableOpacity key={item.id} style={styles.article} onPress={() => handleCardPress(item.title)}>
                                        <View style={styles.cardBase}>
                                            <Card style={styles.card}>
                                                <View style={{flexDirection: 'row', marginBottom: 10, marginHorizontal: 10}}>
                                                    <View style={{marginTop: 10}}>
                                                        <Image source={require('../assets/placeholder.jpg')} style={styles.cardImage}/>
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
                                            </Card>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                                {filteredChallenges.length > 5 && (
                                    <Button
                                        onPress={() => navigationAll.navigate('AllListChallenges', { filteredChallenges })}
                                        style={{ alignSelf: 'flex-end', marginVertical: 16 }}>
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
                    <View style={styles.modalContainer}>
                        <View style={styles.modalBase}>
                            <View style={styles.cardBase}>
                                <View style={styles.card}>
                                    <View style={styles.modalContent}>
                                        <ImageBackground
                                            source={{ uri: 'https://i.sstatic.net/y9DpT.jpg' }}
                                            style={{flex: 1}}
                                            imageStyle={{ borderRadius: 10, marginVertical: 8}}
                                        >
                                            <View style={{ paddingHorizontal: 20, marginVertical: 8, paddingBottom: 8}}>
                                                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 80}}>
                                                    <View style={styles.stars}>
                                                        {[...Array(3)].map((star, index) => (
                                                            <Avatar.Icon
                                                                key={index}
                                                                icon="star"
                                                                size={25}
                                                                color={index < state.selectedChallenge.difficolta ? 'white' : 'black'} // Colore delle stelle
                                                            />
                                                        ))}
                                                    </View>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                        <Text style={styles.modalTitle}>{state.selectedChallenge.titolo}</Text>
                                        <Text style={styles.modalSubtitle}>{state.selectedChallenge.argomento}</Text>
                                        <View style={{flexDirection: 'row', paddingTop: 10}}>
                                            <Button
                                                mode="outlined"
                                                onPress={handleCloseModal}
                                                contentStyle={{ height: 40 }}
                                                labelStyle={{ fontSize: 16 }}
                                                style={styles.expandButton}
                                            >
                                                Chiudi
                                            </Button>
                                            <Button
                                                mode="contained"
                                                onPress={() => handleClick(state.selectedChallenge.titolo)}
                                                contentStyle={{ height: 40 }}
                                                labelStyle={{ fontSize: 16 }}
                                                style={styles.expandButton}
                                            >
                                                Play
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>
                </Modal>

        </View>
    );
};

export default SegmentedButton;