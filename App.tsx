import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackNavigationProps } from "./types/navigation";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import PlaceDetails from "./screens/PlaceDetails";
import Map from "./screens/Map";
import { createStaticNavigation } from "@react-navigation/native";
import IconButton from "./components/IconButton";
import COLORS from "./constants/colors";

const StackNavigator = createNativeStackNavigator<RootStackNavigationProps>({
  initialRouteName: "AllPlaces",
  screenOptions: {
    headerStyle: {
      backgroundColor: COLORS.primary500,
    },

    headerTintColor: COLORS.gray700,
    contentStyle: {
      backgroundColor: COLORS.gray700
    }
  },

  screens: {
    AllPlaces: {
      screen: AllPlaces,
      options: ({ navigation }) => ({
        title: "Your Favorite Places",
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            color={tintColor}
            size={30}
            onPress={() => navigation.navigate("AddPlace", undefined)}
          />
        )
      })
    },

    AddPlace: {
      screen: AddPlace,
      options: {
        title: "Add Place"
      }
    },

    Map: {
      screen: Map,
      options: {
        title: "Pick the Location",
        presentation: "modal"
      }
    },

    PlaceDetails: {
      screen: PlaceDetails,
      options: {
        title: "Place Details"
      }
    },
  }
});

const Navigation = createStaticNavigation(StackNavigator);

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <Navigation />
    </>
  );
};