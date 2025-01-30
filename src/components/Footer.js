import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Footer() {
  return (
    <View style={styles.footer}>
      <View style={styles.divider} />
      <Text style={styles.text}>Boa sessão de fotos!</Text>
    </View>
  );
}

export default Footer;


const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 5,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
});