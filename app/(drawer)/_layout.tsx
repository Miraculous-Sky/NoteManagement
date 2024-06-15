import { Drawer } from "expo-router/drawer";
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from "@react-navigation/drawer";
import { useState } from "react";
import { Alert, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { STYLES, COLORS } from "@/constants/constants";

export default function Layout() {
    const [count, setCount] = useState(0);
    const quote = [
        "There are always flowers for those who want to see them.",
        "Don't ever be ashamed of loving the strange things that make your weird little heart happy.",
        "If you want to be happy, be!",
        "A happy life is one spent in learning, earning, and yearning.",
        "It's not about being happy all the time, or being sure of all your choices. It's about knowing that life is precious, even when it's tough.",
        "A Night can NEVER defeat the Sunrise.",
        "Joy is not in things; it is in us.",
        "Happiness held is the seed; happiness shared is the flower.",
        "Misery might love company, but so does joy. And joy throws much better parties.",
        "We don't make mistakes, just happy little accidents.",
        "The way I see it, if you want the rainbow, you gotta put up with the rain!",
        "Happiness is making the most of what you have, and riches is making the most of what you've got.",
        "Happiness is a thing to be practiced, like the violin.",
        "Whoever is happy will make others happy too.",
        "Happiness is a choice that requires effort at times.",
        "Be happy for this moment. This moment is your life.",
        "There is no path to happiness; happiness is the path.",
        "I have chosen to be happy because it's good for my health.",
        "Happiness is a journey, not a destination.",
        "No medicine cures what happiness cannot.",
        "They say a person needs just three things to be truly happy in this world: Someone to love, something to do, and something to hope for.",
    ];

    if (count >= 5) {
        const min = 0;
        const max = quote.length - 1;
        const rand = Math.floor(Math.random() * (max - min + 1) + min);
        Alert.alert("HAVE A NICE DAY, MY FRIEND!", quote[rand]);
        setCount(0);
    }

    return (
        <Drawer
            drawerContent={(props) => (
                <DrawerContentScrollView {...props}>
                    <View style={STYLES.drawerHeader}>
                        <Text style={STYLES.drawerHeaderText}>Notes App</Text>
                        <TouchableOpacity onPress={() => setCount(count + 1)}>
                            <Ionicons
                                name="search"
                                size={24}
                                color={COLORS.textPrimary}
                            />
                        </TouchableOpacity>
                    </View>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            )}
        >
            <Drawer.Screen
                name="index"
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
    );
}
