import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const NewNoteScreen = ({ navigation }) => {
    const [content, setContent] = useState("");

    const saveNoteHandler = () => {
        // Save the note (for now just navigate back)
        navigation.goBack();
    };

    return (
        <View style={styles.screen}>
            <TextInput
                style={styles.input}
                placeholder="Note content"
                value={content}
                onChangeText={setContent}
            />
            <Button title="Save Note" onPress={saveNoteHandler} />
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
    },
});

export default NewNoteScreen;
