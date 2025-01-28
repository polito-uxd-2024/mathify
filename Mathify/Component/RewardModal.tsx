import React, {useContext, useState} from 'react';
import {View, Text, Modal, TouchableOpacity, ViewStyle, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './style';
import { modalStyles } from './CustomModal';
import { myTheme } from './theme';
import {FontAwesome} from "react-native-vector-icons";
import {Button} from "react-native-paper";
import {StateContext} from "../Reducer";
const badgeImage = require("../assets/Badge Image/trophy_4158048.png");

type RewardModalProps = {
    visible: boolean;
    onClose: () => void;
    xp: number;
    state: {
        selectedChallenge: { titolo: string; argomento: string };
        utente: { livello: { xpTotali: number } };
    };
};
const badges = [
    {id: 1, name: "Determinato", image: require("../assets/Badge Image/flag_4158032.png"), description: "Hai completato 10 sfide nell'ultima settimana!"},
    {id: 2, name: "Precisino", image: require("../assets/Badge Image/goal_4158044.png"), description: "Hai risposto correttamente a tutte le domande"},
    {id: 3, name: "Ingegnere", image: require("../assets/Badge Image/graduation_4158029.png"), description: "Hai svolto 40 sfide dall'inizio del tuo percorso"},
    {id: 4, name: "Razzo", image: require("../assets/Badge Image/growth_4157905.png"), description: "Hai impiegato meno di 5 minuti per finire la sfida"},
    {id: 5, name: "Asso", image: require("../assets/Badge Image/star_4158051.png"), description: "Hai ottenuto il massimo risultato in 5 sfide"},
    {id: 6, name: "Campione", image: require("../assets/Badge Image/trophy_4158048.png"), description: "Hai ottenuto un risultato superiore a 8 nelle ultime 3 sfide"},
    {id: 7, name: "Intuitore", image: require("../assets/Badge Image/victory_4158038.png"), description: "Hai completato almeno 5 domande in meno di 20 secondi"},
];



const RewardModal = ({ visible, xp, state, onClose }: RewardModalProps) => {
    const [stateUser]=useContext(StateContext)
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            {/*
            <View style={modalStyles.modalBackground}>
                <View style={[modalStyles.modalContainer, { borderRadius: 15, backgroundColor: "transparent", padding: 0}]}>
                    <View style={[styles.cardBase, {margin:0}]}>
                    <View style={[styles.card, {padding:10}]}>
                    <Text style={[modalStyles.modalTitle, { color: "gold", marginBottom: 10, textAlign:"center" }]}>CONGRATULAZIONI!!</Text>
                        <View style={{ alignItems: 'center', marginBottom: 10 }}>
                            <Text style={[styles.bigWelcomeText, { marginTop: 5 }]}>{state.selectedChallenge.titolo}</Text>
                            <Text style={[styles.calloutText, { color: myTheme.colors.secondary }]}>{state.selectedChallenge.argomento}</Text>
                        </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={[styles.calloutText, { color: myTheme.colors.blue, fontSize: 17 }]}>Nuovo badge sbloccato:</Text>
                        <View style={[styles.iconButton, {marginLeft:10}]}>
                            <MaterialCommunityIcons
                                name="trophy"
                                size={50}
                                color="black"
                            />
                        </View>
                    </View>
                    <Text style={[styles.sectionText, { marginBottom: 10 }]}>Hai guadagnato {xp} XP</Text>
                    <View style={[styles.progressBar, { flexDirection: 'row', marginBottom: 10 }]}>
                        <View
                            style={{
                                width: `${Math.min((state.utente.livello.xpTotali / 5000) * 100)}%`,
                                backgroundColor: myTheme.colors.cardBorder,
                                borderBottomLeftRadius: 10,
                                borderTopLeftRadius: 10,
                            } as ViewStyle}
                        />
                        <View
                            style={{
                                width: `${Math.min((xp / 5000) * 100)}%`,
                                backgroundColor: myTheme.colors.primary,
                            } as ViewStyle}
                        />
                    </View>
                    <TouchableOpacity
                        style={[modalStyles.confirmButton, { width: 200, borderRadius: 10, height: 40, alignItems: "center", backgroundColor: myTheme.colors.blue, alignSelf: "center" }]}
                        onPress={onClose}
                    >
                        <Text style={[modalStyles.confirmButtonText, { fontSize: 25, textAlign: "center" }]}>Vai al riepilogo</Text>
                    </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </View>
            */}

            <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={onClose}>
                <TouchableOpacity style={styles.modalBase} activeOpacity={1}>
                    <View>
                        <View style={[styles.card, {borderWidth: 3, borderColor: myTheme.colors.primary, backgroundColor: myTheme.colors.gray}]}>
                            <View style={[styles.modalContent]}>
                                <View style={{alignItems: 'center', paddingVertical: 0}}>
                                <Text style={styles.bigWelcomeText}>Congratulazioni!</Text>

                                    <Text style={styles.subtitle}>Hai sbloccato il badge:</Text>
                                </View>
                                <View style={[styles.coverImage, {borderWidth: 0, backgroundColor: 'white', justifyContent:"center"}]}>
                                    <Image
                                        source={badges[stateUser.utente.sfideCompletate.length % badges.length].image}
                                        style={{ width: 140, height: 140, alignSelf: 'center'}}
                                    />
                                    <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 10}}>
                                        <View style={[styles.callout, {backgroundColor: myTheme.colors.primary}]}>
                                        <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
                                            {badges[stateUser.utente.sfideCompletate.length % badges.length].name}
                                        </Text>
                                        </View>
                                    </View>
                                    </View>
                                <Text style={{paddingHorizontal: 5}}>{badges[stateUser.utente.sfideCompletate.length % badges.length].description}</Text>


                                <View style={{flexDirection: "row", paddingTop: 10}}>
                                    <View style={[styles.expandButtonBase, {marginRight: 10, height:50}]}>
                                        <Button
                                            mode="outlined"
                                            onPress={onClose}
                                            labelStyle={{ fontSize: 16, color:"black" }}
                                            style={styles.expandButton}
                                        >
                                            Vai al Riepilogo
                                        </Button>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>


        </Modal>
    );
};

export default RewardModal;