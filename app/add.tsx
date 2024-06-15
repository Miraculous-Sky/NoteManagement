import localStorage from "@/data/local-storage";
import Note from "@/models/note";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";

const NewNoteScreen = () => {
    const [content, setContent] = useState("");

    const saveNoteHandler = () => {
        const note = new Note(
            localStorage.getNextNoteId(),
            null,
            [],
            content,
            new Date(),
            new Date(),
            false
        );
        localStorage.setNote(note);
        router.back();
    };

    return (
        <View style={styles.screen}>
            <View style={{ flex: 1 }}>
                <TextInput
                    style={styles.input}
                    placeholder="(Note content)"
                    value={content}
                    onChangeText={setContent}
                    multiline
                />
            </View>
            <View style={{ alignItems: "flex-end" }}>
                <TouchableOpacity onPress={saveNoteHandler}>
                    <Ionicons name="checkmark-circle" size={40} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
        backgroundColor: "#fefefe",
        flex: 1,
        textAlignVertical: "top",
    },
});

export default NewNoteScreen;
