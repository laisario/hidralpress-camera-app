import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/logo-hidralpress.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#757575',
    width: '100%',
    marginTop: -8
  },
  logo: {
    width: '100%',
    height: 75,
    backgroundColor: '#757575',
  },
});

export default Header;