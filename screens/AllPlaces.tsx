import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import PlacesList from "../components/PlacesList";
import { Place } from "../types";

const AllPlaces = () => {
    const [placesData, setPlacesData] = useState<Place[]>([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) return;

        (async () => {
            const stringifiedPlacesData = await AsyncStorage.getItem("places");
            const placesData = stringifiedPlacesData ? JSON.parse(stringifiedPlacesData) : [];

            setPlacesData(placesData);

        })();

    }, [isFocused]);

    return <PlacesList places={placesData} />
};

export default AllPlaces;

const styles = StyleSheet.create({});