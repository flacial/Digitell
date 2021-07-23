import * as Notifications from "expo-notifications";
import { Constants } from "react-native-unimodules";
import { Platform } from 'react-native';

export const registerForPushNotificationAsync = async () => {
    let token;

    // Check if the device is physical or an emulator
    if (Constants.isDevice) {
      // Notifications permission status
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification");
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must be a physical device for Push Notifications!");
      return;
    }

    // Android require to set a channel to receive/send notifications
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      })
    }

    console.log(token)
    return token
  };