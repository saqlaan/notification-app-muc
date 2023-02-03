import React from 'react';
import {View} from 'react-native';

export default function Spacer({children, marginVertical, marginHorizontal}) {
  return (
    <View
      style={[
        marginVertical && {marginVertical: marginVertical},
        marginHorizontal && {marginHorizontal: marginHorizontal},
      ]}>
      {children}
    </View>
  );
}
