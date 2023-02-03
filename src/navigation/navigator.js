import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NavigatorPath from './navigatorPaths';
import login from '../screens/Login/login';

const RootStack = createStackNavigator();

const PublicNavigator = () => (
  <RootStack.Navigator initialRouteName={NavigatorPath.LOGIN}>
    <RootStack.Screen
      name={NavigatorPath.LOGIN}
      component={login}
      options={{
        headerShown: false,
      }}
    />
  </RootStack.Navigator>
);

const Navigator = () => {
  return <PublicNavigator />;
};

export default Navigator;
