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


const AllListChallenges = ({ route }: { route: any }) => {
    const { filteredChallenges: initialChallenges } = route.params;  // Ottieni i dati passati
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [searchQuery, setSearchQuery] = useState("");
    const [state, dispatch]= useContext(StateContext)
    const navigationPlay = useNavigation<NativeStackNavigationProp<PlayParamList>>();
    const [modalVisible, setModalVisible] = useState(false);
    // Filtra ulteriormente i risultati
    const filteredChallenges = initialChallenges.filter(challenge =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
    }

    return (
        <ScrollView style={{ flex: 1 }}>

                <TextInput label="Cerca sfida" mode="outlined" value={searchQuery} onChangeText={setSearchQuery} outlineStyle={{borderRadius: 50, borderWidth: 2}}/>

                {/* FlatList per visualizzare tutte le sfide */}
                {filteredChallenges.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.article} onPress={() => handleCardPress(item)}>
                        <View style={styles.cardBase}>
                            <Card style={styles.card}>
                                <View style={{flexDirection: 'row', marginBottom: 10, paddingHorizontal: 10}}>
                                    <View style={{marginTop: 10}}>
                                        <Image source={require('../assets/placeholder.jpg')} style={styles.cardImage}/>
                                    </View>
                                    <View>
                                        <View style={{flexDirection: 'row', marginLeft: 110, marginBottom: 'auto'}}>
                                            <View style={styles.stars}>
                                                {[...Array(3)].map((star, index) => (
                                                    <Avatar.Icon
                                                        key={index}
                                                        icon="star"
                                                        size={20}
                                                        color={index < state.selectedChallenge.difficolta ? 'white' : 'black'} // Colore delle stelle
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


            {state.selectedChallenge && (

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={handleCloseModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{state.selectedChallenge.titolo}</Text>
                            <Text style={styles.modalSubtitle}>{state.selectedChallenge.argomento}</Text>
                            <Button onPress={() => handleClick(state.selectedChallenge.titolo)} style={{ marginTop: 20 }}>
                                Vai alla sfida
                            </Button>
                            <Button onPress={handleCloseModal} style={{ marginTop: 10 }}>
                                Chiudi
                            </Button>
                        </View>
                    </View>
                </Modal>
            )}

        </ScrollView>
    );
};

export default AllListChallenges;