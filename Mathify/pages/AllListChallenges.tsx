import * as React from 'react';
import {FlatList, View, SafeAreaView} from 'react-native';
import {Card, Button, Avatar, TextInput} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {RootStackParamList} from "../Component/navigation";
import {styles} from "../App";
import {useState} from "react";


const AllListChallenges = ({ route }: { route: any }) => {
    const { filteredChallenges } = route.params;  // Ottieni i dati passati
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [searchQuery, setSearchQuery] = useState("");
    
    return (

        <SafeAreaView style={{ flex: 1 }}>
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
                    contentContainerStyle={{ paddingBottom: 16 }} // Aggiungi un po' di padding sul fondo
                />
            </Card>
        </SafeAreaView>
    );
};


export default AllListChallenges;