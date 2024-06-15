import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    FlatList,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import Note from "@/models/note";
import Label from "@/models/label";
import localStorage from "@/data/local-storage";
import LabelItem from "@/components/label-item";

const ManageLabelsScreen = () => {
    const { id } = useLocalSearchParams();
    const [note, setNote] = useState<Note | null>(null);
    const [labels, setLabels] = useState<Label[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredLabels, setFilteredLabels] = useState<Label[]>([]);
    const [selectedCount, setSelectedCount] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch the note
            const fetchedNote = await localStorage.getNote(id as string);
            if (fetchedNote) {
                setNote(fetchedNote);
                setSelectedCount(fetchedNote.labelIds.length);
            }

            // Fetch the labels
            const fetchedLabels = await localStorage.getAllLabels();
            setLabels(fetchedLabels);
            setFilteredLabels(fetchedLabels);
            setSelectedCount(
                fetchedLabels.filter((label) =>
                    fetchedNote?.labelIds.includes(label.id)
                ).length
            );
        };

        fetchData();
    }, [id]);

    const toggleLabelHandler = async (labelId: string) => {
        if (note) {
            const updatedLabelIds = note.labelIds.includes(labelId)
                ? note.labelIds.filter((id: string) => id !== labelId)
                : [...note.labelIds, labelId];
            const temp = {
                ...note,
                labelIds: updatedLabelIds,
                updateAt: new Date(),
            };
            setNote(temp);
            await localStorage.setNote(temp);
            setSelectedCount(
                filteredLabels.filter((label) =>
                    updatedLabelIds.includes(label.id)
                ).length
            );
        }
    };

    const filterLabels = (query: string) => {
        setSearchQuery(query);
        if (query) {
            const filtered = labels.filter((label) =>
                label.label.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredLabels(filtered);
            setSelectedCount(
                filtered.filter((label) => note?.labelIds.includes(label.id))
                    .length
            );
        } else {
            setFilteredLabels(labels);
            setSelectedCount(
                labels.filter((label) => note?.labelIds.includes(label.id))
                    .length
            );
        }
    };

    const renderLabelItem = ({ item }: { item: Label }) => {
        const isSelected = note?.labelIds.includes(item.id);

        return (
            <LabelItem
                label={item.label}
                style={isSelected ? styles.selectedLabel : {}}
                size={16}
                onPress={() => toggleLabelHandler(item.id)}
            />
        );
    };

    return (
        <View style={styles.screen}>
            <TextInput
                style={styles.searchBox}
                placeholder="Search Labels"
                value={searchQuery}
                onChangeText={filterLabels}
            />
            <Text>
                {filteredLabels.length} total, {selectedCount} selected
            </Text>
            <FlatList
                data={filteredLabels}
                keyExtractor={(item) => item.id}
                renderItem={renderLabelItem}
                numColumns={3}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
    },
    searchBox: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    selectedLabel: {
        backgroundColor: "#4caf50",
    },
});

export default ManageLabelsScreen;
