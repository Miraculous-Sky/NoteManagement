import React, { PropsWithChildren } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

interface ColorItemProps {
    color: string | null;
    size?: number;
    onPress?: () => void;
}

const ColorItem: React.FC<PropsWithChildren & ColorItemProps> = ({
    children,
    color,
    size = 16,
    onPress,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.colorCircle,
                color == null ? { borderWidth: 1 } : { backgroundColor: color },
                { width: size, height: size, borderRadius: size / 2 },
            ]}
        >
            {children}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    colorCircle: {
        margin: 10,
        marginStart: 0,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
    },
});

export default ColorItem;
