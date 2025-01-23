import React, {useContext, useState} from 'react';
import { View, ScrollView, Image, Modal, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar, Card, List, FAB, Searchbar, SegmentedButtons, IconButton } from 'react-native-paper';
import { styles } from '../Component/style';
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {MaterialeStackParamList} from "../Component/navigation";
import {useNavigation} from "@react-navigation/native";
import {StateContext} from "../Reducer";
import {useSetCurrentUser} from "../Component/setUser";

type Material = {
    title: string;
    topic: string;
    content: string;
    image: string;
};

export type PredefinedMaterial = {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    icon: string;
    image?: string;
};

const predefinedMaterials: PredefinedMaterial[] = [
    {
        id: '1',
        title: 'Funzione Quadratica',
        description: 'Una funzione polinomiale di secondo grado della forma f(x) = ax² + bx + c.',
        longDescription: 'La funzione quadratica è una funzione polinomiale di secondo grado che può essere rappresentata graficamente come una parabola. La forma generale è f(x) = ax² + bx + c, dove a, b e c sono costanti. La parabola può aprirsi verso l\'alto o verso il basso a seconda del segno di a. Le radici della funzione possono essere trovate usando la formula quadratica.',
        icon: 'sigma'
    },
    {
        id: '2',
        title: 'Teorema di Pitagora',
        description: 'In un triangolo rettangolo, il quadrato dell’ipotenusa è uguale alla somma dei quadrati dei cateti.',
        longDescription: 'Il teorema di Pitagora è un principio fondamentale della geometria che afferma che in un triangolo rettangolo, il quadrato della lunghezza dell\'ipotenusa è uguale alla somma dei quadrati delle lunghezze degli altri due lati. Questo teorema è utilizzato in molte applicazioni pratiche, come la misurazione delle distanze e la costruzione di edifici.',
        icon: 'triangle'
    },
    {
        id: '3',
        title: 'Derivate',
        description: 'Le derivate sono uno strumento fondamentale per calcolare il tasso di variazione di una funzione.',
        longDescription: 'La derivata di una funzione misura il tasso di variazione della funzione rispetto a una delle sue variabili. È uno strumento fondamentale in calcolo differenziale e ha molte applicazioni in fisica, ingegneria, economia e altre discipline. La derivata di una funzione f(x) è denotata f\'(x) e può essere interpretata come la pendenza della tangente alla curva di f(x) in un punto.',
        icon: 'function-variant'
    },
    {
        id: '4',
        title: 'Integrali',
        description: 'Gli integrali permettono di calcolare l’area sottesa da una curva.',
        longDescription: 'L\'integrale di una funzione è un concetto fondamentale in calcolo integrale che rappresenta l\'area sottesa dalla curva della funzione. Gli integrali sono utilizzati per calcolare aree, volumi, lunghezze di archi e altre quantità che possono essere interpretate come somme di infinitesimi. L\'integrale definito di una funzione f(x) su un intervallo [a, b] è denotato ∫[a, b] f(x) dx.',
        icon: 'integral'
    },
    {
        id: '5',
        title: 'Trigonometria',
        description: 'La trigonometria studia le relazioni tra gli angoli e i lati di un triangolo.',
        longDescription: 'La trigonometria è una branca della matematica che studia le relazioni tra gli angoli e i lati dei triangoli. Le funzioni trigonometriche principali sono seno, coseno e tangente, che sono utilizzate per descrivere le proprietà dei triangoli rettangoli. La trigonometria ha molte applicazioni in fisica, ingegneria, astronomia e altre scienze.',
        icon: 'cosine-wave'
    }
];

const suggestedByAlgorithm: PredefinedMaterial = {
    id: '6',
    title: 'Logaritmi',
    description: 'I logaritmi sono l\'inverso delle esponenziali.',
    longDescription: 'Il logaritmo di un numero è l\'esponente a cui deve essere elevata una base fissa per ottenere quel numero. I logaritmi sono l\'inverso delle funzioni esponenziali e sono utilizzati in molte applicazioni scientifiche e ingegneristiche. La base più comune è il logaritmo naturale, che ha come base il numero e (circa 2.718).',
    icon: 'chart-line',
    image: 'https://example.com/logarithms-image.png'
};

export default function Materiale() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>('explore');
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [newMaterial, setNewMaterial] = useState<PredefinedMaterial>({
        id: '',
        title: '',
        description: '',
        longDescription: '',
        icon: '',
        image: ''
    });
    const [addedMaterials, setAddedMaterials] = useState<PredefinedMaterial[]>([]);
    const [savedMaterials, setSavedMaterials] = useState<PredefinedMaterial[]>([]);
    const navigation=useNavigation<NativeStackNavigationProp<MaterialeStackParamList>>();
    const [state] = useContext(StateContext);
    console.log(state);
    useSetCurrentUser("Utente1");
    const onChangeSearch = (query: string) => setSearchQuery(query);

    const handleAddMaterial = () => {
        // Controlla se i campi di newMaterial (escluso id) sono vuoti


        const isValid = Object.entries(newMaterial)
            .filter(([key]) => key !== 'id') // Esclude il campo 'id'
            .every(([, value]) => value.trim() !== "");

        if (!isValid) {
            alert("Tutti i campi devono essere compilati!"); // Messaggio di errore
            return;
        }

        // Aggiungi il nuovo materiale se i campi sono validi
        setAddedMaterials([...addedMaterials, newMaterial]);
        setModalVisible(false);

        // Resetta newMaterial
        setNewMaterial({
            id: '',
            title: '',
            description: '',
            longDescription: '',
            icon: '',
            image: ''
        });

    };


    const handleSaveMaterial = (material: PredefinedMaterial) => {
        if (!savedMaterials.find((m) => m.id === material.id)) {
            setSavedMaterials([...savedMaterials, material]);
        }
    };

    const handleTopicPress = (material: PredefinedMaterial) => {
        // Handle the topic press event here
        console.log('Topic pressed:', material);
        navigation.navigate('MaterialeDetail', { Materiale: material });
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
                    { value: 'created', label: 'Materiale Aggiunto' },
                ]}
                style={{ margin: 10 }}
            />

            {/* Scrollable Content */}
            <ScrollView>
                {activeTab === 'explore' && (
                    <>
                        {/* Suggested by Algorithm */}
                        <Card style={styles.card}>
                            <Card.Title title="Argomento Proposto per Te" subtitle="Suggerito dall'algoritmo" />
                            <Card.Content>
                                <Image
                                    source={{ uri: suggestedByAlgorithm.image }}
                                    style={{ height: 150, marginBottom: 10, borderRadius: 8 }}
                                />
                                <TouchableOpacity onPress={() => handleTopicPress(suggestedByAlgorithm)}>
                                    <List.Item
                                        title={suggestedByAlgorithm.title}
                                        description={suggestedByAlgorithm.description}
                                        left={() => <List.Icon icon={suggestedByAlgorithm.icon} />}
                                        right={() => (
                                            <IconButton
                                                icon="bookmark"
                                                onPress={() => handleSaveMaterial(suggestedByAlgorithm)}
                                            />
                                        )}
                                    />
                                </TouchableOpacity>
                            </Card.Content>
                        </Card>

                        {/* Suggested Topics */}
                        <Card style={styles.card}>
                            <Card.Title title="Argomenti Suggeriti" />
                            <Card.Content>
                                {predefinedMaterials.slice(0, 3).map((material) => (
                                    <TouchableOpacity key={material.id} onPress={() => handleTopicPress(material)}>
                                        <List.Item
                                            title={material.title}
                                            description={material.description}
                                            left={() => <List.Icon icon={material.icon} />}
                                            right={() => (
                                                <IconButton
                                                    icon="bookmark"
                                                    onPress={() => handleSaveMaterial(material)}
                                                />
                                            )}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </Card.Content>
                        </Card>

                        {/* Popular Topics */}
                        <Card style={styles.card}>
                            <Card.Title title="Argomenti Popolari" />
                            <Card.Content>
                                {predefinedMaterials.slice(3).map((material) => (
                                    <TouchableOpacity key={material.id} onPress={() => handleTopicPress(material)}>
                                        <List.Item
                                            title={material.title}
                                            description={material.description}
                                            left={() => <List.Icon icon={material.icon} />}
                                            right={() => (
                                                <IconButton
                                                    icon="bookmark"
                                                    onPress={() => handleSaveMaterial(material)}
                                                />
                                            )}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </Card.Content>
                        </Card>
                    </>
                )}

                {activeTab === 'saved' && (
                    <Card style={styles.card}>
                        <Card.Title title="Materiale Salvato" />
                        <Card.Content>
                            <List.Section>
                                {savedMaterials.map((material) => (
                                    <TouchableOpacity key={material.id} onPress={() => handleTopicPress(material)}>
                                        <List.Item
                                            title={material.title}
                                            description={material.description}
                                            left={() => <List.Icon icon={material.icon} />}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </List.Section>
                        </Card.Content>
                    </Card>
                )}

                {activeTab === 'created' && (
                    <>
                        {addedMaterials.map((material, index) => (
                            <Card style={styles.card} key={index}>
                                <Card.Title title={material.title} subtitle={material.description} />
                                <Card.Content>
                                    <Text>{material.longDescription}</Text>
                                    {material.image ? (
                                        <Image
                                            source={{ uri: material.image }}
                                            style={{ height: 150, marginVertical: 10, borderRadius: 8 }}
                                        />
                                    ) : null}
                                </Card.Content>
                            </Card>
                        ))}
                    </>
                )}
            </ScrollView>

            {/* Floating Action Button */}
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => state.utente.livello.numero>=10?setModalVisible(true):alert("Non hai il livello sufficiente per aggiungere materiale, Raggiungi il livello 10!!!")}
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
                        <Text>Aggiungi Materiale</Text>
                        <TextInput
                            style={MaterialStyles.input}
                            placeholder="Titolo"
                            value={newMaterial.title}
                            onChangeText={(text) => setNewMaterial({ ...newMaterial, title: text })}
                        />
                        <TextInput
                            style={MaterialStyles.input}
                            placeholder="Descrizione"
                            value={newMaterial.description}
                            onChangeText={(text) => setNewMaterial({ ...newMaterial, description: text })}
                        />
                        <TextInput
                            style={[MaterialStyles.input, { height: 80 }]}
                            placeholder="Descrizione Lunga"
                            multiline
                            value={newMaterial.longDescription}
                            onChangeText={(text) => setNewMaterial({ ...newMaterial, longDescription: text })}
                        />
                        <TextInput
                            style={MaterialStyles.input}
                            placeholder="Icona"
                            value={newMaterial.icon}
                            onChangeText={(text) => setNewMaterial({ ...newMaterial, icon: text })}
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    input: {
        marginBottom: 10,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});