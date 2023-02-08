import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from '@react-native-material/core';
import fonts from '../../theme/fonts';

export default function NotificationItem({
  imgSrc,
  title,
  description,
  time,
  isSeen,
  ...rest
}) {
  return (
    <View style={[styles.container]}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: imgSrc }} />
        <View style={styles.active} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text variant={'body1'} style={styles.title}>
          {title}
        </Text>
        <Text variant={'caption'} style={styles.body}>
          {description}
        </Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {},
  image: {
    aspectRatio: 1,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#142356',
    width: 55,
    height: 55,
  },
  descriptionContainer: {
    paddingHorizontal: 10,
    flex: 1,
  },
  title: {
    fontFamily: fonts.BOLD,
    color: '#000',
    marginBottom: 3,
  },
  body: {
    fontFamily: fonts.REGULAR,
    color: '#000',
  },
  timeContainer: {},
  time: {
    color: '#B4B9C1',
    fontFamily: fonts.BOLD,
    fontSize: 13,
  },
  active: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: '#F8A435',
    position: 'absolute',
    top: 0,
    right: -5,
    zIndex: 99999,
  },
});
