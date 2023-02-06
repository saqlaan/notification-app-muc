import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { createStackNavigator } from '@react-navigation/stack';
import NavigatorPath from './navigatorPaths';
import login from '../screens/Login/login';
import Welcome from '../screens/Welcome/welcome';

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

const PrivateNavigator = () => (
  <RootStack.Navigator initialRouteName={NavigatorPath.WELCOME}>
    <RootStack.Screen
      name={NavigatorPath.WELCOME}
      component={Welcome}
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
    return subscriber; // unsubscribe on unmount
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
