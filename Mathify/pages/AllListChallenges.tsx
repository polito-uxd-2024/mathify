import * as React from 'react';
import {StyleSheet,FlatList, View,ScrollView, SafeAreaView} from 'react-native';
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

    // Filtra ulteriormente i risultati
    const filteredChallenges = initialChallenges.filter(challenge =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    function handleClick(title: string) {
        if (state.challengeList.some(challenge => challenge.titolo === title)) {
            dispatch(setSelectedChallenge(state.challengeList.find(challenge => challenge.titolo === title)!));
            navigationPlay.navigate("Play");
        } else {
            alert('Sfida non ancora implementata');
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Card style={{ flex: 1, padding: 16, borderRadius: 10, width: '100%' }}>
                <TextInput label="Cerca sfida" mode="outlined" value={searchQuery} onChangeText={setSearchQuery}/>

                {/* FlatList per visualizzare tutte le sfide */}
                <FlatList
                    data={filteredChallenges}
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

                            {/* Visualizza Argomento e Difficoltà sotto il titolo */}
                            <View style={{ paddingHorizontal: 16 }}>
                                <Text style={{ fontSize: 14}}>
                                    Argomento: {item.argomento}
                                </Text>
                                <Text style={{ fontSize: 14}}>
                                    Difficoltà: {item.difficoltà}
                                </Text>
                            </View>
                            
                            <Card.Actions>
                                <Button onPress={() => {
                                    /*navigationAll.navigate(item.title)*/
                                    handleClick(item.title);
                                }} style={{ flex: 1 }}>
                                    Vai alla sfida
                                </Button>
                            </Card.Actions>
                        </Card>
                    )}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
                    showsVerticalScrollIndicator={true}
                    style={{ height: 'calc(100vh - 150px)', overflowY: 'auto' }} // Impostato per l'uso nel web
                />
                />
            </Card>
        </View>
    );
};

export default AllListChallenges;