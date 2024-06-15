import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
import { Link, router, useLocalSearchParams, useNavigation } from "expo-router";
import Note from "@/models/note";
import localStorage from "@/data/local-storage";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import ColorItem from "@/components/color-item";
import LabelItem from "@/components/label-item";
import { ScrollView } from "react-native-gesture-handler";
import { formatTimeDuration } from "@/utils/date-utils";
import * as Clipboard from "expo-clipboard";

const EditNoteScreen = () => {
    const { id } = useLocalSearchParams();
    const [note, setNote] = useState<Note | null>(null);
    const [content, setContent] = useState("");
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [colors, setColors] = useState<(string | null)[]>([]);
    const [color, setColor] = useState<string | null>(null);
    const [isChange, setIsChange] = useState<boolean>(false);
    const sheetRef = useRef<BottomSheet>(null);
    const [labels, setLabels] = useState<{ [key: string]: string }>({});
    const nav = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            // Fetch the note
            const fetchedNote = await localStorage.getNote(id as string);
            if (fetchedNote) {
                setNote(fetchedNote);
                setContent(fetchedNote.content);
                setIsBookmarked(fetchedNote.isBookmarked);
                setColor(fetchedNote.color);
            }

            // Fetch the colors
            await localStorage
                .getAllColors()
                .then((result: (string | null)[]) => {
                    setColors([null, ...result]);
                });

            // Fetch the labels
            const fetchedLabels: { [key: string]: string } = {};
            if (fetchedNote) {
                for (const labelId of fetchedNote.labelIds) {
                    const label = await localStorage.getLabel(labelId);
                    if (label) {
                        fetchedLabels[labelId] = label.label;
                    }
                }
                setLabels(fetchedLabels);
            }
        };
        nav.addListener("focus", () => {
            fetchData();
        });
    }, [id]);

    useEffect(() => {
        if (note && isChange) {
            const updatedNote = {
                ...note,
                content,
                isBookmarked,
                color,
                updateAt: new Date(),
            };
            localStorage.setNote(updatedNote);
            setNote(updatedNote);
            setIsChange(false);
        }
    }, [content, isBookmarked, color]);

    const toggleBookmark = () => {
        setIsBookmarked((prevState) => !prevState);
        setIsChange(true);
    };

    const handleColorChange = (newColor: string | null) => {
        setColor(newColor);
        setIsChange(true);
    };

    const handleUpdateLabels = () => {
        if (note?.id) {
            router.push({ pathname: "manage-labels", params: { id: note.id } });
        }
    };
    const handleCopyToClipboard = async () => {
        await Clipboard.setStringAsync(content);
    };
    const handleDeleteNote = () => {
        if (note) {
            const updatedNote = {
                ...note,
                deleteAt: new Date(),
            };
            localStorage.setTrash(updatedNote);
            localStorage.deleteNote(id as string);
            router.back();
        }
    };
    const handleCopyNote = () => {
        if (note) {
            const newNote = {
                ...note,
                id: localStorage.getNextNoteId(),
                createAt: new Date(),
                updateAt: new Date(),
            };
            localStorage.setNote(newNote);
            router.back();
        }
    };

    // callbacks
    const handleBottomSheet = useCallback(() => {
        sheetRef.current?.expand();
    }, []);

    if (!note) {
        return (
            <View style={styles.screen}>
                <Text>Loading...</Text>
            </View>
        );
    }
    const actions = [
        {
            iconName: "clipboard-outline",
            onPress: handleCopyToClipboard,
            title: "Copy to clipboard",
            implemented: true,
        },
        {
            iconName: "share-social-outline",
            onPress: () => {},
            title: "Share",
        },
        {
            iconName: "trash-outline",
            onPress: handleDeleteNote,
            title: "Delete",
            implemented: true,
        },
        {
            iconName: "copy-outline",
            onPress: handleCopyNote,
            title: "Make a copy",
            implemented: true,
        },
        {
            iconName: "pin-outline",
            onPress: () => {},
            title: "Pin",
        },
        {
            iconName: "alarm-outline",
            onPress: () => {},
            title: "Add a reminder",
        },
    ];
    return (
        <View style={styles.screen}>
            <View style={{ flex: 1, margin: 10 }}>
                <View
                    style={{
                        alignItems: "flex-start",
                        flexDirection: "row",
                        flexWrap: "wrap",
                    }}
                >
                    {note.labelIds
                        .filter((labelId: string) => labels[labelId])
                        .map((labelId: string) => (
                            <LabelItem
                                key={labelId}
                                label={labels[labelId] || "Unknown Label"}
                                onPress={() => {}}
                            ></LabelItem>
                        ))}
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Edit note content"
                    value={content}
                    onChangeText={(content) => {
                        setContent(content);
                        setIsChange(true);
                    }}
                    multiline
                />
            </View>

            <View style={styles.actions}>
                <Text style={{ textAlign: "center" }}>
                    Edited {formatTimeDuration(note.updateAt)}
                </Text>
                <TouchableOpacity
                    onPress={toggleBookmark}
                    style={{ flex: 1, alignItems: "flex-end" }}
                >
                    <Ionicons
                        name={isBookmarked ? "bookmark" : "bookmark-outline"}
                        size={30}
                        color="black"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleBottomSheet()}
                    style={{ flex: 1, alignItems: "flex-end" }}
                >
                    <Ionicons
                        name="ellipsis-vertical"
                        size={30}
                        color="black"
                    />
                </TouchableOpacity>
            </View>

            <BottomSheet
                ref={sheetRef}
                index={-1}
                snapPoints={["60%"]}
                enablePanDownToClose
            >
                <BottomSheetView
                    style={{ padding: 10, alignContent: "space-between" }}
                >
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {colors.map((color, index) => {
                            return (
                                <ColorItem
                                    key={index}
                                    color={color}
                                    onPress={() => handleColorChange(color)}
                                    size={40}
                                >
                                    {note.color === color && (
                                        <Ionicons
                                            name="checkmark-sharp"
                                            size={30}
                                            color="black"
                                        />
                                    )}
                                </ColorItem>
                            );
                        })}
                    </ScrollView>
                    <LabelItem
                        onPress={handleUpdateLabels}
                        label={"+ Manage labels"}
                        style={{
                            borderWidth: 1,
                            borderStyle: "dotted",
                        }}
                    ></LabelItem>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            alignItems: "center",
                        }}
                    >
                        {note.labelIds
                            .filter((labelId: string) => labels[labelId])
                            .map((labelId: string) => (
                                <LabelItem
                                    key={labelId}
                                    label={labels[labelId] || "Unknown Label"}
                                ></LabelItem>
                            ))}
                    </ScrollView>
                    <View
                        style={{
                            borderTopWidth: 1,
                            borderStyle: "dashed",
                            marginVertical: 10,
                        }}
                    ></View>
                    <ScrollView>
                        {actions.map((action, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={action.onPress}
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Ionicons
                                    name={
                                        action.iconName as keyof typeof Ionicons.glyphMap
                                    }
                                    size={24}
                                    color="black"
                                    style={{ margin: 10 }}
                                />
                                <Text
                                    style={
                                        !action.implemented && {
                                            textDecorationLine: "line-through",
                                        }
                                    }
                                >
                                    {action.title}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </BottomSheetView>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    input: {
        textAlignVertical: "top",
        flex: 1,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 2,
        backgroundColor: "#fefefe",
    },
    actions: {
        backgroundColor: "#dbdbdb",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
});

export default EditNoteScreen;
