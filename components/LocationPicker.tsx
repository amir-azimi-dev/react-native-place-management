import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import COLORS from "../constants/colors";
import Button from "./Button";
import * as Location from 'expo-location';
import MapView, { Marker } from "react-native-maps";

const LocationPicker = () => {
    const [status, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
        console.log(location);
        setLocation(location);
    };

    const openStreetMapUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

    return (
        <View>
            <Text style={styles.title}>Location</Text>

            <View style={styles.mapContainer}>

                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: 35.6892,
                        longitude: 51.3890,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }}
                >
                    <Marker coordinate={{ latitude: 35.6892, longitude: 51.3890 }} />
                </MapView>
            </View>

            <View style={styles.locationButtonsContainer}>
                <Button title="Locate User" icon="location" onPress={getCurrentLocationHandler} />
                <Button title="Pick on Map" icon="map" />
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

    locationButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        columnGap: 6
    }
});