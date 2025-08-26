import { FlatList, StyleSheet, Text, View } from "react-native";
import { Place } from "../types";
import Container from "./Container";
import PlaceItem from "./PlaceItem";
import COLORS from "../constants/colors";

const PlacesList = ({ places }: { places: Place[] }) => {
    return (
        <Container>
            {!places.length ? (
                <FlatList
                    data={places}
                    renderItem={({ item }) => <PlaceItem {...item} />}
                    keyExtractor={item => item.id}
                />
            ) : (
                <Text style={styles.fallback}>No Places Yet!</Text>
            )}
        </Container>
    )
};

export default PlacesList;

const styles = StyleSheet.create({
    fallback: {
        marginHorizontal: "auto",
        marginVertical: "auto",
        fontSize: 24,
        fontWeight: "bold",
        color: COLORS.primary200
    }
});