import { useState } from "react";
import { StyleSheet, ScrollView, Text, View, TextInput, Image } from "react-native";
import Container from "../components/Container";
import ImagePicker from "../components/ImagePicker";
import { Place } from "../types";
import COLORS from "../constants/colors";

const inputInitialValue = {
    title: "",
    address: "",
    imageURI: "",
};

const AddPlace = () => {
    const [inputValues, setInputValues] = useState<Omit<Place, "id" | "location">>(inputInitialValue);
    const [pickedImage, setPickedImage] = useState<string | undefined>();
    const [location, setLocation] = useState<{ longitude?: number, latitude?: number }>({ longitude: undefined, latitude: undefined });

    const updateInputValue = (inputKey: keyof Place, newValue: string | number) => {
        setInputValues(prevValues => ({ ...prevValues, [inputKey]: newValue }));
    };

    const pickImageHandler = (imageUri: string) => setPickedImage(imageUri);

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

                <View>
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
            </ScrollView>
        </Container>
    )
};

export default AddPlace;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1
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
        backgroundColor: COLORS.primary400
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
    }
});