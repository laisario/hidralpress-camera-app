import { View, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react'
import { useTheme } from '@react-navigation/native';

function Loading() {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
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