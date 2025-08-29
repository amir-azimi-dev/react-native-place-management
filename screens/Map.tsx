import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MapScreenProps, MapScreenRouteProps } from "../types/navigation";
import LeafletMap from "../components/MapLeaflet";
import { useState } from "react";
import Container from "../components/Container";
import COLORS from "../constants/colors";
import Button from "../components/Button";

const Map = () => {
    const [markedLocation, setMarkedLocation] = useState<{ latitude: number, longitude: number } | null>(null);

    const initialLocation = useRoute<MapScreenRouteProps>().params;
    const navigation = useNavigation<MapScreenProps>();

    const markLocationHandler = (location: { latitude: number; longitude: number } | null): void => setMarkedLocation(location);

    const markCurrentLocationHandler = () => markLocationHandler(initialLocation);
    const confirmLocationHandler = () => {
        if (!markedLocation) return Alert.alert("No Locations Picked!", "Please Select A Location (by tapping on the map) First!");

        navigation.replace("AddPlace", { longitude: markedLocation.longitude, latitude: markedLocation.latitude });
    };

    return (
        <Container>
            <View style={styles.mapContainer}>
                {(initialLocation?.longitude) ? (
                    <LeafletMap
                        userLocation={{
                            longitude: markedLocation?.longitude || initialLocation.longitude,
                            latitude: markedLocation?.latitude || initialLocation.latitude
                        }}
                        markedLocation={markedLocation}
                        onLocationPick={markLocationHandler}
                    />
                ) : (
                    <ActivityIndicator size={30} style={styles.loader} />
                )}
            </View>

            <View style={styles.buttonsContainer}>
                <Button title="Locate User" icon="location" onPress={markCurrentLocationHandler} />
                <Button title="Confirm Location" icon="save" onPress={confirmLocationHandler} />
            </View>
        </Container>
    )
};

export default Map;

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,
        borderWidth: 5,
        outlineWidth: 5,
        borderColor: COLORS.gray700,
        outlineColor: COLORS.primary500,
        borderRadius: 10,
        overflow: "hidden"
    },

    loader: {
        flex: 1
    },

    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        columnGap: 6,
        marginTop: 20,
        marginBottom: 40
    }
});