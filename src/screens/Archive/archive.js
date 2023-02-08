import React from 'react';
import { View } from 'react-native';
import { Text } from '@react-native-material/core';
import { styles } from './style';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the app</Text>
    </View>
  );
}
