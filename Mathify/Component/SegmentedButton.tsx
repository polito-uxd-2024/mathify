import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, SegmentedButtons, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../App';

interface Challenge {
    id: string;
    title: string;
    icon: string;
}

const SegmentedButton = ({ filteredChallenges }: { filteredChallenges: Challenge[] }) => {
    const [value, setValue] = React.useState('esplora');
    const { navigate } = useNavigation();

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
            {value === 'esplora' && (
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
                                <Button onPress={() => {
                                    /* navigate(item.title) */
                                    console.log(item.title + ' pressed');
                                }} style={{ flex: 1 }}>
                                    Mostra dettagli
                                </Button>
                            </Card.Actions>
                        </Card>
                    )}
                />
            )}
        </SafeAreaView>
    );
};

export default SegmentedButton;