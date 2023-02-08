import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NavigatorPath from './navigatorPaths';
import { Welcome, Messages, Archive } from '../screens';
import AppBackground from '../components/AppBackground/appBackground';
import Header from '../components/Header/header';
import NotificationTab from '../components/NotificationTab/notificationTab';

import { authServices } from '../services/auth';
import { Text } from '@react-native-material/core';

const TopTab = createMaterialTopTabNavigator();

function NotificationScreenTab() {
  return (
    <AppBackground>
      <Header
        title={'Notifications'}
        rightButton={
          <TouchableOpacity onPress={() => authServices.logout()}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        }
      />
      <TopTab.Navigator tabBar={props => <NotificationTab {...props} />}>
        <TopTab.Screen name={NavigatorPath.MESSAGES} component={Messages} />
        <TopTab.Screen name={NavigatorPath.ARCHIVE} component={Archive} />
      </TopTab.Navigator>
    </AppBackground>
  );
}

export { NotificationScreenTab };

const styles = StyleSheet.create({
  logoutText: {
    color: '#fff',
  },
});
