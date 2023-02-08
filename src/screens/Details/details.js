import React from 'react';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppBackground, BackButton, Header } from '../../components';
import { styles } from './style';
import HomeIcon from '../../assets/icons/home.svg';
import CallerInformation from './components/CallerInformation';
import PropertyInformation from './components/PropertyInformation';
import {
  callerInformationData,
  properyInformationData,
} from '../../constants/exampleData';
import colors from '../../theme/colors';
import { Button } from '@react-native-material/core';

export default function Details() {
  const insets = useSafeAreaInsets();

  const renderRigthButton = () => (
    <TouchableOpacity style={styles.rightHeaderButton}>
      <HomeIcon />
    </TouchableOpacity>
  );

  return (
    <AppBackground>
      <Header
        title={'Details'}
        rightButton={renderRigthButton()}
        leftButton={<BackButton />}
      />
      <View style={[styles.contentContainer, { paddingBottom: insets.bottom }]}>
        <ScrollView style={styles.scroll}>
          <CallerInformation callerInfo={callerInformationData} />
          <PropertyInformation propertyInfo={properyInformationData} />
        </ScrollView>
        <View style={styles.actionContainer}>
          <Button
            style={styles.button}
            contentContainerStyle={styles.buttonContainerStyle}
            variant="contained"
            title={'Confirm Recipt'}
            uppercase={false}
            color={colors.success}
            titleStyle={styles.buttonTitleStyle}
          />
          <Button
            style={styles.button}
            contentContainerStyle={styles.buttonContainerStyle}
            titleStyle={styles.buttonTitleStyle}
            variant="contained"
            title={'Archive'}
            uppercase={false}
            color={colors.danger}
          />
        </View>
      </View>
    </AppBackground>
  );
}
