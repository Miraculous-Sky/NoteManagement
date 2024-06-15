import React, { useEffect, useState } from "react";
import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Text,
    Modal,
    TouchableWithoutFeedback,
} from "react-native";
import Label from "@/models/label";
import LabelItem from "@/components/label-item";
import localStorage from "@/data/local-storage";

export default function Labels() {
    const [keyword, setKeyword] = useState("");
    const [labels, setLabels] = useState<Label[]>([]);
    const [filteredLabels, setFilteredLabels] = useState<Label[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState<Label | null>(null);
    const [newLabel, setNewLabel] = useState("");

    useEffect(() => {
        const fetchLabels = async () => {
            const fetchedLabels = await localStorage.getAllLabels();
            setLabels(fetchedLabels);
            setFilteredLabels(fetchedLabels);
        };
        fetchLabels();
    }, []);

    const searchLabels = (text: string) => {
        setKeyword(text);
        if (text) {
            setFilteredLabels(
                labels.filter((label) =>
                    label.label.toLowerCase().includes(text.toLowerCase())
                )
            );
        } else {
            setFilteredLabels(labels);
        }
    };

    const createLabel = async (labelName: string) => {
        const newLabelObj = new Label(localStorage.getNextLabelId(), labelName);
        await localStorage.setLabel(newLabelObj);
        setLabels([...labels, newLabelObj]);
        setFilteredLabels([...filteredLabels, newLabelObj]);
       // setKeyword(""); // Clear the search input after creating the label
    };

    const openModal = (label: Label | null) => {
        setSelectedLabel(label);
        setNewLabel(label ? label.label : "");
        setModalVisible(true);
    };

    const updateLabel = async () => {
        if (selectedLabel) {
            const updatedLabel = { ...selectedLabel, label: newLabel };
            await localStorage.setLabel(updatedLabel);
            setLabels(
                labels.map((label) =>
                    label.id === updatedLabel.id ? updatedLabel : label
                )
            );
            setFilteredLabels(
                filteredLabels.map((label) =>
                    label.id === updatedLabel.id ? updatedLabel : label
                )
            );
        }
        setModalVisible(false);
    };

    const deleteLabel = async () => {
        if (selectedLabel) {
            await localStorage.deleteLabel(selectedLabel.id);
            setLabels(labels.filter((label) => label.id !== selectedLabel.id));
            setFilteredLabels(
                filteredLabels.filter((label) => label.id !== selectedLabel.id)
            );
            setModalVisible(false);
        }
    };

    const labelExists = (text: string) => {
        return labels.some(
            (label) => label.label.toLowerCase() === text.toLowerCase()
        );
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Search or Create Label"
                value={keyword}
                onChangeText={searchLabels}
            />
            {keyword && !labelExists(keyword) && (
                <TouchableOpacity
                    style={[styles.button, { marginBottom: 10 }]}
                    onPress={() => createLabel(keyword)}
                >
                    <Text style={styles.buttonText}>Create Label</Text>
                </TouchableOpacity>
            )}
            <Text>{filteredLabels.length} total</Text>
            <FlatList
                data={filteredLabels}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <LabelItem
                        label={item.label}
                        size={16}
                        onPress={() => openModal(item)}
                        style={{ padding: 10, borderRadius: 0, margin: 10 }}
                    />
                )}
            />

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
                                    <Text style={styles.buttonText}>Save</Text>
                                </TouchableOpacity>
                                {selectedLabel && (
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={deleteLabel}
                                    >
                                        <Text style={styles.buttonText}>
                                            Delete
                                        </Text>
                                    </TouchableOpacity>
                                )}
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
