import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name="(notes)"
                    options={{
                        drawerLabel: "Home",
                        title: "Notes",
                    }}
                />
                <Drawer.Screen
                    name="labels"
                    options={{
                        drawerLabel: "Labels",
                        title: "Labels",
                    }}
                />
                <Drawer.Screen
                    name="folders"
                    options={{
                        drawerLabel: "Folders",
                        title: "Folders",
                    }}
                />
                <Drawer.Screen
                    name="trash"
                    options={{
                        drawerLabel: "Trash",
                        title: "Trash",
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
