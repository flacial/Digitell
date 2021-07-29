import React from "react";
import Header from "./src/containers/Header";
import Guesser from "./src/components/guesser/guesser";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import Cwrapper from "./src/components/components-wrapper/componentsWrapper";
import Scores from "./src/components/scores/scores";
import { registerForPushNotificationsAsync } from "./src/utils/registerForPushNotificationsAsync";
import * as Notifications from "expo-notifications";
import { View, Text } from "react-native";
import NotificationsExp from "./src/components/experimental/notificationsExp";

// Handling notifications when the app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const App = () => {
  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState(false);
  const notificationsListener = React.useRef<any>();
  const responseListener = React.useRef<any>();

  React.useEffect(() => {
    // Get Expo Push Token
    registerForPushNotificationsAsync().then((token: any) =>
      setExpoPushToken(token)
    );

    // Listen to the received notifications and update the state.
    notificationsListener.current =
      Notifications.addNotificationReceivedListener((notification: any) =>
        setNotification(notification)
      );

    // Listen to user interactions with the notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) =>
        console.log(response)
      );

    return () => {
      // Remove the listeners
      Notifications.removeNotificationSubscription(
        notificationsListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <Provider store={store}>
      {
        // <NotificationsExp expoPushToken={expoPushToken} notification={notification}/>
      }
      <Cwrapper>
        <Header />
        <Scores />
        <Guesser />
      </Cwrapper>
    </Provider>
  );
};

export default App;
