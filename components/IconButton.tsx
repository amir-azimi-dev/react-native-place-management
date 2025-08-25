import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconButtonPropsTypes = {
    icon: "add";
    color?: string;
    size?: number;
    onPress?: () => void;
};

const IconButton = ({ icon, color = "#000", size = 24, onPress }: IconButtonPropsTypes) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.container, pressed && styles.pressedContainer]}>
            <Ionicons name={icon} color={color} size={size} />
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    container: {
        marginRight: 2
    },

    pressedContainer: {
        opacity: 0.6
    }
});