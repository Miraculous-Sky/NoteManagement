import { StyleSheet } from "react-native";

export const COLORS = {
    primary: "#007bff",
    textPrimary: "#000",
    textSecondary: "#555",
    background: "#f5f5f5",
    border: "#ccc",
};

export const TEXT_SIZES = {
    large: 24,
    medium: 20,
    small: 16,
};

export const PADDINGS = {
    small: 5,
    medium: 10,
    large: 20,
};

export const MARGINS = {
    small: 5,
    medium: 10,
    large: 20,
};

export const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        padding: PADDINGS.large,
        backgroundColor: COLORS.background,
    },
    headerButton: {
        paddingHorizontal: PADDINGS.medium,
        paddingVertical: PADDINGS.small,
    },
    title: {
        fontSize: TEXT_SIZES.large,
        fontWeight: "bold",
        color: COLORS.textPrimary,
    },
    searchBox: {
        width: 310,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: PADDINGS.small,
        padding: PADDINGS.small,
        color: COLORS.textPrimary,
    },
    button: {
        //backgroundColor: COLORS.primary,
        padding: PADDINGS.medium,
        marginVertical: MARGINS.medium,
        borderRadius: PADDINGS.small,
    },
    emptyText: {
        textAlign: "center",
        marginTop: MARGINS.large,
        fontSize: TEXT_SIZES.medium,
        color: COLORS.textSecondary,
    },
    drawerHeader: {
        padding: PADDINGS.large,
        backgroundColor: COLORS.background,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    drawerHeaderText: {
        fontWeight: "bold",
        fontSize: TEXT_SIZES.medium,
        color: COLORS.textPrimary,
    },
});
