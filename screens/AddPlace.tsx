import { useState } from "react";
import { StyleSheet, ScrollView, Text, View, TextInput, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AddPlaceScreenProps } from "../types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Container from "../components/Container";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/LocationPicker";
import Button from "../components/Button";
import COLORS from "../constants/colors";
import Place from "../models/Place";
import { Place as PlaceInterface } from "../types";

const inputInitialValue = {
    title: "",
    address: ""
};

const AddPlace = () => {
    const [inputValues, setInputValues] = useState<{ title: string, address: string }>(inputInitialValue);
    const [pickedImage, setPickedImage] = useState<string | undefined>();
    const [location, setLocation] = useState<{ longitude: number, latitude: number } | null>(null);

    const navigation = useNavigation<AddPlaceScreenProps>();

    const updateInputValue = (inputKey: "title" | "address", newValue: string | number) => {
        setInputValues(prevValues => ({ ...prevValues, [inputKey]: newValue }));
    };

    const pickImageHandler = (imageUri: string): void => setPickedImage(imageUri);
    const pickLocationHandler = (location: { longitude: number, latitude: number } | null): void => setLocation(location);

    const createPlaceHandler = async (): Promise<void> => {
        const isFormValid = validateForm();
        if (!isFormValid) return;

        const placeData = new Place(
            inputValues.title,
            inputValues.address,
            pickedImage!,
            { latitude: location!.latitude, longitude: location!.longitude }
        );

        const stringifiedPrevPlacesData = await AsyncStorage.getItem("places");
        const prevPlacesData: PlaceInterface[] = stringifiedPrevPlacesData ? JSON.parse(stringifiedPrevPlacesData) : [];
        const newPlacesData = [...prevPlacesData, placeData];
        await AsyncStorage.setItem("places", JSON.stringify(newPlacesData));

        navigation.popToTop();
        navigation.replace("AllPlaces");
    };

    const validateForm = (): boolean => {
        if (inputValues.title.trim().length < 4) {
            Alert.alert("Invalid Form Data", "Place Title must have at least 3 characters!");
            return false;
        }

        if (inputValues.address.trim().length < 9) {
            Alert.alert("Invalid Form Data", "Place Address must have at least 8 characters!");
            return false;
        }

        if (!pickedImage) {
            Alert.alert("Invalid Form Data", "An Image must be picked!");
            return false;
        }

        if (!location) {
            Alert.alert("Invalid Form Data", "The Location must be picked!");
            return false;
        }

        return true;
    };

    return (
        <Container>
            <ScrollView style={styles.scrollView}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Title</Text>
                    <TextInput
                        inputMode="text"
                        placeholder="Title ..."
                        value={inputValues.title}
                        onChangeText={updateInputValue.bind(this, "title")}
                        style={styles.input}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Address</Text>
                    <TextInput
                        inputMode="text"
                        placeholder="Address ..."
                        value={inputValues.address}
                        onChangeText={updateInputValue.bind(this, "address")}
                        style={[styles.input, styles.addressInput]}
                        multiline
                        numberOfLines={3}
                    />
                </View>

                <View style={styles.ImagePickerContainer}>
                    <Text style={styles.inputLabel}>Image</Text>

                    <View style={styles.pickedImageContainer}>
                        {pickedImage ? (
                            <Image source={{ uri: pickedImage }} style={styles.pickedImage} />
                        ) : (
                            <View style={styles.pickImagePlaceHolderContainer}>
                                <Text style={styles.pickImagePlaceHolderText}>No Image Has Been Picked Yet!</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.imagePickersContainer}>
                        <ImagePicker onPick={pickImageHandler} takeImage />
                        <ImagePicker onPick={pickImageHandler} />
                    </View>
                </View>

                <LocationPicker markedLocation={location} onPickLocation={pickLocationHandler} />

                <View style={styles.buttonContainer}>
                    <Button title="Add Place" onPress={createPlaceHandler} />
                </View>
            </ScrollView>
        </Container>
    )
};

export default AddPlace;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        paddingHorizontal: 10,
        marginHorizontal: -10
    },

    inputContainer: {
        marginBottom: 16
    },

    inputLabel: {
        marginBottom: 5,
        color: COLORS.primary500,
        fontWeight: "bold"
    },

    input: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: "bold",
        borderWidth: 1,
        backgroundColor: COLORS.primary100,
        borderColor: COLORS.primary500,
        borderRadius: 6
    },

    addressInput: {
        verticalAlign: "top",
        minHeight: 100
    },

    ImagePickerContainer: {
        marginBottom: 16
    },

    pickedImageContainer: {
        width: "100%",
        aspectRatio: 16 / 9,
        marginBottom: 10,
        borderRadius: 6,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: COLORS.primary500
    },

    pickedImage: {
        width: "100%",
        height: "100%",
        borderRadius: 6
    },

    pickImagePlaceHolderContainer: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary100
    },

    pickImagePlaceHolderText: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "bold"
    },

    imagePickersContainer: {
        display: "flex",
        flexDirection: "row",
        columnGap: 6
    },

    buttonContainer: {
        marginVertical: 20,
        paddingTop: 20,
        borderTopWidth: 0.5,
        borderColor: "#ccc"
    }
});