import * as React from 'react';
import {View, Text, FlatList, TextComponent} from 'react-native';
import {Card, Icon, MD3Colors} from 'react-native-paper';
import {styles} from "../Component/style";
import {timeAgo} from "../Component/timeago";


export default function SfideCompletate() {
    const sfideCompletate = [
        { id: 'Sfida1', titolo: 'Circonferenze', argomento: 'Geometria Analitica', difficolta: 1, tempoimpiegato: 234, xp: 600, datacompletamento: "2025-01-04T14:26:19.138975" },
        { id: 'Sfida2', titolo: 'Equazioni di secondo grado', argomento: 'Algebra', difficolta: 2, tempoimpiegato: 234, xp: 230, datacompletamento: "2025-01-04T14:26:19.138975" },
        { id: 'Sfida3', titolo: 'Parabole', argomento: 'Geometria Analitica', difficolta: 3, tempoimpiegato: 234, xp: 550, datacompletamento: "2025-01-04T14:26:19.138975" },
        { id: 'Sfida4', titolo: 'Integrali notevoli', argomento: 'Integrali', difficolta: 4, tempoimpiegato: 234, xp: 670, datacompletamento: "2025-01-04T14:26:19.138975" },
        { id: 'Sfida5', titolo: 'Integrali impropri', argomento: 'Integrali', difficolta: 5, tempoimpiegato: 234, xp: 120, datacompletamento: "2025-01-04T14:26:19.138975" },
    ].map(sfida => ({
        ...sfida,
        stringacompletamento: timeAgo(sfida.datacompletamento)
    }));
    return (
            <View style={styles.section}>
            <FlatList
                data={sfideCompletate}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.article}>
                        <View style={styles.cardBase}>
                            <Card style={styles.card}>
                                <Card.Title title={item.titolo} />
                                <Card.Content>
                                    <Text>{item.argomento}</Text>
                                    <Text style={styles.callout}>
                                        <Icon size={20} source="star" color='white' />
                                        <Text>{item.xp} XP</Text>
                                        <Icon size={20} source="star" color='white' />
                                    </Text>
                                    <Text>{item.stringacompletamento}</Text>
                                </Card.Content>
                            </Card>
                        </View>
                    </View>
                )}
            />
            </View>

    );
}

