import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { myTheme } from "../Component/theme";
import { styles } from '../Component/style';

export default function SfideProgrammate() {
    // Array di sfide con date associate
    const sfideProgrammate = {
        "2025-02-01": [{ Titolo: "Triangoli", Argomento: "Geometria" }],
        "2025-02-03": [
            { Titolo: "Moto rettilineo", Argomento: "Fisica" },
            { Titolo: "Caduta libera", Argomento: "Fisica" },
        ],
        "2025-02-05": [{ Titolo: "Equazioni", Argomento: "Matematica" }],
        "2025-02-07": [{ Titolo: "Legami chimici", Argomento: "Chimica" }],
        "2025-02-09": [{ Titolo: "Algoritmi", Argomento: "Informatica" }],
    };

    // Stato per memorizzare il giorno selezionato
    const today = new Date().toISOString().split('T')[0]; // Data odierna in formato "YYYY-MM-DD"
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedChallenges, setSelectedChallenges] = useState(sfideProgrammate[today] || []);

    // Convertire le date in formato marcatori per il calendario
    const markedDates = Object.keys(sfideProgrammate).reduce((acc, date) => {
        acc[date] = {
            marked: true,
            dotColor: myTheme.colors.primary, // Colore del puntino
            activeOpacity: 0.8,
        };
        return acc;
    }, {});

    // Aggiungere lo stato di selezione
    if (selectedDate) {
        markedDates[selectedDate] = {
            ...markedDates[selectedDate],
            selected: true,
            selectedColor: myTheme.colors.primary, // Colore di sfondo del giorno selezionato
        };
    }

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
                Calendario delle Sfide
            </Text>
            <Calendar
                // Specifica i giorni marcati
                markedDates={markedDates}
                // Tema personalizzato
                theme={{
                    selectedDayBackgroundColor: myTheme.colors.primary,
                    todayTextColor: myTheme.colors.primary,
                    arrowColor: myTheme.colors.primary,
                }}
                // Evento clic sui giorni
                onDayPress={(day) => {
                    const challenges = sfideProgrammate[day.dateString] || [];
                    setSelectedDate(day.dateString); // Aggiorna il giorno selezionato
                    setSelectedChallenges(challenges); // Aggiorna le sfide selezionate
                }}
            />
            <View>
                {selectedChallenges.length === 0 ? (
                    <Text style={[styles.welcomeText,{margin: 10}]}>
                        Nessuna sfida in programma
                    </Text>
                ) : (
                    selectedChallenges.map((challenge, index) => (
                        <View key={index} style={[{margin: 10, marginTop:30}]}>
                            <View style={styles.mainWhiteCard}>
                                <View style={styles.section}>
                                    <View style={[styles.article, {margin: 10}]}>
                                        <Text style={styles.cardTitle}>
                                            {challenge.Titolo}
                                        </Text>
                                        <Text style={styles.subtitle}>
                                            Argomento: {challenge.Argomento}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </View>
        </View>
    );
}
