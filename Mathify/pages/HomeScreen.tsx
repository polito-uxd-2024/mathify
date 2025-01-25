import React, { useContext } from "react";
import { View, ScrollView, Image, Text } from "react-native";
import { Appbar, ProgressBar } from "react-native-paper";
import { styles } from "../Component/style";
import { StateContext } from "../Reducer";
import SegmentedButton from "../Component/SegmentedButton";

export default function HomeScreen() {
    const [state] = useContext(StateContext);
    console.log(state.segnalazioniList);
    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header style={styles.header}>
                <Appbar.Content title="Sfide" />
                {/*}
                <View style={{ width: 240 }}>
                    <ProgressBar
                        progress={parseFloat((state.utente.livello.xpTotali / 5000).toFixed(1))}
                        color='orange'
                        style={styles.progressBar}
                    />
                </View>
                <View>
                    <Image source={require('../assets/placeholder.jpg')} style={styles.profileImage} />
                </View>*/}
            </Appbar.Header>
            <View style={styles.content}>
                <SegmentedButton />
            </View>
        </View>
    );
}