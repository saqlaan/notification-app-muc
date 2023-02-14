import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@react-native-material/core';
import fonts from '../../theme/fonts';

export default ({ title, rightButton, leftButton }) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.leftNode}>{leftButton}</View>
      <Text variant={'h6'} style={styles.title}>
        {title}
      </Text>
      <View style={styles.rightNode}>{rightButton}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.REGULAR,
    color: 'white',
  },
  rightNode: {
    position: 'absolute',
    right: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  leftNode: {
    position: 'absolute',
    left: 20,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
