import React, { useState } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { TRASH } from "../data/dummy-data";
import NoteItem from "../components/note-item";

export default function Trash() {
    return (
        <View style={styles.container}>
            <FlatList
                data={TRASH}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <NoteItem note={item} onPress={() => {}} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
});
