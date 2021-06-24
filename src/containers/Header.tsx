
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../styles/styles'
import { StatusBar } from 'expo-status-bar'

function Header() {
    return (
        <View style={styles.container}>
            <Text style={{color: Colors.text.primary}}>
                Digitell
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20'
    },
}) 

export default Header