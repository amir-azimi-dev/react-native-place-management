import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


type RootStackNavigationProps = {
    AllPlaces: undefined;
    AddPlace: { longitude: number, latitude: number } | undefined;
    Map: { longitude: number, latitude: number, isStatic?: boolean };
    PlaceDetails: { id: string };
};

type AllPlacesScreenProps = NativeStackNavigationProp<RootStackNavigationProps, "AllPlaces">;
type AddPlaceScreenProps = NativeStackNavigationProp<RootStackNavigationProps, "AddPlace">;
type MapScreenProps = NativeStackNavigationProp<RootStackNavigationProps, "Map">;
type PlaceDetailsScreenProps = NativeStackNavigationProp<RootStackNavigationProps, "PlaceDetails">;

type AddPlaceScreenRouteProps = RouteProp<RootStackNavigationProps, "AddPlace">;
type MapScreenRouteProps = RouteProp<RootStackNavigationProps, "Map">;
type PlaceDetailsScreenRouteProps = RouteProp<RootStackNavigationProps, "PlaceDetails">;


export {
    RootStackNavigationProps,
    AllPlacesScreenProps,
    MapScreenProps,
    AddPlaceScreenProps,
    PlaceDetailsScreenProps,
    AddPlaceScreenRouteProps,
    MapScreenRouteProps,
    PlaceDetailsScreenRouteProps
};