import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native";
import localStorage from "@/data/local-storage";
import Note from "@/models/note";
import Folder from "@/models/folder";
import { useNavigation, useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ManageNoteScreen = () => {
    const { id } = useLocalSearchParams();
    const [folder, setFolder] = useState<Folder | null>(null);
    const [notes, setNotes] = useState<Note[]>([]);
    const [availableNotes, setAvailableNotes] = useState<Note[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const nav = useNavigation();
    const router = useRouter();

    useEffect(() => {
        const fetchFolderAndNotes = async () => {
            const fetchedFolder = await localStorage.getFolder(id as string);
            if (fetchedFolder) {
                setFolder(fetchedFolder);
                const fetchedNotes = await localStorage.getAllNotes();
                const folderNotes = fetchedNotes.filter((note) =>
                    fetchedFolder.noteIds.includes(note.id)
                );
                const notesNotInFolder = fetchedNotes.filter(
                    (note) => !fetchedFolder.noteIds.includes(note.id)
                );
                setNotes(folderNotes);
                setAvailableNotes(notesNotInFolder);
            }
        };
        fetchFolderAndNotes();
    }, [id]);

    const removeNoteFromFolder = async (noteId: string) => {
        if (folder) {
            const updatedFolder = {
                ...folder,
                noteIds: folder.noteIds.filter((id: string) => id !== noteId),
            };
            await localStorage.setFolder(updatedFolder);
            setFolder(updatedFolder);
            setNotes(notes.filter((note) => note.id !== noteId));
        }
    };

    const addNoteToFolder = async (noteId: string) => {
        if (folder) {
            const updatedFolder = {
                ...folder,
                noteIds: [...folder.noteIds, noteId],
            };
            await localStorage.setFolder(updatedFolder);
            setFolder(updatedFolder);
            setNotes([
                ...notes,
                availableNotes.find((note) => note.id === noteId)!,
            ]);
            setAvailableNotes(
                availableNotes.filter((note) => note.id !== noteId)
            );
            setModalVisible(false);
        }
    };

    const renderNoteItem = ({ item }: { item: Note }) => (
        <TouchableOpacity
            onPress={() => {
                router.navigate(`/${item.id}`);
            }}
            style={styles.noteItem}
        >
            <Text>{item.content}</Text>
            <TouchableOpacity onPress={() => removeNoteFromFolder(item.id)}>
                <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {folder ? (
                <>
                    <Text style={styles.folderName}>{folder.name}</Text>
                    <FlatList
                        data={notes}
                        keyExtractor={(item) => item.id}
                        renderItem={renderNoteItem}
                    />
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <Ionicons name="add" size={30} color="white" />
                        <Text style={styles.addButtonText}>Add Note</Text>
                    </TouchableOpacity>

                    <Modal
                        transparent={true}
                        visible={modalVisible}
                        animationType="slide"
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <TouchableWithoutFeedback
                            onPress={() => setModalVisible(false)}
                        >
                            <View style={styles.modalOverlay}>
                                <TouchableWithoutFeedback>
                                    <View style={styles.modalContent}>
                                        <Text>Add Note to Folder</Text>
                                        <FlatList
                                            data={availableNotes}
                                            keyExtractor={(item) => item.id}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        addNoteToFolder(item.id)
                                                    }
                                                    style={styles.noteItem}
                                                >
                                                    <Text>{item.content}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    folderName: {
        fontSize: 24,
        marginBottom: 10,
    },
    noteItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    removeButton: {
        color: "#ff0000",
    },
    addButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    addButtonText: {
        color: "#fff",
        fontSize: 18,
        marginLeft: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: 300,
        maxHeight: 400,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 5,
    },
});

export default ManageNoteScreen;
