import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import Note from "../models/note";

interface NoteItemProps {
    note: Note;
    onPress: () => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, onPress }) => {
    return (
        <Link href={`/edit-note/${note.id}`} asChild>
            <TouchableOpacity style={styles.item} onPress={onPress}>
                <Text style={styles.itemText}>{note.content}</Text>
            </TouchableOpacity>
        </Link>
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
    },
});

export default NoteItem;
