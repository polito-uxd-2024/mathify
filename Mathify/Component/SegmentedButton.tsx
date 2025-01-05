import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, SegmentedButtons, Text,TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../App';
import SfideCompletate from "../pages/SfideCompletate";
import AllListChallenges from "../pages/AllListChallenges";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import Navigation, {RootStackParamList} from "./navigation";


export interface Challenge {
    id: string;
    title: string;
    icon: string;
}

const SegmentedButton = ({ filteredChallenges }: { filteredChallenges: Challenge[] }) => {
    const [value, setValue] = React.useState('esplora');
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <SafeAreaView style={styles.container}>
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
                    <FlatList
                        data={filteredChallenges.slice(0, 5)} // Prendi solo le prime 5 sfide
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
                                    <Button onPress={() => {
                                         /*navigation.navigate(item.title)*/
                                        console.log(item.title + ' pressed');
                                    }} style={{ flex: 1 }}>
                                        Seleziona sfida
                                    </Button>
                                </Card.Actions>
                            </Card>)}
                    />
                    {filteredChallenges.length > 5 && (
                        <Button
                            onPress={() => navigation.navigate('AllListChallenges', { filteredChallenges })}
                            style={{ alignSelf: 'flex-end', marginTop: 16 }}>
                            VEDI TUTTO
                        </Button>
                    )}

                </View>
            )}
        </SafeAreaView>
    );
};

export default SegmentedButton;