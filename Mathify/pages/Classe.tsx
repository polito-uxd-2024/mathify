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
        { firstName: 'Mario', lastName: 'Rossi', level: 11, specialita: 'Algebra', image: require('../assets/student.png') },
        { firstName: 'Alice Carlotta', lastName: 'La Greca', level: 22, specialita: 'Geometria',image: require('../assets/student_2.png') },
        { firstName: 'Giulia', lastName: 'Bianchi', level: 14, specialita: 'Logaritmi',image: require('../assets/gamer.png') },
        { firstName: 'Alberto', lastName: 'Fulcheri', level: 10, specialita: 'Trigonometria',image: require('../assets/student_3.png') },
        { firstName: 'Ilaria', lastName: 'Arduino', level: 35, specialita: 'Calcolo',image: require('../assets/little-red-riding-hood.png') },
        { firstName: 'Federico', lastName: 'Colombo', level: 12, specialita: 'Statistica',image: require('../assets/gamer_2.png') },
        { firstName: 'Marco', lastName: 'Colonna', level: 21, specialita: 'Probabilità',image: require('../assets/character.png') },
        { firstName: 'Sara', lastName: 'Marchese', level: 13, specialita: 'Equazioni',image: require('../assets/student_4.png') },
        { firstName: 'Paolo', lastName: 'Lazzarato', level: 45, specialita: 'Logaritmi',image: require('../assets/gamer_3.png') },
        { firstName: 'Chiara', lastName: 'Di Mella', level: 15, specialita: 'Algebra',image: require('../assets/student_5.png') },
    ];
    const [state] = useContext(StateContext)
    return (
        <ScrollView>
            <Appbar.Header style={styles.header}>
                <Appbar.Content title="Classe" />
            </Appbar.Header>
            <View style={[styles.mainContent, {backgroundColor:myTheme.colors.gray}]}>
                <View style={[styles.section]}>

                        <View>
                            <Card style={[styles.card, {backgroundColor: "white", paddingLeft: 10, borderColor: myTheme.colors.blue}]}>
                                <View style={{flexDirection: 'row', marginBottom: 10}}>
                                    <View style={{marginTop: 10}}>
                                        <Image source={require('../assets/teacher.png')} style={styles.cardImage}/>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 'auto', marginLeft: 'auto'}}>

                                        </View>
                                        <View>
                                            <Text style={styles.cardTitle}>Giovanni Rossi</Text>
                                            <Text style={styles.subtitle}>Professore di matematica</Text>
                                        </View>
                                    </View>
                                </View>
                            </Card>
                    </View>

                </View>
                <View style={[styles.section]}>
                <Text style={[styles.welcomeText]}>Classifica</Text>
                    <View style={[styles.grayCard, {backgroundColor: "white"}]}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginTop: 10, width: "100%"}}>
                            <View style={{flex: 1, flexDirection: 'column', alignItems:"flex-end"}}>
                                <Text>Chiara</Text>
                                <View style={{paddingTop: 20, backgroundColor: myTheme.colors.cardBorder, width:"50%", alignItems: "center"}}>
                                    <Text style={{fontSize: 40, fontFamily: 'Itim', color: 'white', fontWeight: 'bold'}}>3</Text>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column', alignItems:"center"}}>
                                <Text>Giulia</Text>
                                <View style={{paddingTop: 60, backgroundColor: myTheme.colors.cardBorder, width:"50%", alignItems: "center"}}>
                                    <Text style={{fontSize: 40, fontFamily: 'Itim', color: 'white', fontWeight: 'bold'}}>1</Text>
                                </View>
                            </View>
                            <View style={{flex: 1, flexDirection: 'column', alignItems:"flex-start"}}>
                                <Text>Sara</Text>
                                <View style={{paddingTop: 40, backgroundColor: myTheme.colors.cardBorder, width:"50%", alignItems: "center" }}>
                                    <Text style={{fontSize: 40, fontFamily: 'Itim', color: 'white', fontWeight: 'bold'}}>2</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>


                <View style={[styles.section]}>
                    <Text style={[styles.welcomeText]}>La tua classe</Text>
                    <View style={[{backgroundColor:myTheme.colors.gray}]}>
                    {classmates.map((classmate, index) => (
                        <View style={{width: '100%' }}>
                            <View >
                                <View>
                                    <Card style={[styles.card, {borderColor: myTheme.colors.primary, borderWidth: 3, marginVertical: 5}]}>
                                        <View style={{backgroundColor: myTheme.colors.gray, borderTopRightRadius: 18, borderTopLeftRadius: 18}}>
                                        <ImageBackground source={classmate.image} style={{ width: 100, height: 100, borderRadius: 10,marginLeft:75, marginTop:10 }} imageStyle={{ borderRadius: 10 }}/>
                                        <View style={{ position: 'absolute', top: 10, right: 10 }}>
                                            <FontAwesome
                                                name="star"
                                                size={50}
                                                color={myTheme.colors.blue}
                                            />
                                            <Text
                                                style={{
                                                    position: "absolute",
                                                    fontSize: 15,
                                                    fontWeight: 'bold',
                                                    color: "white",
                                                    textAlign: 'center',
                                                    top: 18,
                                                    left: 14,
                                                }}
                                            >
                                                {classmate.level}
                                            </Text>
                                        </View>
                                        </View>
                                        <Card.Content>

                                                <Text style={[styles.cardTitle]}>{classmate.firstName + " " + classmate.lastName} </Text>
                                                <Text style={[styles.subtitle]}>Specialità: {classmate.specialita}</Text>

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