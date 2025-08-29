import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/colors";
import Button from "./Button";
import * as Location from 'expo-location';
import LeafletMap from "./MapLeaflet";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AddPlaceScreenRouteProps, MapScreenProps } from "../types/navigation";

const LocationPicker = () => {
    const [status, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [markedLocation, setMarkedLocation] = useState<{ latitude: number, longitude: number } | null>(null);

    const navigation = useNavigation<MapScreenProps>();
    const selectedLocation = useRoute<AddPlaceScreenRouteProps>().params;

    useEffect(() => {
        if (!selectedLocation) return;

        const { longitude, latitude } = selectedLocation;
        setMarkedLocation({ longitude, latitude });

    }, [selectedLocation]);

    useEffect(() => {
        getCurrentLocationHandler();

    }, []);

    const verifyPermission = async (): Promise<boolean> => {
        if (status?.granted) return true;

        if (status?.status === Location.PermissionStatus.DENIED) {
            Alert.alert("Permission Denied", "For using the app, you have to grant the permissions.");
            return false;
        }

        const permissionData = await requestPermission();

        !permissionData.granted && Alert.alert("Permission Denied", "To locate you, you have to grant the permission.");
        return permissionData.granted;
    };

    const getCurrentLocationHandler = async (): Promise<void> => {
        const isPermissionGranted = await verifyPermission();
        if (!isPermissionGranted) return;

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    };

    const markCurrentLocationHandler = (): void => {
        if (!location?.coords) return;

        setMarkedLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    };

    const navigateToMapScreenHandler = (): void => {
        if (!location?.coords.longitude) return;

        navigation.navigate("Map", { longitude: location.coords.longitude, latitude: location.coords.latitude });
    };

    const markLocationHandler = (location: { latitude: number; longitude: number } | null): void => setMarkedLocation(location);

    return (
        <View>
            <Text style={styles.title}>Location</Text>

            <View style={styles.mapContainer}>
                {(location?.coords.longitude) ? (
                    <LeafletMap
                        userLocation={{
                            longitude: markedLocation?.longitude || location.coords.longitude,
                            latitude: markedLocation?.latitude || location.coords.latitude
                        }}
                        markedLocation={markedLocation}
                        onLocationPick={markLocationHandler}
                        staticMap
                    />
                ) : (
                    <ActivityIndicator size={30} style={styles.loader} />
                )}
            </View>

            <View style={styles.locationButtonsContainer}>
                <Button title="Locate User" icon="location" onPress={markCurrentLocationHandler} />
                <Button title="Pick on Map" icon="map" onPress={navigateToMapScreenHandler} />
            </View>
        </View>
    )
};

export default LocationPicker;

const styles = StyleSheet.create({
    title: {
        marginBottom: 5,
        color: COLORS.primary500,
        fontWeight: "bold"
    },

    mapContainer: {
        width: "100%",
        aspectRatio: 16 / 9,
        marginBottom: 10,
        borderRadius: 6,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: COLORS.primary500
    },

    loader: {
        flex: 1
    },

    locationButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        columnGap: 6
    }
});