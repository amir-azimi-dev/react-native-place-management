import { StyleSheet } from "react-native";
import PlacesList from "../components/PlacesList";
import Place from "../models/Place";

const dummyPlaces = [
    new Place("place 1", "image-1", "address 1", { longitude: 1.222, latitude: 223.22 }),
    new Place("place 2", "image-2", "address 2", { longitude: 1.222, latitude: 223.22 }),
    new Place("place 3", "image-3", "address 3", { longitude: 1.222, latitude: 223.22 }),
    new Place("place 4", "image-4", "address 4", { longitude: 1.222, latitude: 223.22 }),
];

const AllPlaces = () => {
    return <PlacesList places={dummyPlaces} />
};

export default AllPlaces;

const styles = StyleSheet.create({});