import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import { styles } from './style';
import { modalStyles } from './CustomModal';

type RewardModalProps = {
    visible: boolean;
    onClose: () => void;
    xp: number;
    state: {
        selectedChallenge: { titolo: string; argomento: string };
        utente: { livello: { xpTotali: number } };
    };
};

const RewardModal = ({ visible, xp, state, onClose }: RewardModalProps) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={modalStyles.modalBackground}>
                <View style={modalStyles.modalContainer}>


                            <Text style={[modalStyles.modalTitle, {color: "gold"} ]}>CONGRATULAZIONI!!</Text>
                            <Text style={[styles.calloutText, {marginBottom: 10}]}>Nuovo badge sbloccato:</Text>

                            <View style={[modalStyles.modalContainer, {padding: 0}]}>
                                <View style={styles.iconButton}>
                                    <MaterialCommunityIcons
                                        name="trophy"
                                        size={40}
                                        color="black"
                                    />
                                </View>

                                <Text style={styles.bigWelcomeText}>{state.selectedChallenge.titolo}</Text>
                                <Text style={styles.calloutText}>{state.selectedChallenge.argomento}</Text>
                            </View>

                            <Text style={[modalStyles.modalMessage, {marginBottom: 5}]}>Hai guadagnato {xp} XP</Text>

                            <View style={{ marginVertical: 10, position: 'relative', width: 250, height: 20 }}>
                                <Progress.Bar
                                    progress={state.utente.livello.xpTotali / 5000}
                                    width={250}
                                    height={20}
                                    color='blue'
                                    borderColor="black"
                                    style={{ borderRadius: 15, position: 'absolute', top: 0, left: 0 }}
                                />
                                <Progress.Bar
                                    progress={(state.utente.livello.xpTotali + xp) / 5000}
                                    width={250}
                                    height={20}
                                    color='yellow'
                                    borderColor="black"
                                    style={{ borderRadius: 15, position: 'absolute', top: 0, left: 0 }}
                                />
                            </View>

                            <TouchableOpacity
                                style={[ modalStyles.confirmButton, { width: 200 , borderRadius: 10, height:40, alignItems:"center", backgroundColor:"gold"} ]}
                                onPress={onClose}
                            >
                                <Text style={[modalStyles.confirmButtonText, {fontSize: 25, textAlign: "center"}]}>Vai al riepilogo</Text>
                            </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default RewardModal;