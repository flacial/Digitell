
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import globalStyles from '../styles/styles'
import { StatusBar } from 'expo-status-bar'

function Header() {
    return (
        <View style={styles.container}>
            <Text style={{ globalStyles }}></Text>
        </View>
    )
}
export default Header
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
}) 
