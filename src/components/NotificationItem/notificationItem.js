import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '@react-native-material/core';
import fonts from '../../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import navigatorPaths from '../../navigation/navigatorPaths';
import ProfileImage from '../../assets/images/profile-icon.jpg';

export default function NotificationItem({ notificationData, ...rest }) {
  const navigation = useNavigation();
  const { title, description, time, isSeen } = notificationData;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(navigatorPaths.DETAILS, { notificationData })
      }
      style={[styles.container]}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={ProfileImage} />
        {!isSeen && <View style={styles.active} />}
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
    </TouchableOpacity>
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
    fontFamily: fonts.SEMI_BOLD,
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
    fontFamily: fonts.SEMI_BOLD,
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
