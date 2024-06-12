import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Modal,
    StyleSheet,
} from "react-native";

const FOLDERS = [
    // Dummy folders data
];

export default function Folders() {
    //const [folders, setFolders] = useState(FOLDERS);
    const [folders, setFolders] = useState();
    const [newFolder, setNewFolder] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const addFolder = () => {
        // Logic to add a folder
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={folders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </View>
                )}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.buttonText}>Add New Folder</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Folder Name"
                        value={newFolder}
                        onChangeText={setNewFolder}
                    />
                    <TouchableOpacity style={styles.button} onPress={addFolder}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
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
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
    },
    item: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#fff",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 5,
    },
    itemText: {
        fontSize: 16,
    },
    button: {
        backgroundColor: "#007bff",
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
    },
});
