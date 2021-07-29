import React from 'react'
import { View, Text } from 'react-native'

const NotificationsExp = ({notification, expoPushToken}) => (
	<>
	 <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
    </>
)

export default NotificationsExp