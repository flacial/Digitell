import * as Notifications from "expo-notifications";
import { Constants } from "react-native-unimodules";
import { Platform } from 'react-native';

const experienceId = "@flacial/Digitell";

export const registerForPushNotificationsAsync = async () => {
    let token;

    // Check if the device is physical or an emulator
    if (Constants.isDevice) {
      // Notifications permission status
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync().catch(error => alert(error, "Get Notification Permission"))
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync().catch(error => alert(error, "Request Notification Permission"));
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification");
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync({
        experienceId,
      }).catch((error) => alert(error, "Get Expo Token"))).data;
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

    // Schedule a notification every 5 seconds

    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'Remember to drink water!',
    //   },
    //   trigger: {
    //     seconds: 5,
    //     repeats: true,
    //   },
    // });

    console.log(token)
    return token
  };
