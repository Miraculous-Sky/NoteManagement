import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen
                    name="(drawer)"
                    options={{ headerShown: false }}
                ></Stack.Screen>
                <Stack.Screen
                    name="[id]"
                    options={{ title: "Note" }}
                ></Stack.Screen>
                <Stack.Screen
                    name="add"
                    options={{ title: "Add Note" }}
                ></Stack.Screen>
                <Stack.Screen
                    name="manage-labels"
                    options={{ title: "Manage Labels" }}
                ></Stack.Screen>
                <Stack.Screen
                    name="manage-note"
                    options={{ title: "Manage Note" }}
                ></Stack.Screen>
            </Stack>
        </GestureHandlerRootView>
    );
}
