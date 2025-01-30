import { View, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react'

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#003366" />
    </View>
  )
}

export default Loading;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
});