import { StatusBar } from 'expo-status-bar';
import React from 'react';
import styles from '../styles/styles';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
} 