import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Place } from "../types";

const PlaceItem = ({ id, title, address, imageURI, location }: Place) => {
    const navigateToDetailsScreenHandler = (): void => {
        console.log(id);
        //..
    };

    return (
        <Pressable onPress={navigateToDetailsScreenHandler}>
            <Image source={{ uri: imageURI }} />

            <View>
                <Text>{title}</Text>
                <Text>{address}</Text>
            </View>

            <View>
                <Text>longitude: {location.longitude}</Text>
                <Text>latitude: {location.latitude}</Text>
            </View>
        </Pressable>
    )
};

export default PlaceItem;

const styles = StyleSheet.create({});