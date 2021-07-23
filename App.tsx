import React, { useEffect } from "react";
import Header from "./src/containers/Header";
import Guesser from "./src/components/guesser/guesser";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import Cwrapper from "./src/components/components-wrapper/componentsWrapper";
import Scores from "./src/components/scores/scores";
import { registerForPushNotificationAsync } from "./src/utils/registerForPushNotificationsAsync";
import * as Notifications from "expo-notifications"
import { View, Text } from 'react-native'

// How to handle notifications when the app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

const App = () => {
  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState(false)
  const notificationsListener = React.useRef({})
  const responseListener = React.useRef({})


  React.useEffect(() => {
    // Get Expo Push Token
    registerForPushNotificationAsync().then(token => setExpoPushToken(token)).catch(console.log)

    // Listen to the received notifications and update the state.
    notificationsListener.current = Notifications.addNotificationReceivedListener((notification: any) => setNotification(notification))

    // Listen to user interactions with the notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => console.log(response))

    return () => {
      // Remove the listeners
      Notifications.removeNotificationSubscription(notificationsListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  return (
    <Provider store={store}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Cwrapper>
        <Header />
        <Scores />
        <Guesser />
      </Cwrapper>
    </Provider>
  );
};

export default App;
