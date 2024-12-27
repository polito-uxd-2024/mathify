import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, Card, List, FAB, Searchbar, Menu, Divider } from 'react-native-paper';
import { styles } from '../App';

export default function Materiale() {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);

    const handlePress = (topic: string) => {
        setExpanded(expanded === topic ? null : topic);
    };

    const onChangeSearch = (query: string) => setSearchQuery(query);

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.Content title="Materiale Condiviso" />
                <Appbar.Action icon="magnify" onPress={() => {}} />
                <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={<Appbar.Action icon="dots-vertical" color="white" onPress={() => setMenuVisible(true)} />}
                >
                    <Menu.Item onPress={() => {}} title="Notifiche" />
                    <Menu.Item onPress={() => {}} title="Permessi di Modifica" />
                    <Divider />
                    <Menu.Item onPress={() => {}} title="Guida Rapida all'Uso" />
                </Menu>
            </Appbar.Header>
            <Searchbar
                placeholder="Cerca"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{ margin: 10 }}
            />
            <ScrollView style={styles.container}>
                <View style={styles.content}>
                    <Card style={styles.card}>
                        <Card.Title title="Documenti" />
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
                    {/* Add more categories like Video, Link Utili, Guide here */}
                </View>
            </ScrollView>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => {}}
            />
        </View>
    );
}