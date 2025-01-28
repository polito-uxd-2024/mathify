import * as React from 'react';
import {StyleSheet, FlatList, View, ScrollView, SafeAreaView, TouchableOpacity, Image, Modal} from 'react-native';
import {Card, Button, Avatar, TextInput, Appbar, IconButton, ProgressBar, Text} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {PlayParamList, RootStackParamList} from "../Component/navigation";
import {styles} from "../Component/style";
import {useContext, useState} from "react";
import {setSelectedChallenge} from "../Action";
import {StateContext} from "../Reducer";
import {myTheme} from "../Component/theme";
import {FontAwesome} from "react-native-vector-icons";


const AllListChallenges = ({ route }: { route: any }) => {
    const { filteredChallenges: initialChallenges } = route.params;  // Ottieni i dati passati
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [searchQuery, setSearchQuery] = useState("");
    const [state, dispatch]= useContext(StateContext)
    const navigationPlay = useNavigation<NativeStackNavigationProp<PlayParamList>>();
    const [modalVisible, setModalVisible] = useState(false);
    const [icon, setIcon] = useState(require('../assets/placeholder.jpg'));
    // Filtra ulteriormente i risultati
    const filteredChallenges = initialChallenges.filter(challenge =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.argomento.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
        handleCloseModal(title);
    }
    const buttonTitles = ["Geometria analitica", "Funzioni", "Geometria", "Algebra", "Trigonometria", "Analisi"];

    const handleButtonClick = (title: string) => {
        if (searchQuery === title) {
            setSearchQuery("");
        } else {
            setSearchQuery(title);
        }
    };
    return (
        <>
            <Appbar.Header style={[styles.header]}>
                <View style={{ position: 'absolute', left: 0 }}>
                    <IconButton
                        icon="arrow-left"
                        size={24}
                        color="black"
                        onPress={() => navigation.goBack()}
                        style={{ marginLeft: 10 }}
                    />
                </View>
                <Appbar.Content title="Tutte Le Sfide" style={{ alignSelf: "center", marginLeft: 50 }} />
            </Appbar.Header>
        <ScrollView style={styles.mainContent}>
            <View style={{paddingBottom: 30}}>
            <View style={styles.section}>
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
                <View style={styles.section}>
                {/* FlatList per visualizzare tutte le sfide */}
                {filteredChallenges.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.article} onPress={() => handleCardPress(item.title, item.icon)}>
                        <View style={styles.cardBase}>
                            <Card style={styles.card}>
                                <View style={{flexDirection: 'row', marginBottom: 10, paddingHorizontal: 10}}>
                                    <View style={{marginTop: 10}}>
                                        <Image source={item.icon || require('../assets/placeholder.jpg')}
                                               style={styles.cardImage}/>
                                    </View>
                                    <View>
                                        <View style={{flexDirection: 'row', marginLeft: 110, marginBottom: 'auto'}}>
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
                </View>

            </View>


        </ScrollView>
            <Modal
                animationType="fade"
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
    </>
    );
};

export default AllListChallenges;