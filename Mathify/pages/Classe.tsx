import React, {useContext} from 'react';
import {Image, ImageBackground, ScrollView, View} from 'react-native';
import {Appbar, Avatar, Card, Text} from 'react-native-paper';
import { styles } from '../Component/style';
import {StateContext} from "../Reducer";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {myTheme} from "../Component/theme";
import {FontAwesome} from "react-native-vector-icons";

export default function Classe() {

    const classmates = [
        { firstName: 'Mario', lastName: 'Rossi', level: 11, specialita: 'Algebra' },
        { firstName: 'Alice Carlotta', lastName: 'La Greca', level: 22, specialita: 'Geometria' },
        { firstName: 'Giulia', lastName: 'Bianchi', level: 14, specialita: 'Logaritmi' },
        { firstName: 'Alberto', lastName: 'Fulcheri', level: 10, specialita: 'Trigonometria' },
        { firstName: 'Ilaria', lastName: 'Arduino', level: 35, specialita: 'Calcolo' },
        { firstName: 'Federico', lastName: 'Colombo', level: 12, specialita: 'Statistica' },
        { firstName: 'Marco', lastName: 'Colonna', level: 21, specialita: 'Probabilità' },
        { firstName: 'Sara', lastName: 'Marchese', level: 13, specialita: 'Equazioni' },
        { firstName: 'Paolo', lastName: 'Lazzarato', level: 45, specialita: 'Logaritmi' },
        { firstName: 'Chiara', lastName: 'Di Mella', level: 15, specialita: 'Algebra' },
    ];
    const [state] = useContext(StateContext)
    return (
        <ScrollView>
            <Appbar.Header>
                <Appbar.Content title="Classe" />
            </Appbar.Header>
            <View style={styles.content}>
                <View style={[styles.section, {marginRight:30, marginLeft:30}]}>

                        <View>
                            <Card style={[styles.card, {backgroundColor: myTheme.colors.gray}]}>
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
                                    color={myTheme.colors.gray}
                                />
                            </Text></View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'column', alignItems:"center"}}>
                            <Text>Giulia</Text>
                            <View style={{paddingTop: 60, backgroundColor: '#FFD700', width:"50%", alignItems: "center"}}><Text>
                                <MaterialCommunityIcons
                                    name="trophy"
                                    size={40}
                                    color={myTheme.colors.gray}
                                />
                            </Text></View>
                        </View>
                        <View style={{flex: 1, flexDirection: 'column', alignItems:"flex-start"}}>
                            <Text>Sara</Text>
                            <View style={{paddingTop: 40, backgroundColor: '#C0C0C0', width:"50%" }}><Text>
                                <MaterialCommunityIcons
                                    name="medal"
                                    size={40}
                                    color={myTheme.colors.gray}
                                />
                            </Text></View>
                        </View>
                    </View>
                </View>
                </View>
                <View style={styles.section}>
                    <Text style={[styles.welcomeText, {marginTop:30, marginLeft:5}]}>La tua classe</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingTop: 30, backgroundColor:myTheme.colors.gray, borderWidth: 2, marginTop: 5, borderColor: 'black', borderRadius: 20, padding: 16, marginLeft:15, marginRight:15, marginBottom:5}}>
                    {classmates.map((classmate, index) => (
                        <View style={{width: '100%' }}>
                            <View style={{padding: 10}}>
                                <View >
                                    <Card style={[styles.card, {backgroundColor: myTheme.colors.gray}]}>
                                        <ImageBackground source={require('../assets/placeholder.jpg')} style={{ width: '100%', height: 200, borderRadius: 10, overflow: 'hidden' }} imageStyle={{ borderRadius: 10 }}/>
                                        <View style={{ position: 'absolute', top: 10, right: 10 }}>
                                            <FontAwesome
                                                name="star"
                                                size={70}
                                                color={myTheme.colors.blue}
                                            />
                                            <Text
                                                style={{
                                                    position: "absolute",
                                                    fontSize: 20,
                                                    fontWeight: 'bold',
                                                    color: myTheme.colors.primary,
                                                    textAlign: 'center',
                                                    top: 23,
                                                    left: 20,
                                                }}
                                            >
                                                {classmate.level}
                                            </Text>
                                        </View>
                                        <Card.Content>
                                            <View>
                                                <Card.Title title={classmate.firstName + " " + classmate.lastName} />
                                                <Text style={styles.sectionText}>Specialità: {classmate.specialita}</Text>
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