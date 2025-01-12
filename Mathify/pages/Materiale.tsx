import React, { useState } from 'react';
import {View, ScrollView, Image, Modal, Text, TextInput, Button, StyleSheet} from 'react-native';
import { Appbar, Card, List, FAB, Searchbar, SegmentedButtons } from 'react-native-paper';
import {styles} from "../App";

export default function Materiale() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('explore');
    const [modalVisible, setModalVisible] = useState(false);
    const [newMaterial, setNewMaterial] = useState({ title: '', topic: '', content: '', image: '' });

    const onChangeSearch = (query: string) => setSearchQuery(query);

    const handleAddMaterial = () => {
        // Logic to save the new material (e.g., update state or send to backend)
        console.log('New Material:', newMaterial);
        setModalVisible(false);
        setNewMaterial({ title: '', topic: '', content: '', image: '' });
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Appbar */}
            <Appbar.Header>
                <Appbar.Content title="Materiale" />
            </Appbar.Header>

            {/* Searchbar */}
            <Searchbar
                placeholder="Cerca un argomento"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={{ margin: 10 }}
            />

            {/* Segmented Buttons */}
            <SegmentedButtons
                value={activeTab}
                onValueChange={setActiveTab}
                buttons={[
                    { value: 'explore', label: 'Esplora' },
                    { value: 'saved', label: 'Materiale Salvato' },
                ]}
                style={{ margin: 10 }}
            />

            {/* Scrollable Content */}
            <ScrollView style={styles.container}>
                {activeTab === 'explore' && (
                    <>
                        {/* Function of the Day Section */}
                        <Card style={styles.card}>
                            <Card.Title title="Funzione del Giorno" subtitle="Scopri una nuova funzione matematica!" />
                            <Card.Content>
                                <Image
                                    source={{ uri: 'https://example.com/function-image.png' }}
                                    style={{ height: 150, marginBottom: 10, borderRadius: 8 }}
                                />
                                <List.Item
                                    title="Funzione Quadratica"
                                    description="Una funzione quadratica è una funzione polinomiale di secondo grado della forma f(x) = ax² + bx + c."
                                    left={() => <List.Icon icon="sigma" />}
                                />
                            </Card.Content>
                        </Card>

                        {/* Today's Most Viewed Section */}
                        <Card style={styles.card}>
                            <Card.Title title="Oggi" subtitle="Più visti" />
                            <Card.Content>
                                <List.Section>
                                    <List.Item title="Articolo 1" description="Descrizione dell'articolo 1" left={() => <List.Icon icon="file-document" />} />
                                    <List.Item title="Articolo 2" description="Descrizione dell'articolo 2" left={() => <List.Icon icon="file-document" />} />
                                    <List.Item title="Articolo 3" description="Descrizione dell'articolo 3" left={() => <List.Icon icon="file-document" />} />
                                    <List.Item title="Articolo 4" description="Descrizione dell'articolo 4" left={() => <List.Icon icon="file-document" />} />
                                </List.Section>
                            </Card.Content>
                        </Card>

                        {/* Additional Categories */}
                        <Card style={styles.card}>
                            <Card.Title title="Argomenti Popolari" />
                            <Card.Content>
                                <List.Section>
                                    <List.Item title="Argomento 1" description="Breve descrizione dell'argomento 1" left={() => <List.Icon icon="folder" />} />
                                    <List.Item title="Argomento 2" description="Breve descrizione dell'argomento 2" left={() => <List.Icon icon="folder" />} />
                                    <List.Item title="Argomento 3" description="Breve descrizione dell'argomento 3" left={() => <List.Icon icon="folder" />} />
                                </List.Section>
                            </Card.Content>
                        </Card>
                    </>
                )}

                {activeTab === 'saved' && (
                    <Card style={styles.card}>
                        <Card.Title title="Materiale Salvato" />
                        <Card.Content>
                            <List.Section>
                                <List.Item title="Articolo Salvato 1" description="Descrizione dell'articolo salvato 1" left={() => <List.Icon icon="bookmark" />} />
                                <List.Item title="Articolo Salvato 2" description="Descrizione dell'articolo salvato 2" left={() => <List.Icon icon="bookmark" />} />
                                <List.Item title="Articolo Salvato 3" description="Descrizione dell'articolo salvato 3" left={() => <List.Icon icon="bookmark" />} />
                            </List.Section>
                        </Card.Content>
                    </Card>
                )}
            </ScrollView>

            {/* Floating Action Button */}
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => setModalVisible(true)}
            />

            {/* Modal for Adding Material */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={MaterialStyles.modalContainer}>
                    <View style={MaterialStyles.modalContent}>
                        <Text >Aggiungi Materiale</Text>
                        <TextInput
                            style={MaterialStyles.input}
                            placeholder="Titolo"
                            value={newMaterial.title}
                            onChangeText={(text) => setNewMaterial({ ...newMaterial, title: text })}
                        />
                        <TextInput
                            style={MaterialStyles.input}
                            placeholder="Argomento"
                            value={newMaterial.topic}
                            onChangeText={(text) => setNewMaterial({ ...newMaterial, topic: text })}
                        />
                        <TextInput
                            style={[MaterialStyles.input, { height: 80 }]}
                            placeholder="Contenuto"
                            multiline
                            value={newMaterial.content}
                            onChangeText={(text) => setNewMaterial({ ...newMaterial, content: text })}
                        />
                        <TextInput
                            style={MaterialStyles.input}
                            placeholder="URL Immagine"
                            value={newMaterial.image}
                            onChangeText={(text) => setNewMaterial({ ...newMaterial, image: text })}
                        />
                        <View style={MaterialStyles.modalButtons}>
                            <Button title="Annulla" onPress={() => setModalVisible(false)} />
                            <Button title="Aggiungi" onPress={handleAddMaterial} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const MaterialStyles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Sfondo semi-trasparente
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#ffffff', // Sfondo del contenuto del modale
        borderRadius: 10,
        padding: 20,
        elevation: 5, // Ombra su Android
        shadowColor: '#000', // Ombra su iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    input: {
        marginBottom: 10,
    }
});