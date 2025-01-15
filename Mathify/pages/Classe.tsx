import React from 'react';
import {Image, ScrollView, View} from 'react-native';
import { Appbar, Card, Text } from 'react-native-paper';
import { styles } from '../Component/style';

export default function Classe() {

    const classmates = [
        { firstName: 'Mario', lastName: 'Rossi', level: 11, specialita: 'Algebra' },
        { firstName: 'Luigi', lastName: 'Verdi', level: 7, specialita: 'Geometria Analitica' },
        { firstName: 'Giulia', lastName: 'Bianchi', level: 14, specialita: 'Logaritmi' },
        { firstName: 'Francesca', lastName: 'Neri', level: 10, specialita: 'Trigonometria' },
        { firstName: 'Alessandro', lastName: 'Gialli', level: 8, specialita: 'Calcolo' },
        { firstName: 'Elena', lastName: 'Blu', level: 12, specialita: 'Statistica' },
        { firstName: 'Marco', lastName: 'Viola', level: 9, specialita: 'Probabilità' },
        { firstName: 'Sara', lastName: 'Verde', level: 13, specialita: 'Matematica Discreta' },
        { firstName: 'Paolo', lastName: 'Marrone', level: 6, specialita: 'Teoria dei Numeri' },
        { firstName: 'Chiara', lastName: 'Rosa', level: 15, specialita: 'Analisi Complessa' },
    ];
    return (
        <ScrollView>
            <Appbar.Header>
                <Appbar.Content title="Classe" />
            </Appbar.Header>
            <View style={styles.content}>
                <View style={styles.section}>
                    <Text style={styles.sectionText}>Prof</Text>
                        <View style={styles.cardBase}>
                            <Card style={styles.card}>
                                <Card.Content>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Image source={require('../assets/placeholder.jpg')} style={{width: 80, height: 80, marginRight: 10, borderRadius: 100}}/>
                                        <View>
                                            <Card.Title title={'Giovanna Verdi'} />
                                        </View>
                                    </View>
                                </Card.Content>
                            </Card>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionText}>Top Tear</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', marginTop: 10}}>
                        <View style0={{flex: 1, flexDirection: 'column-reverse'}}>
                            <Text>Mario Rossi</Text>
                            <View style={{paddingTop: 20, backgroundColor: 'gray' }}><Text>3</Text></View>
                        </View>
                        <View style0={{flex: 1, flexDirection: 'column'}}>
                            <Text>Marco Viola</Text>
                            <View style={{paddingTop: 60, backgroundColor: 'gray'}}><Text>1</Text></View>
                        </View>
                        <View style0={{flex: 1, flexDirection: 'column-reverse'}}>
                            <Text>Chiara Rosa</Text>
                            <View style={{paddingTop: 40, backgroundColor: 'gray'}}><Text>2</Text></View>
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionText}>Classmates</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingTop: 30}}>
                    {classmates.map((classmate, index) => (
                        <View style={{width: '33.33%' }}>
                            <View style={{padding: 10}}>
                                <View style={styles.cardBase}>
                                    <Card style={styles.card}>
                                        <Card.Content>
                                            <Image source={require('../assets/placeholder.jpg')} style={{width: 80, height: 80, marginRight: 10, borderRadius: 100}}/>
                                            <View>
                                                <Card.Title title={classmate.firstName} />
                                                <Text>{classmate.lastName}</Text>
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