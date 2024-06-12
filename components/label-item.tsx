import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Label from "../models/label";

interface LabelItemProps {
    label: Label;
    onPress: () => void;
}

const LabelItem: React.FC<LabelItemProps> = ({ label, onPress }) => {
    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <Text style={styles.itemText}>{label.label}</Text>
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
    },
});

export default LabelItem;
