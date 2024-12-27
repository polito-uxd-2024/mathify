import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, Card, List } from 'react-native-paper';
import { styles } from '../App';

export default function Materiale() {
    const [expanded, setExpanded] = useState<string | null>(null);

    const handlePress = (topic: string) => {
        setExpanded(expanded === topic ? null : topic);
    };

    return (
        <ScrollView style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Materiale" />
            </Appbar.Header>
            <View style={styles.content}>
                <Card style={styles.card}>

                    <Card.Content>
                        <List.Section>
                            <List.Accordion
                                title="Argomento 1"
                                expanded={expanded === 'argomento1'}
                                onPress={() => handlePress('argomento1')}
                            >
                                <List.Item title="Dettaglio 1" description="Descrizione del dettaglio 1" />
                                <List.Item title="Dettaglio 2" description="Descrizione del dettaglio 2" />
                            </List.Accordion>
                            <List.Accordion
                                title="Argomento 2"
                                expanded={expanded === 'argomento2'}
                                onPress={() => handlePress('argomento2')}
                            >
                                <List.Item title="Dettaglio 1" description="Descrizione del dettaglio 1" />
                                <List.Item title="Dettaglio 2" description="Descrizione del dettaglio 2" />
                            </List.Accordion>
                            {/* Add more topics here */}
                        </List.Section>
                    </Card.Content>
                </Card>
            </View>
        </ScrollView>
    );
}