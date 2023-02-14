import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@react-native-material/core';
import fonts from '../../../theme/fonts';

export default function ListEmpty({ text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontFamily: fonts.REGULAR,
  },
});
