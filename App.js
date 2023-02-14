/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './src/navigation/navigator';
import FlashMessage from 'react-native-flash-message';
import setupNotifications from './src/firebase/notifications';

function App() {
  useEffect(() => {
    setupNotifications();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Navigator />
        <FlashMessage position="bottom" />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default App;
