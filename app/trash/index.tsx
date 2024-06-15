import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
} from "react-native";
import localStorage from "@/data/local-storage";
import NoteItem from "@/components/note-item";
import Note from "@/models/note";
import { useNavigation } from "expo-router";

export default function Trash() {
    const nav = useNavigation();
    const [trashNotes, setTrashNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = nav.addListener("focus", () => {
            localStorage
                .getAllTrash()
                .then((result) => setTrashNotes([...result]));
        });
        return unsubscribe;
    }, [nav]);

    const emptyTrash = async () => {
        for (const note of trashNotes) {
            await localStorage.deleteTrash(note.id);
        }
        setTrashNotes([]);
    };

    const restoreAll = async () => {
        for (const note of trashNotes) {
            await localStorage.setNote(note);
            await localStorage.deleteTrash(note.id);
        }
        setTrashNotes([]);
    };

    const openModal = (note: Note) => {
        setSelectedNote(note);
        setModalVisible(true);
    };

    const closeModal = () => {
        setSelectedNote(null);
        setModalVisible(false);
    };

    const deleteNote = async () => {
        if (selectedNote) {
            await localStorage.deleteTrash(selectedNote.id);
            setTrashNotes(
                trashNotes.filter((note) => note.id !== selectedNote.id)
            );
            closeModal();
        }
    };

    const restoreNote = async () => {
        if (selectedNote) {
            await localStorage.setNote(selectedNote);
            await localStorage.deleteTrash(selectedNote.id);
            setTrashNotes(
                trashNotes.filter((note) => note.id !== selectedNote.id)
            );
            closeModal();
        }
    };

    return (
        <View style={styles.container}>
            {trashNotes.length > 0 ? (
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <Text>
                            {trashNotes.length}
                            {trashNotes.length > 1 ? " notes" : " note"} in
                            Trash
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={emptyTrash}
                            >
                                <Text style={styles.buttonText}>
                                    Empty Trash
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={restoreAll}
                            >
                                <Text style={styles.buttonText}>
                                    Restore All
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                        data={trashNotes}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <NoteItem
                                note={item}
                                onPress={() => openModal(item)}
                            />
                        )}
                    />
                </View>
            ) : (
                <Text style={styles.emptyText}>Trash is empty</Text>
            )}

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={closeModal}
            >
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <Text>
                                    Do you want to restore or delete this note?
                                </Text>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={restoreNote}
                                >
                                    <Text style={styles.buttonText}>
                                        Restore
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={deleteNote}
                                >
                                    <Text style={styles.buttonText}>
                                        Delete permanently
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        alignSelf: "flex-end",
    },
    button: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
    },
    emptyText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 5,
    },
});
