import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@react-native-material/core';
import colors from '../../../theme/colors';
import fonts from '../../../theme/fonts';
import InformationItem from './InformationItem';

export default function PropertyInformation({ propertyInfo }) {
  const {
    property,
    subdivision,
    salesRep,
    lot,
    nots,
    showingDate,
    showingTime,
    salesStatus,
  } = propertyInfo;

  return (
    <View>
      <Text style={styles.title} variant="h5" color={colors.grey2}>
        Property Information
      </Text>
      <View style={styles.content}>
        <View style={styles.col}>
          <InformationItem title={'Property'} subtitle={property} />
          <InformationItem title={'Subdivision'} subtitle={subdivision} />
          <InformationItem title={'Sales Rep'} subtitle={salesRep} />
          <InformationItem title={'Lot'} subtitle={lot} />
          <InformationItem title={'Nots'} subtitle={nots} />
        </View>
        <View style={styles.col}>
          <InformationItem title={'Showing Date'} subtitle={showingDate} />
          <InformationItem title={'Showing Time'} subtitle={showingTime} />
          <InformationItem title={'Sales Status'} subtitle={salesStatus} />
        </View>
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
    flexDirection: 'row',
  },
  col: {
    flex: 1,
  },
});
