import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: "Home",
                        title: "overview",
                    }}
                />
                <Drawer.Screen
                    name="labels"
                    options={{
                        drawerLabel: "Labels",
                        title: "overview",
                    }}
                />
                <Drawer.Screen
                    name="folders"
                    options={{
                        drawerLabel: "Folders",
                        title: "overview",
                    }}
                />
                <Drawer.Screen
                    name="trash"
                    options={{
                        drawerLabel: "Trash",
                        title: "overview",
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
