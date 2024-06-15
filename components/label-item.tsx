import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

interface LabelItemProps {
    label: string;
    onPress?: () => void;
    style?: {};
    size?: number;
}

const LabelItem: React.FC<LabelItemProps> = ({
    label,
    onPress,
    style,
    size = 12,
}) => {
    return (
        <TouchableOpacity style={[styles.item, style]} onPress={onPress}>
            <Text style={[styles.itemText, { fontSize: size }]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        margin: 5,
        marginStart: 0,
        padding: 5,
        backgroundColor: "#dbdbdb",
        borderRadius: 5,
        textAlign: "center",
    },
    itemText: {
        fontSize: 12,
    },
});

export default LabelItem;
