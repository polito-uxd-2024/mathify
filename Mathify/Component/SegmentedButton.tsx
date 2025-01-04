import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Avatar, Button, Card, SegmentedButtons, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

interface Challenge {
    id: string;
    title: string;
    icon: string;
}

const SegmentedButton = ({ filteredChallenges }: { filteredChallenges: Challenge[] }) => {
    const [value, setValue] = React.useState('walk');
    const { navigate } = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                    { value: 'walk', label: 'Walking' },
                    { value: 'train', label: 'Transit' },
                    { value: 'drive', label: 'Driving' },
                ]}
            />
            {value === 'walk' && (
                <FlatList
                    data={filteredChallenges}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Card style={{ flex: 1, margin: 12, width: '100%' }}>
                            <Card.Title
                                title={item.title}
                                left={(props) => (
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                        <Avatar.Icon icon={item.icon} size={20} style={{ marginRight: 8 }} />

                                    </View>
                                )}
                            />
                            <Card.Actions>
                                <Button onPress={() => {
                                    /*navigate(item.title)*/
                                    console.log(item.title+" pressed")
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});

export default SegmentedButton;