import {styles} from "../Component/style";
import {Button, Card} from "react-native-paper";
import {View, Text, ScrollView} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {ProfileStackParamList} from "../Component/navigation";
import React, {useContext} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {StateContext} from "../Reducer";

export default function Impostazioni() {
    const navigation=useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
    const [state] = useContext(StateContext);

    return (
        <ScrollView>
            <Card style={{  padding: 16, borderRadius: 10, width: '80%', alignSelf: 'center' }}>
                <Card.Content>
                    <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 20 }}>
                        Account Studente
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
                        <Text style={{ fontSize: 14, marginLeft: 7, color: "gray",marginRight: 8 }}>
                            {state.utente.verifica ? "Verificato" : "Non verificato"}
                        </Text>
                        <MaterialCommunityIcons
                            name="information"
                            size={20}
                            color="gray" />
                    </View>
                    <Button
                        onPress={()=>navigation.navigate("Verifica")}
                        style={{backgroundColor: 'white', paddingVertical: 12, borderRadius: 8, elevation: 3, justifyContent: 'center', marginBottom: 10}}
                    >
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                            Verifica >
                        </Text>
                    </Button>
                </Card.Content>
            </Card>

            <Card style={{  marginTop:15,padding: 16, borderRadius: 10, width: '80%', alignSelf: 'center' }}>
                <Card.Content>
                    <Text style={{ fontSize: 25, fontWeight: "bold", marginLeft: 20 }}>
                        La mia Classe
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
                        <Text style={{ fontSize: 25, marginLeft: 7, color: "black",marginRight: 8 }}>
                           5A
                        </Text>
                        <Text style={{ fontSize: 14, marginLeft: 7, color: "gray",marginRight: 8 }}>
                            Prof Giovanni Rossi
                        </Text>
                        <Text style={{ fontSize: 14, marginLeft: 7, color: "gray",marginRight: 8 }}>
                            Alberto, Carlotta, Ilaria, Federico....
                        </Text>
                    </View>
                    <Button style={{backgroundColor: 'white', paddingVertical: 12, borderRadius: 8, elevation: 3, justifyContent: 'center', marginTop:10}}>
                        <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                            Gestisci >
                        </Text>
                    </Button>
                </Card.Content>
            </Card>

            <Card style={{  marginTop:15,padding: 16, borderRadius: 10, width: '80%', alignSelf: 'center' }}>
                <Button style={{backgroundColor: 'white', paddingVertical: 12, borderRadius: 8, elevation: 3, justifyContent: 'center', marginBottom: 10}}>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                        Preferenze >
                    </Text>
                </Button>
                <Button style={{backgroundColor: 'white', paddingVertical: 12, borderRadius: 8, elevation: 3, justifyContent: 'center', marginBottom: 10}}>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                        Profilo >
                    </Text>
                </Button>
                <Button style={{backgroundColor: 'white', paddingVertical: 12, borderRadius: 8, elevation: 3, justifyContent: 'center', marginBottom: 10}}>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                      Pagine Modificate >
                    </Text>
                </Button>
                <Button style={{backgroundColor: 'white', paddingVertical: 12, borderRadius: 8, elevation: 3, justifyContent: 'center', marginBottom: 10}}>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                        Segnalazioni >
                    </Text>
                </Button>
                <Button style={{backgroundColor: 'white', paddingVertical: 12, borderRadius: 8, elevation: 3, justifyContent: 'center', marginBottom: 10}}>
                    <Text style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                        Supporto >
                    </Text>
                </Button>
            </Card>

            <Card style={{ flex: 1, marginTop: 15, padding: 16, borderRadius: 10, width: '100%', alignSelf: 'center' }}>
                {/* Nome e cognome con il bottone "ESCI" */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
                        {state.utente.nome} {state.utente.cognome}
                    </Text>

                    <Button>
                        <MaterialCommunityIcons
                            name="door-open"
                            size={20}
                            color="#e74c3c"
                            style={{ marginRight: 5 }}
                        />
                        <Text style={{ fontSize: 14, color: "#e74c3c" }}>
                            ESCI
                        </Text>
                    </Button>
                </View>

                {/* Visualizza email */}
                <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
                    <Text style={{ fontSize: 14, marginLeft: 7, color: "gray" }}>
                        {state.utente.email}
                    </Text>
                </View>
            </Card>

        </ScrollView>
    );
}