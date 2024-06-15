import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Note from "@/models/note";
import { formatTimeDuration } from "@/utils/date-utils";
import { colourNameToHex } from "@/utils/color-utils";
import { Ionicons } from "@expo/vector-icons";
import localStorage from "@/data/local-storage";
import LabelItem from "./label-item";
import ColorItem from "./color-item";

interface NoteItemProps {
    note: Note;
    onPress: () => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onPress }) => {
    const [labels, setLabels] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const fetchNoteAndLabels = async () => {
            const fetchedLabels: { [key: string]: string } = {};
            for (const labelId of note.labelIds) {
                const label = await localStorage.getLabel(labelId);
                if (label) {
                    fetchedLabels[labelId] = label.label;
                }
            }
            setLabels(fetchedLabels);
        };

        fetchNoteAndLabels();
    }, [note]);

    return (
        <TouchableOpacity
            style={[
                styles.item,
                {
                    backgroundColor: note.color
                        ? colourNameToHex(note.color) + "5f"
                        : "white",
                },
            ]}
            onPress={onPress}
        >
            <View
                style={{
                    flex: 1,
                    alignContent: "space-between",
                    flexDirection: "row",
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <ColorItem color={note.color}></ColorItem>
                    <Text>{formatTimeDuration(note.createAt)}</Text>
                </View>

                {note.isBookmarked && (
                    <Ionicons name="bookmark" size={24} color="black" />
                )}
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {note.labelIds
                    .filter((labelId: string) => labels[labelId])
                    .map((labelId: string) => (
                        <LabelItem
                            style={{ marginTop: 0 }}
                            key={labelId}
                            label={labels[labelId]}
                            onPress={() => {}}
                        ></LabelItem>
                    ))}
            </ScrollView>
            <Text style={styles.itemText}>{note.content}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
        margin: 15,
        marginStart: 0,
    },
    color: {
        height: 16,
        width: 16,
        borderRadius: 8,
        margin: 5,
    },
});

export default NoteItem;
