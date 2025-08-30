import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";

type ButtonPropsTypes = {
    title: string;
    icon?: "camera" | "image" | "location" | "map" | "save";
    onPress?: () => void;
};

const Button = ({ title, icon, onPress }: ButtonPropsTypes) => {
    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
                onPress={onPress}
                android_ripple={{ color: COLORS.primary500 }}
            >
                {icon && <Ionicons name={icon} color={COLORS.primary50} size={22} />}
                <Text style={styles.title}>{title}</Text>
            </Pressable>
        </View>
    )
};

export default Button;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: "2px 2px 5px #205c9c33"
    },

    pressable: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        columnGap: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: COLORS.primary700
    },

    pressed: {
        opacity: 0.7,
        backgroundColor: Platform.select({ ios: COLORS.primary500 })
    },

    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.primary50
    },
});