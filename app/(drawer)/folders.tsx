import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
    StyleSheet,
    TextInput,
} from "react-native";
import localStorage from "@/data/local-storage";
import Folder from "@/models/folder";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { formatDistanceToNow } from "date-fns";

const Folders = () => {
    const [folders, setFolders] = useState<Folder[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const nav = useNavigation();
    const router = useRouter();

    useEffect(() => {
        const fetchFolders = async () => {
            const fetchedFolders = await localStorage.getAllFolders();
            setFolders(fetchedFolders);
        };
        nav.addListener("focus", () => {
            fetchFolders();
        });
    }, [nav]);

    const addFolder = async () => {
        const newFolder = new Folder(
            localStorage.getNextFolderId(),
            newFolderName,
            [],
            new Date().toISOString()
        );
        await localStorage.setFolder(newFolder);
        setFolders([...folders, newFolder]);
        setNewFolderName("");
        setModalVisible(false);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return formatDistanceToNow(date, { addSuffix: true });
    };

    const renderFolderItem = ({ item }: { item: Folder }) => (
        <TouchableOpacity
            onPress={() => nav.navigate("manage-note", { id: item.id })}
            style={styles.folderItem}
        >
            <View>
                <Text style={styles.folderName}>{item.name}</Text>
                <Text>{item.noteIds.length} notes</Text>
                <Text>Created {formatDate(item.createAt)}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.totalText}>{folders.length} total</Text>
            <FlatList
                data={folders}
                keyExtractor={(item) => item.id}
                renderItem={renderFolderItem}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons name="add" size={30} color="white" />
                <Text style={styles.addButtonText}>Add Folder</Text>
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={modalVisible}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            placeholder="Folder Name"
                            value={newFolderName}
                            onChangeText={setNewFolderName}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={addFolder}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    totalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    folderItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    folderName: {
        fontSize: 18,
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
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        backgroundColor: "#fff",
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
});

export default Folders;
