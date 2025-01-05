import * as React from 'react';
import {FlatList, View, Button, SafeAreaView} from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {RootStackParamList} from "../Component/navigation";
import {styles} from "../App";


const AllListChallenges = ({ route }: { route: any }) => {
    const { filteredChallenges } = route.params;  // Ottieni i dati passati
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (

            <Card style={styles.card}>
            <Button title="Indietro" onPress={()=>(navigation.goBack())} />
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
                            <Button onPress={() => console.log(item.title + ' pressed')} style={{ flex: 1 }} title={"Seleziona Sfida"}>
                                Seleziona sfida
                            </Button>
                        </Card.Actions>
                    </Card>
                )}
            />
            </Card>


    );
};

export default AllListChallenges;