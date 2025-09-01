import { useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { PlaceDetailsScreenProps, PlaceDetailsScreenRouteProps } from "../types/navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Place } from "../types";
import Container from "../components/Container";
import COLORS from "../constants/colors";
import Button from "../components/Button";

const PlaceDetails = () => {
    const [placeData, setPlaceData] = useState<Place | undefined>();

    const placeId = useRoute<PlaceDetailsScreenRouteProps>().params.id;
    const navigation = useNavigation<PlaceDetailsScreenProps>();


    useLayoutEffect(() => {
        if (!placeId) return;

        (async () => {
            const stringifiedPlacesData = await AsyncStorage.getItem("places");
            const placesData: Place[] = stringifiedPlacesData ? JSON.parse(stringifiedPlacesData) : [];

            const targetPlace = placesData.find(place => place.id === placeId);
            if (!targetPlace) return navigation.navigate("AllPlaces");

            navigation.setOptions({ title: targetPlace.title });
            setPlaceData(targetPlace);

        })();

    }, [placeId]);

    const showMapHandler = () => {
        if (!placeData?.location) return;
        navigation.navigate("Map", {
            longitude: placeData.location.longitude,
            latitude: placeData.location.latitude,
            isStatic: true
        })
    };

    if (!placeData) return <ActivityIndicator style={styles.loader} size="large" />

    return (
        <Container>
            <ScrollView style={styles.scrollView}>
                <Image source={{ uri: placeData.imageURI }} style={styles.image} />

                <View style={styles.detailsContainer}>
                    <Text style={styles.title}><Text style={styles.text}>Title: </Text>{placeData.title} sdlkfjdsf ldkfjdslkjfdlskj</Text>
                    <Text style={styles.address}><Text style={styles.text}>Address: </Text>{placeData.address}</Text>
                </View>

                <View>
                    <Button title="View on Map" onPress={showMapHandler} />
                </View>
            </ScrollView>
        </Container>
    )
};

export default PlaceDetails;

const styles = StyleSheet.create({
    loader: {
        flex: 1
    },

    scrollView: {
        flex: 1,
        paddingHorizontal: 10,
        marginHorizontal: -10
    },

    image: {
        width: "100%",
        aspectRatio: 16 / 9,
        borderRadius: 6
    },

    detailsContainer: {
        marginVertical: 20
    },

    title: {
        textAlign: "center",
        marginBottom: 14,
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.primary500
    },

    address: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.primary500
    },

    text: {
        fontWeight: 400
    }
});