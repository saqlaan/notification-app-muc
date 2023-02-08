import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@react-native-material/core';
import fonts from '../../theme/fonts';

export default ({ title, rightButton }) => {
  return (
    <View style={[styles.container]}>
      <Text variant={'h6'} style={styles.title}>
        {title}
      </Text>
      <View style={styles.rightNode}>{rightButton}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.REGULAR,
    color: 'white',
  },
  rightNode: {
    position: 'absolute',
    right: 10,
    top: 25,
    height: '100%',
  },
});
