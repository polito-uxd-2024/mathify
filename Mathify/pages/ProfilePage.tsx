import {FlatList, ImageBackground, View} from "react-native";
import { styles } from "../App";
import {Appbar, Card, Text, Button, IconButton} from "react-native-paper";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {ProfileStackParamList, RootStackParamList} from "../Component/navigation";
import {useSetCurrentUser} from "../Component/setUser";
import {StateContext} from "../Reducer";
import {useCallback, useContext} from "react";
import * as React from "react";

export default function ProfilePage() {
    const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
    const [state] = useContext(StateContext);
    useSetCurrentUser("Utente1");

    return (

            <View>
                <Card >
                    {/* Immagine */}
                    <Card.Content>
                        <ImageBackground
                            source={{ uri: 'https://cdn.pixabay.com/photo/2017/05/02/15/05/addition-2278415_1280.jpg' }}
                            style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 2,marginBottom:10}}
                            imageStyle={{ borderRadius: 0}}
                        >
                            {/* Tasto Impostazioni in alto a destra */}
                            <IconButton
                                icon="cog"  // Icona per le impostazioni
                                size={30}
                                onPress={() => {
                                    // Azione per il bottone delle impostazioni
                                    navigation.navigate("Impostazioni");
                                }}
                                style={{
                                    position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(255, 255, 255, 0.2)', // Colore di sfondo semitrasparente per visibilità
                                    borderRadius: 50, // Rende il bottone circolare
                                }}
                            />
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
                                <View style={{ alignItems: "center", marginVertical: 100 }}>
                                </View>
                            </View>
                        </ImageBackground>
                    </Card.Content>

                    {/* Nome e cognome */}
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft:20}}>
                            {state.utente.nome} {state.utente.cognome}
                        </Text>
                    </View>

                    {/* Visualizza email */}
                    <View style={{ paddingHorizontal: 16 }}>
                        <Text style={{ fontSize: 14, color: 'gray' }}>
                            {state.utente.email}
                        </Text>
                    </View>



                </Card>

                <View >
                    <Card >
                        <Card.Title title="Profile Information" />
                        <Card.Content>
                            <View>
                                <Text >Name: John Doe</Text>
                                <Text>Email:</Text>
                            </View>
                        </Card.Content>

                        <Card.Actions>
                            <Button onPress={() => {
                                navigation.navigate("Impostazioni");
                            }}>
                                Impostazioni
                            </Button>
                        </Card.Actions>
                    </Card>
                </View>

                <FlatList data={state.utente.sfideCompletate} renderItem={
                    ({ item }) => (
                        <View style={styles.cardBase}>
                            <Card style={styles.card}>
                                <Card.Title title={item.id} />
                                <Card.Content>
                                    <Text>{item.punteggio}</Text>
                                    <Text style={styles.callout}>
                                        <Text>{item.xpGuadagnati} XP</Text>
                                    </Text>

                                </Card.Content>
                            </Card>
                        </View>
                    )
                }/>
            </View>

    );
}