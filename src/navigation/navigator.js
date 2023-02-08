import React, { useEffect, useState } from 'react';

import auth from '@react-native-firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import NavigatorPath from './navigatorPaths';
import { Login } from '../screens';
import { NotificationScreenTab } from './tabs';

const RootStack = createStackNavigator();

const PublicNavigator = () => (
  <RootStack.Navigator initialRouteName={NavigatorPath.LOGIN}>
    <RootStack.Screen
      name={NavigatorPath.LOGIN}
      component={Login}
      options={{
        headerShown: false,
      }}
    />
  </RootStack.Navigator>
);

const PrivateNavigator = () => (
  <RootStack.Navigator initialRouteName={NavigatorPath.HOME}>
    <RootStack.Screen
      name={NavigatorPath.HOME}
      component={NotificationScreenTab}
      options={{
        headerShown: false,
      }}
    />
  </RootStack.Navigator>
);

const Navigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  }
  if (user) {
    return <PrivateNavigator />;
  }
  return <PublicNavigator />;
};

export default Navigator;
