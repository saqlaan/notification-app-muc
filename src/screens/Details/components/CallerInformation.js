import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@react-native-material/core';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import InformationItem from './InformationItem';

export default function CallerInformation({ callerInfo }) {
  return (
    <View>
      <Text style={styles.title} variant="h5" color={colors.grey2}>
        Caller Information
      </Text>
      <View style={styles.content}>
        <InformationItem title={'Caller Name'} subtitle={callerInfo.name} />
        <InformationItem title={'Caller Type'} subtitle={callerInfo.type} />
        <InformationItem title={'Brokerage'} subtitle={callerInfo.brokerage} />
        <InformationItem title={'Mobile'} subtitle={callerInfo.mobile} />
        <InformationItem title={'Email'} subtitle={callerInfo.email} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.SEMI_BOLD,
  },
  content: {
    paddingHorizontal: 10,
    paddingTop: 25,
  },
});
