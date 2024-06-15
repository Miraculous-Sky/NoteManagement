import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { Link, router, useNavigation } from "expo-router";
import NoteItem from "@/components/note-item";
import Note from "@/models/note";
import localStorage from "@/data/local-storage";
import { Ionicons } from "@expo/vector-icons";
import { STYLES, COLORS } from "@/constants/constants";

export default function Home() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.addListener("focus", () => {
            localStorage.getAllNotes().then((result) => {
                setNotes([...result]);
            });
        });
    }, []);

    const toggleSearch = () => {
        setIsSearching(!isSearching);
        setSearchQuery("");
    };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () =>
                isSearching ? (
                    <TouchableOpacity
                        style={STYLES.headerButton}
                        onPress={toggleSearch}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={24}
                            color={COLORS.textPrimary}
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={STYLES.headerButton}
                        onPress={navigation.openDrawer}
                    >
                        <Ionicons
                            name="menu"
                            size={24}
                            color={COLORS.textPrimary}
                        />
                    </TouchableOpacity>
                ),

            headerTitle: () =>
                isSearching ? (
                    <TextInput
                        style={STYLES.searchBox}
                        placeholder="Search"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor={COLORS.textSecondary}
                    />
                ) : (
                    <Text style={STYLES.title}>Notes</Text>
                ),

            headerRight: () =>
                !isSearching ? (
                    <TouchableOpacity
                        style={STYLES.headerButton}
                        onPress={toggleSearch}
                    >
                        <Ionicons
                            name="search"
                            size={24}
                            color={COLORS.textPrimary}
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={STYLES.headerButton}
                        onPress={() => setSearchQuery("")}
                    >
                        <Ionicons
                            name="close"
                            size={24}
                            color={COLORS.textPrimary}
                        />
                    </TouchableOpacity>
                ),
        });
    }, [isSearching, searchQuery]);

    const filteredNotes = notes.filter((note) =>
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={STYLES.container}>
            {filteredNotes.length <= 0 && searchQuery !== "" ? (
                <Text>Not found!</Text>
            ) : filteredNotes.length <= 0 ? (
                <Text style={STYLES.emptyText}>Please add a new note</Text>
            ) : (
                <Text>
                    {filteredNotes.length}
                    {filteredNotes.length > 1 ? " notes" : " note"}
                    {isSearching ? " found" : ""}
                </Text>
            )}
            <FlatList
                data={filteredNotes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <NoteItem
                        note={item}
                        onPress={() => {
                            router.navigate({ pathname: item.id });
                        }}
                    />
                )}
            />

            <View style={{ alignItems: "flex-end" }}>
                <Link href="/add" asChild>
                    <TouchableOpacity style={STYLES.button}>
                        <Ionicons
                            name="add-circle"
                            size={40}
                            color={COLORS.textPrimary}
                        />
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
}
