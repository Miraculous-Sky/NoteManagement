import React, { useState } from "react";
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { BottomSheet, ListItem, Icon } from "react-native-elements";
import { COLORS, NOTES } from "../../data/dummy-data";

const EditNoteScreen = ({ route, navigation }) => {
    const { noteId } = route.params;
    const note: any = NOTES.find((n) => n.id === noteId);

    const [content, setContent] = useState(note.content);
    const [isBookmarked, setIsBookmarked] = useState(note.isBookmarked);
    const [color, setColor] = useState(note.color);
    const [isVisible, setIsVisible] = useState(false);

    const saveNoteHandler = () => {
        // Save the updated note (for now just navigate back)
        note.content = content;
        note.isBookmarked = isBookmarked;
        note.color = color;
        navigation.goBack();
    };

    const toggleBookmark = () => {
        setIsBookmarked((prevState) => !prevState);
    };

    const showBottomSheet = () => {
        setIsVisible(true);
    };

    const hideBottomSheet = () => {
        setIsVisible(false);
    };

    const list = [
        {
            title: "Change Color",
            onPress: () => {
                setIsVisible(false);
                // Implement color change functionality here
            },
        },
        {
            title: "Update Labels",
            onPress: () => {
                setIsVisible(false);
                navigation.navigate("ManageLabels", { noteId });
            },
        },
        {
            title: "Delete Note",
            onPress: () => {
                setIsVisible(false);
                // Implement delete functionality here
            },
        },
        {
            title: "Cancel",
            containerStyle: { backgroundColor: "red" },
            titleStyle: { color: "white" },
            onPress: () => setIsVisible(false),
        },
    ];

    return (
        <View style={styles.screen}>
            <TextInput
                style={styles.input}
                placeholder="Edit note content"
                value={content}
                onChangeText={setContent}
            />
            <View style={styles.actions}>
                <TouchableOpacity onPress={toggleBookmark}>
                    <Icon
                        name={isBookmarked ? "bookmark" : "bookmark-border"}
                        type="material"
                        size={30}
                        color="blue"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={showBottomSheet}>
                    <Icon
                        name="more-vert"
                        type="material"
                        size={30}
                        color="blue"
                    />
                </TouchableOpacity>
            </View>
            <Button title="Save Note" onPress={saveNoteHandler} />
            <BottomSheet isVisible={isVisible}>
                {list.map((l, i) => (
                    <ListItem
                        key={i}
                        containerStyle={l.containerStyle}
                        onPress={l.onPress}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={l.titleStyle}>
                                {l.title}
                            </ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
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
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
});

export default EditNoteScreen;
