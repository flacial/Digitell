
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Header from './src/containers/Header'
import Guesser from './src/components/guesser/guesser'

function App() {
    return (
        <View style={styles.container}>
            <Guesser />
            {/* <Header /> */}
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
        justifyContent: 'center',
        display: "flex",
        margin: 'auto',
        flexDirection: "row"
    },
}) 
