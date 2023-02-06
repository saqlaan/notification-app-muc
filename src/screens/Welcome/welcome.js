import React, { useState } from 'react';
import { View } from 'react-native';
import AppBackground from '../../components/AppBackground/appBackground';
import { Button, Text } from '@react-native-material/core';
import auth from '@react-native-firebase/auth';
import { styles } from './style';
export default function Welcome() {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const handleLogout = async () => {
    setIsSigningOut(true);
    await auth().signOut();
    setIsSigningOut(false);
  };

  return (
    <AppBackground style={styles.mainContainer}>
      <View style={styles.container}>
        <Text>Welcome to the app</Text>
        <Button
          loading={isSigningOut}
          onPress={isSigningOut ? null : handleLogout}
          title="Logout"
        />
      </View>
    </AppBackground>
  );
}
