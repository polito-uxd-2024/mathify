import React, {useContext, useEffect, useState} from "react";
import {View, ScrollView, ImageBackground, SafeAreaView,} from "react-native";
import {Appbar, Card, Button, Text, Avatar, ProgressBar, Switch, TextInput} from "react-native-paper";
import { styles } from "../App";
import { useNavigation } from "@react-navigation/native";
import  {useSetCurrentChallenge} from "../Component/setCurrentChallenge";
import {StateContext} from "../Reducer";
import {PreferencesContext} from "../Component/PreferencesContext";
import SegmentedButton from "../Component/SegmentedButton";
import AllListChallenges from "./AllListChallenges";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {RootStackParamList} from "../Component/navigation";

export default function HomeScreen() {
    const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [state] = useContext(StateContext);











    const currentScore = 75;
    const requiredScore = 100;

    return (


        <ScrollView>

            <Appbar.Header style={{justifyContent: "space-between", alignItems: "center"}}>

                {/* Titolo Mathify */}
                <View style={{ flex: 1 }}>
                    <Appbar.Content
                        title="Mathify"
                        titleStyle={{textAlign: 'left', fontWeight: 'bold'}}
                    />
                </View>
                

                {/* Informazioni Utente e Barra */}
                <View style={{ flexDirection: 'column', alignItems: 'flex-end', flex: 1 }}>
                    {/* Nome Utente */}
                    <Text style={{fontWeight: 'bold', color: '#fff' }}>
                        {state.utente.nome} {state.utente.cognome}
                    </Text>

                    {/* Livello Utente */}
                    <Text style={{ color: 'orange', fontWeight: 'bold' }}>
                        Liv {state.utente.livello.numero} - {Math.round((state.utente.xp / state.utente.livello.xpTotali) * 100)}% {/* Percentuale calcolata */}
                    </Text>

                    {/* Barra di Progresso */}
                    <View style={{ flexDirection: 'column', alignItems: 'center', marginTop:4 }}>
                        <ProgressBar
                            progress={state.utente.xp / state.utente.livello.xpTotali} // Percentuale XP
                            color="orange"
                            style={{ height: 8, borderRadius: 4, width: 100 }}
                        />
                    </View>
                </View>

            </Appbar.Header>

            <View style={styles.content}>



                <Card style={{ flex: 1, padding: 16, borderRadius: 10, width: '100%' }}>

                    <SegmentedButton/>
                </Card>
            </View>

        </ScrollView>

    );
}