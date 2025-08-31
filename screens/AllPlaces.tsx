import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/PlacesList";
import { Place } from "../types";

const AllPlaces = () => {
    const [placesData, setPlacesData] = useState<Place[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) return;

        (async () => {
            setIsLoading(true);
            const stringifiedPlacesData = await AsyncStorage.getItem("places");
            const placesData = stringifiedPlacesData ? JSON.parse(stringifiedPlacesData) : [];

            setPlacesData(placesData);
            setIsLoading(false);
        })();

    }, [isFocused]);

    if (isLoading) return <ActivityIndicator style={styles.loader} size={"large"} />;

    return <PlacesList places={placesData} />
};

export default AllPlaces;

const styles = StyleSheet.create({
    loader: {
        flex: 1
    }
});