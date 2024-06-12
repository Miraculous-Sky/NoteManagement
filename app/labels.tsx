import React, { useState } from "react";
import {
    View,
    TextInput,
    FlatList,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Text,
} from "react-native";
import { LABELS } from "../data/dummy-data";
import LabelItem from "../components/label-item";

export default function Labels() {
    const [keyword, setKeyword] = useState("");
    const [filteredLabels, setFilteredLabels] = useState(LABELS);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const [newLabel, setNewLabel] = useState("");

    const searchLabels = (text: string) => {
        setKeyword(text);
        if (text) {
            setFilteredLabels(
                LABELS.filter((label) => label.label.includes(text))
            );
        } else {
            setFilteredLabels(LABELS);
        }
    };

    const openModal = (label: any) => {
        setSelectedLabel(label);
        setNewLabel(label.label);
        setModalVisible(true);
    };

    const updateLabel = () => {
        // Logic to update the label
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search Labels"
                value={keyword}
                onChangeText={searchLabels}
            />
            <FlatList
                data={filteredLabels}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <LabelItem label={item} onPress={() => openModal(item)} />
                )}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <Text>Add New Label</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.container}>
                    <TextInput
                        style={styles.input}
                        placeholder="Label"
                        value={newLabel}
                        onChangeText={setNewLabel}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={updateLabel}
                    >
                        <Text>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            /* Logic to delete label */
                        }}
                    >
                        <Text>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text>Cancel</Text>
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
