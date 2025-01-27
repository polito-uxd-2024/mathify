import React from 'react';
import { View, Text, Modal, TouchableOpacity, ViewStyle } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './style';
import { modalStyles } from './CustomModal';
import { myTheme } from './theme';

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
                <View style={[modalStyles.modalContainer, { padding: 20, borderRadius: 15, elevation: 5 }]}>
                    <Text style={[modalStyles.modalTitle, { color: "gold", marginBottom: 10 }]}>CONGRATULAZIONI!!</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Text style={[styles.calloutText, { color: myTheme.colors.blue }]}>Nuovo badge sbloccato:</Text>
                        <View style={[styles.iconButton, { marginLeft: 10 }]}>
                            <MaterialCommunityIcons
                                name="trophy"
                                size={30}
                                color="black"
                            />
                        </View>
                    </View>

                    <View style={{ alignItems: 'center', marginBottom: 10 }}>
                        <Text style={[styles.bigWelcomeText, { marginTop: 5 }]}>{state.selectedChallenge.titolo}</Text>
                        <Text style={[styles.calloutText, { color: myTheme.colors.secondary }]}>{state.selectedChallenge.argomento}</Text>
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
        </Modal>
    );
};

export default RewardModal;