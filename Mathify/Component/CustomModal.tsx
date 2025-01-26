import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

type CustomModalProps = {
    isVisible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

const CustomModal = ({ isVisible, onConfirm, onCancel }:CustomModalProps) => {
    return (
        <Modal
            transparent
            visible={isVisible}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Sei sicuro?</Text>
                    <Text style={styles.modalMessage}>
                        Vuoi uscire dalla schermata di gioco? I progressi non salvati andranno persi.
                    </Text>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.cancelButton]}
                            onPress={onCancel}
                        >
                            <Text style={styles.cancelButtonText}>Annulla</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.confirmButton]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.confirmButtonText}>Esci</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    modalButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: "#f5f5f5",
        borderColor: "#ccc",
        borderWidth: 1,
    },
    cancelButtonText: {
        color: "#333",
        textAlign: "center",
        fontSize: 16,
    },
    confirmButton: {
        backgroundColor: "#ff4d4d",
    },
    confirmButtonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
    },
});

export default CustomModal;
