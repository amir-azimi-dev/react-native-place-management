import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


type RootStackNavigationProps = {
    AllPlaces: undefined;
    AddPlace: undefined;
    PlaceDetails: { id: string };
};

type AllPlacesScreenProps = NativeStackNavigationProp<RootStackNavigationProps, "AllPlaces">;
type AddPlaceScreenProps = NativeStackNavigationProp<RootStackNavigationProps, "AddPlace">;
type PlaceDetailsScreenProps = NativeStackNavigationProp<RootStackNavigationProps, "PlaceDetails">;

type AddPlaceScreenRouteProps = RouteProp<RootStackNavigationProps, "PlaceDetails">;


export {
    RootStackNavigationProps,
    AllPlacesScreenProps,
    AddPlaceScreenProps,
    PlaceDetailsScreenProps,
    AddPlaceScreenRouteProps
};