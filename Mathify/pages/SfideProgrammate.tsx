import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { myTheme } from "../Component/theme";
import { styles } from '../Component/style';

export default function SfideProgrammate() {
    // Array di sfide con date, orario e nome del professore associati
    const sfideProgrammate = {
        "2025-02-10": [
            { Titolo: "Triangoli", Argomento: "Geometria", Orario: "10:00", Professore: "Prof. Rossi" },
        ],
        "2025-02-15": [
            { Titolo: "Media ponderata", Argomento: "Statistica", Orario: "09:00", Professore: "Prof.ssa Bianchi" },
            { Titolo: "Calcolo combinatorio", Argomento: "Probabilità", Orario: "11:30", Professore: "Prof. Verdi" },
        ],
        "2025-02-05": [
            { Titolo: "Equazioni", Argomento: "Algebra", Orario: "14:00", Professore: "Prof.ssa Neri" },
        ],
        "2025-02-07": [
            { Titolo: "Derivate", Argomento: "Studio di funzione", Orario: "16:00", Professore: "Prof. Gialli" },
        ],
        "2025-02-09": [
            { Titolo: "Integrali per parti", Argomento: "Integrali", Orario: "08:30", Professore: "Prof.ssa Azzurri" },
        ],
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
                style={{
                    borderWidth: 3,
                    borderColor: myTheme.colors.primary,
                    borderRadius: 20,
                    height: 350
                }}
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
                    <Text style={[styles.welcomeText, { margin: 10, marginTop: 30 }]}>
                        Nessuna sfida in programma
                    </Text>
                ) : (
                    selectedChallenges.map((challenge, index) => (
                        <View key={index} style={[{ margin: 10, marginTop: 30 }]}>
                            <View>
                            <View style={[styles.card, { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]}>

                                <View style={{ flex: 1, marginRight: 10, alignItems:"center" }}>
                                    <Text style={[styles.cardTitle, {margin:5}]}>
                                        {challenge.Titolo}
                                    </Text>
                                    <Text style={[styles.subtitle, {margin:5}]}>
                                        {challenge.Argomento}
                                    </Text>
                                    <Text style={[styles.subtitle, {margin:5}]}>
                                        Orario: {challenge.Orario}
                                    </Text>
                                </View>

                                <View style={{ flex: 1, alignItems: "center" }}>
                                    <Image source={require('../assets/placeholder.jpg')} style={[styles.cardImage, { marginBottom: 10 }]} />
                                    <Text style={styles.subtitle}>
                                        {challenge.Professore}
                                    </Text>
                                </View>

                            </View>
                        </View></View>
                    ))
                            )}
            </View>
        </View>
    );
}
