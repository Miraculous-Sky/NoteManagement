import React, { useEffect, useState } from "react";
import {
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput,
} from "react-native";
import { Link, router, useNavigation } from "expo-router";
import NoteItem from "@/components/note-item";
import Note from "@/models/note";
import localStorage from "@/data/local-storage";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const nav = useNavigation();

    useEffect(() => {
        nav.addListener("focus", () => {
            localStorage.getAllNotes().then((result) => {
                setNotes([...result]);
            });
        });
    }, []);

    const filteredNotes = notes.filter((note) =>
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleSearch = () => {
        setIsSearching(!isSearching);
        setSearchQuery("");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {isSearching ? (
                    <>
                        <TouchableOpacity onPress={toggleSearch}>
                            <Ionicons
                                name="arrow-back"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.searchBox}
                            placeholder="Search"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </>
                ) : (
                    <>
                        <Text style={styles.title}>Notes</Text>
                        <TouchableOpacity onPress={toggleSearch}>
                            <Ionicons name="search" size={24} color="black" />
                        </TouchableOpacity>
                    </>
                )}
            </View>
            {filteredNotes.length <= 0 && searchQuery !== "" ? (
                <Text>Not found!</Text>
            ) : filteredNotes.length <= 0 ? (
                <Text style={styles.emptyText}>Please add a new note</Text>
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
                    <TouchableOpacity style={[styles.button]}>
                        <Ionicons name="add-circle" size={40} color="black" />
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    searchBox: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 5,
        flex: 1,
        marginLeft: 10,
    },
    button: {
        backgroundColor: "#007bff",
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
    },
});
