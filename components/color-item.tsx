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
                color == null
                    ? { borderWidth: 2, borderColor: "#dedede" }
                    : { backgroundColor: color },
                { width: size, height: size, borderRadius: size / 2 },
            ]}
        >
            {color == null && (
                <View
                    style={{
                        borderTopWidth: 2,
                        width: size,
                        transform: [{ rotate: "60deg" }],
                        position: "absolute",
                        borderColor: "#dedede",
                    }}
                ></View>
            )}
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
