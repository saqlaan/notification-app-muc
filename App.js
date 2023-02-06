/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigator from './src/navigation/navigator';
import FlashMessage from 'react-native-flash-message';

function App() {
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
