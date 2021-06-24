
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Header from './Header'

function App() {
    return (
        <View style={styles.container}>
            <Header />
            <Text>Open up App.tsx to start working on your app!</Text>
            <StatusBar style="auto" />
        </View>
    )
}
export default App
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
}) 
