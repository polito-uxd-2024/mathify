import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";

type CustomModalProps = {
    isVisible: boolean;
    changePage: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

const CustomModal = ({ isVisible, changePage, onConfirm, onCancel }: CustomModalProps) => {
    let modalContent;

    // Condizione per determinare il contenuto del modal
    if (!changePage) {
        modalContent = (
            <Modal
                transparent
                visible={isVisible}
                animationType="fade"
                onRequestClose={onCancel}
            >
                <View style={modalStyles.modalBackground}>
                    <View style={modalStyles.modalContainer}>
                        <Text style={modalStyles.modalTitle}>Sei sicuro?</Text>
                        <Text style={modalStyles.modalMessage}>
                            Vuoi uscire dalla schermata di gioco? I progressi non salvati andranno persi.
                        </Text>
                        <View style={modalStyles.modalButtons}>
                            <TouchableOpacity
                                style={[modalStyles.modalButton, modalStyles.cancelButton]}
                                onPress={onCancel}
                            >
                                <Text style={modalStyles.cancelButtonText}>Annulla</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[modalStyles.modalButton, modalStyles.confirmButton]}
                                onPress={onConfirm}
                            >
                                <Text style={modalStyles.confirmButtonText}>Esci</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    } else {
        modalContent = (
            <Modal
                transparent
                visible={isVisible}
                animationType="fade"
                onRequestClose={onCancel}
            >
                <View style={modalStyles.modalBackground}>
                    <View style={modalStyles.modalContainer}>
                        <Text style={modalStyles.modalTitle}>Sei sicuro?</Text>
                        <Text style={modalStyles.modalMessage}>
                            Esci dal Riepilogo della Sfida?
                        </Text>
                        <View style={modalStyles.modalButtons}>
                            <TouchableOpacity
                                style={[modalStyles.modalButton, modalStyles.cancelButton]}
                                onPress={onCancel}
                            >
                                <Text style={modalStyles.cancelButtonText}>Annulla</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[modalStyles.modalButton, modalStyles.confirmButton]}
                                onPress={onConfirm}
                            >
                                <Text style={modalStyles.confirmButtonText}>Esci</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    return modalContent;
};

export const modalStyles = StyleSheet.create({
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
        textAlignVertical: "center",
        fontSize: 16,
    },
});

export default CustomModal;
