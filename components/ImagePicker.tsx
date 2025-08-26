import { Alert, Button, StyleSheet, View } from "react-native";
import * as imagePicker from "expo-image-picker";


const ImagePicker = ({ takeImage, onPick }: { takeImage?: boolean, onPick?: (imageUri: string) => void }) => {
    const [cameraPermissionStatus, requestCameraPermission] = imagePicker.useCameraPermissions();
    const [mediaPermissionStatus, requestMediaPermission] = imagePicker.useMediaLibraryPermissions();

    const verifyPermission = async (type: "camera" | "mediaLibrary"): Promise<boolean> => {
        if (type === "camera" && cameraPermissionStatus?.granted) return true;
        if (type === "mediaLibrary" && mediaPermissionStatus?.granted) return true;

        if (
            type === "camera" && cameraPermissionStatus?.status === imagePicker.PermissionStatus.DENIED
            || type === "mediaLibrary" && mediaPermissionStatus?.status === imagePicker.PermissionStatus.DENIED
        ) {
            Alert.alert("Permission Denied", "For using the app, you have to grant the permissions.");
            return false;
        }

        if (type === "camera") {
            const permissionData = await requestCameraPermission();

            !permissionData.granted && Alert.alert("Permission Denied", "For taking an image, you have to grant the permission.");
            return permissionData.granted;
        }

        const permissionData = await requestCameraPermission();

        !permissionData.granted && Alert.alert("Permission Denied", "For picking an image, you have to grant the permission.");
        return permissionData.granted;
    };

    const takeImageHandler = async (): Promise<void> => {
        const isPermissionGranted = await verifyPermission("camera");
        if (!isPermissionGranted) return;

        const result = await imagePicker.launchCameraAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });

        if (result.canceled || !onPick) return;

        onPick(result.assets[0].uri);
        console.log(result.assets[0].uri)
    };

    const pickImageHandler = async (): Promise<void> => {
        const isPermissionGranted = await verifyPermission("mediaLibrary");
        if (!isPermissionGranted) return;

        const result = await imagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });

        if (result.canceled || !onPick) return;

        onPick(result.assets[0].uri);
        console.log(result.assets[0].uri)
    };

    return (
        <View style={styles.container}>
            <Button
                title={takeImage ? "Take Image" : "Pick Image"}
                onPress={takeImage ? takeImageHandler : pickImageHandler}
            />
        </View>
    )
};

export default ImagePicker;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});