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
import { updateNotification } from '../../services/user';

export default function Details() {
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const { notificationData } = route.params;
  const { callerDetails, propertyDetails, isSeen, id, archived } =
    notificationData;
  const [isArchived, setIsArchived] = useState(archived);

  useEffect(() => {
    if (!isSeen) {
      markNotificationSeen();
    }
  }, [isSeen]);

  const markNotificationSeen = () => {
    updateNotification({
      id,
      data: {
        isSeen: true,
      },
    });
  };

  const archiveNotification = async () => {
    await updateNotification({
      id,
      data: {
        archived: true,
      },
    });
    setIsArchived(true);
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
          <CallerInformation callerInfo={callerDetails} />
          <PropertyInformation propertyInfo={propertyDetails} />
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
            disabled={isArchived}
            style={styles.button}
            contentContainerStyle={styles.buttonContainerStyle}
            titleStyle={styles.buttonTitleStyle}
            variant="contained"
            title={isArchived ? 'Archived' : 'Archive'}
            uppercase={false}
            color={colors.danger}
            onPress={archiveNotification}
          />
        </View>
      </View>
    </AppBackground>
  );
}
