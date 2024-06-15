import { Stack, useNavigation } from "expo-router";
import { useEffect } from "react";

export default function Layout() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: true });
    }, [navigation]);
    
    return <Stack screenOptions={{ headerShown: false }}>
    </Stack>;
}
