
import * as React from 'react'
import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Header from './src/containers/Header'
import Guesser from './src/components/guesser/guesser'
import currentTheme from './src/styles/currentTheme'
import { ThemeContext } from 'styled-components'

function App() {
    return (
        <ThemeContext.Provider value={currentTheme}>
            <View style={styles.container}>
                <Header />
                <Guesser />
                <StatusBar style="auto" />
            </View>
        </ThemeContext.Provider>
    )
}
export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: "flex",
        margin: 'auto',
        flexDirection: "column"
    },
}) 
