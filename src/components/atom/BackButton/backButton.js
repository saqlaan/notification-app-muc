import React from 'react';
import { TouchableOpacity } from 'react-native';
import ArrowLeft from '../../../assets/icons/arrowleft.svg';
import { useNavigation } from '@react-navigation/native';

export default function BackButton({ onPress }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress() : navigation.goBack())}>
      <ArrowLeft width="20" height="20" />
    </TouchableOpacity>
  );
}
