import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@react-native-material/core';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';

export default function InformationItem({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="h6" color={colors.grey2}>
        {title}
      </Text>
      <Text style={styles.subTitle} variant="body2" color={colors.grey2}>
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    color: '#000',
    fontSize: 14,
    fontWeight: 700,
    fontFamily: fonts.BOLD,
  },
  subTitle: {
    fontSize: 11,
    color: '#000',
    fontFamily: fonts.REGULAR,
  },
});
