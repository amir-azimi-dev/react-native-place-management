import { FlatList, StyleSheet, Text, View } from "react-native";
import { Place } from "../types";
import PlaceItem from "./PlaceItem";

const PlacesList = ({ places }: { places: Place[] }) => {
    return (
        <View style={styles.container}>
            {!places.length ? (
                <FlatList
                    data={places}
                    renderItem={({ item }) => <PlaceItem {...item} />}
                    keyExtractor={item => item.id}
                />
            ) : (
                <Text style={styles.fallback}>No Places Yet!</Text>
            )}
        </View>
    )
};

export default PlacesList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20
    },

    fallback: {
        marginHorizontal: "auto",
        marginVertical: "auto",
        fontSize: 24,
        fontWeight: "bold"
    }
});