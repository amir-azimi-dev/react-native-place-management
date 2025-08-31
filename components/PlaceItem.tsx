import { Image, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Place } from "../types";
import COLORS from "../constants/colors";
import { AllPlacesScreenProps } from "../types/navigation";

const PlaceItem = ({ id, title, address, imageURI }: Place) => {
    const navigation = useNavigation<AllPlacesScreenProps>();

    const navigateToDetailsScreenHandler = (): void => {
        navigation.navigate("PlaceDetails", { id });
    };

    return (
        <Pressable
            onPress={navigateToDetailsScreenHandler}
            style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
            android_ripple={{ color: COLORS.primary200 }}
        >
            <Image source={{ uri: imageURI }} style={styles.image} />

            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.address}>{address}</Text>
            </View>
        </Pressable>
    )
};

export default PlaceItem;

const styles = StyleSheet.create({
    pressable: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 5,
        backgroundColor: COLORS.primary500,
        borderRadius: 6,
        boxShadow: "2px 0 8px #00000041"
    },

    pressed: {
        opacity: 0.75,
        backgroundColor: Platform.select({ ios: COLORS.primary200 })
    },

    image: {
        width: "34%",
        aspectRatio: 16 / 9,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6
    },

    title: {
        marginBottom: 4,
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.gray700
    },

    address: {
        fontSize: 12,
        fontWeight: "bold",
        color: COLORS.gray700
    },
});