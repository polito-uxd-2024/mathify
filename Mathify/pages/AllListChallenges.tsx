import * as React from 'react';
import {StyleSheet,FlatList, View,ScrollView, SafeAreaView} from 'react-native';
import {Card, Button, Avatar, TextInput, Appbar, IconButton, ProgressBar} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {RootStackParamList} from "../Component/navigation";
import {styles} from "../App";
import {useState} from "react";


const AllListChallenges = ({ route }: { route: any }) => {
    const { filteredChallenges: initialChallenges } = route.params;  // Ottieni i dati passati
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [searchQuery, setSearchQuery] = useState("");

    // Filtra ulteriormente i risultati
    const filteredChallenges = initialChallenges.filter(challenge =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={{ flex: 1 }}>
            <Card style={{ flex: 1, padding: 16, borderRadius: 10, width: '100%' }}>
                <TextInput label="Cerca sfida" mode="outlined" value={searchQuery} onChangeText={setSearchQuery} style={{ marginBottom: 16 }} />

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
                            <Card.Actions>
                                <Button onPress={() => {
                                    /*navigation.navigate(item.title)*/
                                    console.log(item.title + ' pressed');
                                }} style={{ flex: 1 }}>
                                    Seleziona sfida
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