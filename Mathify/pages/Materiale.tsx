import React from 'react';
import { View } from 'react-native';
import { Appbar, Card, Text } from 'react-native-paper';
import { styles } from '../App';

export default function Materiale() {
    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Materiale" />
            </Appbar.Header>
            <View style={styles.content}>
                <Card style={styles.card}>
                    <Card.Title title="Materiale Information" />
                    <Card.Content>
                        <Text style={styles.questionText}>Material details go here.</Text>
                    </Card.Content>
                </Card>
            </View>
        </View>
    );
}