import * as React from 'react';
import { FlatList, View, Button } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {RootStackParamList} from "../Component/navigation";


const AllListChallenges = ({ route }: { route: any }) => {
    const { filteredChallenges } = route.params;  // Ottieni i dati passati
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={filteredChallenges}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card style={{ flex: 1, width: '100%' }}>
                        <Card.Title
                            title={item.title}
                            left={(props) => (
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Avatar.Icon icon={item.icon} size={20} style={{ marginRight: 8 }} />
                                </View>
                            )}
                        />
                        <Card.Actions>
                            <Button onPress={() => console.log(item.title + ' pressed')} style={{ flex: 1 }} title={"Back"}>
                                Seleziona sfida
                            </Button>
                        </Card.Actions>
                    </Card>
                )}
            />
            <Button title="Indietro" onPress={()=>(navigation.goBack())} />
        </View>
    );
};

export default AllListChallenges;