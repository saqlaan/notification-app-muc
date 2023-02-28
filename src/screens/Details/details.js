import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppBackground, BackButton, Header } from '../../components';
import { styles } from './style';
import HomeIcon from '../../assets/icons/home.svg';
import CallerInformation from './components/CallerInformation';
import PropertyInformation from './components/PropertyInformation';
import colors from '../../theme/colors';
import { Button } from '@react-native-material/core';
import { useRoute } from '@react-navigation/native';
import { notificationDocRef, updateNotification } from '../../services/user';
import { confirmRecipt } from '../../services/appointment';

export default function Details() {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const { notificationData } = route.params;
  const { callerDetails, propertyDetails, isSeen, id, archived, isConfirmed } =
    notificationData;
  const [liveNotificationData, setLiveNotificationData] = useState({
    callerDetails,
    propertyDetails,
    isSeen,
    id,
    archived,
    isConfirmed,
  });
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);

  useEffect(() => {
    if (!isSeen) {
      markNotificationSeen();
    }
  }, [isSeen]);

  useEffect(() => {
    notificationDocRef(id).onSnapshot(doc => {
      setLiveNotificationData(doc.data());
    });
  }, []);

  const markNotificationSeen = () => {
    updateNotification({
      id,
      data: {
        isSeen: true,
      },
    });
  };

  const handleArchiveNotification = async () => {
    await updateNotification({
      id,
      data: {
        archived: true,
      },
    });
  };

  const handleConfirmReceipt = async () => {
    if (!liveNotificationData?.case_number) {
      alert('Error: Case number is missing');
      return;
    }
    setIsConfirmLoading(true);
    await confirmRecipt(id, liveNotificationData?.case_number);
    setIsConfirmLoading(false);
  };

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
          <CallerInformation callerInfo={liveNotificationData.callerDetails} />
          <PropertyInformation
            propertyInfo={liveNotificationData.propertyDetails}
          />
        </ScrollView>
        <View style={styles.actionContainer}>
          <Button
            loading={isConfirmLoading}
            disabled={liveNotificationData.isConfirmed}
            style={styles.button}
            contentContainerStyle={styles.buttonContainerStyle}
            variant="contained"
            title={'Confirm Receipt'}
            uppercase={false}
            color={colors.success}
            titleStyle={styles.buttonTitleStyle}
            onPress={handleConfirmReceipt}
          />
          <Button
            disabled={
              liveNotificationData.archived || !liveNotificationData.isConfirmed
            }
            style={styles.button}
            contentContainerStyle={styles.buttonContainerStyle}
            titleStyle={styles.buttonTitleStyle}
            variant="contained"
            title={liveNotificationData.archived ? 'Archived' : 'Archive'}
            uppercase={false}
            color={colors.danger}
            onPress={handleArchiveNotification}
          />
        </View>
      </View>
    </AppBackground>
  );
}
