import React, {useContext, useEffect, useState} from "react";
import {View, ScrollView, Pressable, Animated, ImageBackground, } from "react-native";
import {Appbar, Card, Button, Text, TextInput, Avatar, ProgressBar, useTheme, Switch} from "react-native-paper";
import { styles } from "../App";
import { useNavigation } from "@react-navigation/native";

import FlatList = Animated.FlatList;

import {Sfida} from "../Component/Interfaces";
import setCurrentChallenge from "../Component/setCurrentChallenge";
import {StateContext} from "../Reducer";
import {PreferencesContext} from "../Component/PreferencesContext";


export default function HomeScreen() {
    const { navigate } = useNavigation();
    const [state,dispatch] = useContext(StateContext);
    const [sfida, setSfida] = useState("");
    const [index, setIndex] = useState("0");
    setCurrentChallenge(sfida);
    console.log(state.selectedChallenge)
    const theme = useTheme();
    const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);





    const challenges = [
        { id: "1", title: "Algebra", icon: "alpha-a-box" },
        { id: "2", title: "Geometria", icon: "alpha-g-box" },
        { id: "3", title: "Calcolo", icon: "alpha-c-box" },
        { id: "4", title: "Logaritmo", icon: "alpha-t-box" },
        { id: "5", title: "Equazioni", icon: "alpha-p-box" },
        { id: "6", title: "Statistica", icon: "alpha-s-box" },
        { id: "7", title: "Algebra", icon: "alpha-a-box" },
        { id: "8", title: "Geometria", icon: "alpha-g-box" },
        { id: "9", title: "Calcolo", icon: "alpha-c-box" },
        { id: "10", title: "Logaritmo", icon: "alpha-t-box" },
        { id: "11", title: "Equazioni", icon: "alpha-p-box" },
        { id: "12", title: "Statistica", icon: "alpha-s-box" },
    ];

    const [searchQuery, setSearchQuery] = useState("");

    const filteredChallenges = challenges.filter(challenge =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentScore = 75;
    const requiredScore = 100;

    return (
        <ScrollView >
            <Appbar.Header>
                <Appbar.Content
                    title="Mathify"

                />
                <Switch
                    color={'red'}
                    value={isThemeDark}
                    onValueChange={toggleTheme}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', flex:1 }}>
                    <View style={{ flex: 1 }}>
                        <ProgressBar
                            progress={currentScore / requiredScore}
                            color="orange"
                            style={{ height: 8, borderRadius: 4 }}


                        />

                    </View>
                    <View style={{ marginLeft: 8 }}>
                        <Text style={{ color: 'orange', fontWeight: 'bold' }}>
                            {currentScore}/{requiredScore}
                        </Text>
                    </View>
                </View>
            </Appbar.Header>

            <View style={styles.content}>
                <Card style={{ marginBottom: 16, width: "100%", position: "relative" }}>
                    {/* Immagine in alto a destra */}
                    <ImageBackground
                        source={{ uri: 'https://cdn.pixabay.com/photo/2017/05/02/15/05/addition-2278415_1280.jpg' }}
                        style={{flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 10,
                        }}
                        imageStyle={{ borderRadius: 10}}
                    >
                        <View style={{flex: 1, // Puoi anche aggiungere uno sfondo semitrasparente o altri elementi
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View style={{ alignItems: "center", marginVertical: 16 }}>
                                <Avatar.Icon icon="calculator" size={48} />
                                <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 8 }}>
                                    ARITMETICA
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>


                    <Card.Content>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                            <Avatar.Icon icon="clock" size={24} style={{ marginRight: 8 }} />
                            <Text style={{ fontSize: 14, color: "gray" }}>DURATA: 10 minuti</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                            <Avatar.Icon icon="format-list-numbered" size={24} style={{ marginRight: 8 }} />
                            <Text style={{ fontSize: 14, color: "gray" }}>DOMANDE: 15</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Avatar.Icon icon="star" size={24} style={{ marginRight: 8 }} />
                            <Text style={{ fontSize: 14, color: "gray" }}>PUNTI ESPERIENZA: 50</Text>
                        </View>
                    </Card.Content>
                    <Card.Actions style={{ justifyContent: "center" }}>
                        <Button
                            mode="contained"
                            onPress={() => {
                                navigate("Play"),
                                    setIndex(Math.floor(Math.random() ).toString()),
                                    setSfida("Sfida1")

                                ;
                            }}
                            contentStyle={{ height: 50 }}
                            labelStyle={{ fontSize: 16 }}
                            style={{ width: "100%", alignSelf: "center" }}
                        >
                            Play
                        </Button>
                    </Card.Actions>
                </Card>


                <Card style={{ flex: 1, padding: 16, borderRadius: 10, width: '100%' }}>
                    <TextInput
                        label="Cerca sfida"
                        mode="outlined"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        style={{ marginBottom: 16 }}
                    />
                    <FlatList
                        data={filteredChallenges}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <Card style={{ flex: 1, margin: 12, width: '48%' }}>
                                <Card.Title
                                    left={(props) => (
                                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                            <Avatar.Icon icon={item.icon} size={20} style={{ marginRight: 8 }} />
                                            <Text style={{ fontSize: 16 }}>{item.title}</Text>
                                        </View>
                                    )}
                                />
                                <Card.Actions>
                                    <Button onPress={() => navigate(item.title)} style={{ flex: 1 }}>Seleziona</Button>

                                </Card.Actions>
                            </Card>
                        )}
                        numColumns={2} // 2 card per riga
                    />
                </Card>
            </View>



        </ScrollView>
    );
}

