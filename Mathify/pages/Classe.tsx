import React, {useContext} from 'react';
import {Image, ScrollView, View} from 'react-native';
import {Appbar, Avatar, Card, Text} from 'react-native-paper';
import { styles } from '../Component/style';
import {StateContext} from "../Reducer";
import {MaterialCommunityIcons} from "@expo/vector-icons";

export default function Classe() {

    const classmates = [
        { firstName: 'Mario', lastName: 'Rossi', level: 11, specialita: 'Algebra' },
        { firstName: 'Carlotta', lastName: 'La Greca', level: 7, specialita: 'Geometria' },
        { firstName: 'Giulia', lastName: 'Bianchi', level: 14, specialita: 'Logaritmi' },
        { firstName: 'Alberto', lastName: 'Fulcheri', level: 10, specialita: 'Trigonometria' },
        { firstName: 'Ilaria', lastName: 'Arduino', level: 8, specialita: 'Calcolo' },
        { firstName: 'Federico', lastName: 'Colombo', level: 12, specialita: 'Statistica' },
        { firstName: 'Marco', lastName: 'Colonna', level: 9, specialita: 'Probabilità' },
        { firstName: 'Sara', lastName: 'Marchese', level: 13, specialita: 'Equazioni' },
        { firstName: 'Paolo', lastName: 'Lazzarato', level: 6, specialita: 'Logaritmi' },
        { firstName: 'Chiara', lastName: 'Di Mella', level: 15, specialita: 'Algebra' },
    ];
    const [state] = useContext(StateContext)
    return (
        <ScrollView>
            <Appbar.Header>
                <Appbar.Content title="Classe" />
            </Appbar.Header>
            <View style={styles.content}>
                <View style={[styles.section, {marginRight:5, marginLeft:5}]}>

                        <View style={[styles.cardBase, {}]}>
                            <Card style={styles.card}>
                                <View style={{flexDirection: 'row', marginBottom: 10, marginHorizontal: 10}}>
                                    <View style={{marginTop: 10}}>
                                        <Image source={require('../assets/placeholder.jpg')} style={styles.cardImage}/>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 'auto', marginLeft: 'auto'}}>

                                        </View>
                                        <View>
                                            <Text style={styles.cardTitle}>Giovanni Rossi</Text>
                                            <Text style={styles.subtitle}>Professoressa di matematica</Text>
                                        </View>
                                    </View>
                                </View>
                            </Card>
                    </View>
                </View>
                <View style={styles.section}>
                <Text style={[styles.welcomeText, {marginTop:30, marginLeft:5}]}>Classifica</Text>
                <View style={styles.grayCard}>

                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginTop: 10, width: "100%"}}>
                        <View style={{flex: 1, flexDirection: 'column', alignItems:"flex-end"}}>
                            <Text>Chiara</Text>
                            <View style={{paddingTop: 20, backgroundColor: '#CD7F32', width:"50%", alignItems: "flex-end"}}><Text>
                                <MaterialCommunityIcons
                                    name="star"
                                    size={40}
                                    color="white"
                                />
                            </Text></View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'column', alignItems:"center"}}>
                            <Text>Giulia</Text>
                            <View style={{paddingTop: 60, backgroundColor: '#FFD700', width:"50%", alignItems: "center"}}><Text>
                                <MaterialCommunityIcons
                                    name="trophy"
                                    size={40}
                                    color="white"
                                />
                            </Text></View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'column', alignItems:"flex-start"}}>
                            <Text>Sara</Text>
                            <View style={{paddingTop: 40, backgroundColor: '#C0C0C0', width:"50%" }}><Text>
                                <MaterialCommunityIcons
                                    name="medal"
                                    size={40}
                                    color="white"
                                />
                            </Text></View>
                        </View>
                    </View>
                </View>
                </View>
                <View style={styles.section}>
                    <Text style={[styles.welcomeText, {marginTop:30, marginLeft:5}]}>La tua classe</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingTop: 30}}>
                    {classmates.map((classmate, index) => (
                        <View style={{width: '50%' }}>
                            <View style={{padding: 10}}>
                                <View style={styles.cardBase}>
                                    <Card style={styles.card}>
                                        <Card.Content>
                                            <Image source={require('../assets/placeholder.jpg')} style={{width: 80, height: 80, marginRight: 10, borderRadius: 100}}/>
                                            <View>
                                                <Card.Title title={classmate.firstName + " " + classmate.lastName} />
                                                <Text>Livello {classmate.level}</Text>
                                                <Text>Specialità: {classmate.specialita}</Text>
                                            </View>
                                        </Card.Content>
                                    </Card>
                                </View>
                            </View>
                        </View>
                    ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}