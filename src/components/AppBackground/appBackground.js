import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import appBackground from '../../assets/images/app-bg.png';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function AppBackground({children, style}) {
  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.container}
      source={appBackground}>
      <SafeAreaView style={[styles.container, {...style}]} edges={['top']}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
