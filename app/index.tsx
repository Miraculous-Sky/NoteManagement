import React from "react";
import {
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Text,
} from "react-native";
import { Link } from "expo-router";
import { NOTES } from "../data/dummy-data";
import NoteItem from "../components/note-item";

export default function Home() {
    return (
        <View style={styles.container}>
            <FlatList
                data={NOTES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <NoteItem note={item} onPress={() => {}} />
                )}
            />
            <Link href="/note/add" asChild>
                <TouchableOpacity style={[styles.button]}>
                    <Text> Add Note</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
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
});
