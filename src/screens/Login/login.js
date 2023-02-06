import React, { useState } from 'react';
import { View } from 'react-native';
import AppBackground from '../../components/AppBackground/appBackground';
import { styles } from './style';
import { Button, Text } from '@react-native-material/core';
import TextInputIcon from '../../components/TextInputIcon/textInputIcon';
import Email from '../../assets/icons/email.svg';
import Password from '../../assets/icons/password.svg';
import GoogleIcon from '../../assets/icons/google.svg';
import colors from '../../theme/colors';
import Spacer from '../../components/Spacer/spacer';
import loginSchema from '../../validations/login';
import { showMessage } from 'react-native-flash-message';
import { authServices } from '../../services/auth';

export default function Login() {
  const [isSignInLoading, setIsSignInLoading] = useState({
    email: false,
    google: false,
  });
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleOnPressLogin = React.useCallback(async () => {
    const isValid = await loginSchema.isValid(form);
    if (isValid) {
      setIsSignInLoading(value => ({ ...value, email: true }));
      await authServices.emailSignIn(form.email, form.password);
      setIsSignInLoading(value => ({ ...value, email: false }));
      return;
    }
    showMessage({
      message: 'Email/Password not valid',
      type: 'danger',
    });
  }, [form]);

  const isLoginButtonDisabled = React.useCallback(() => {
    return form.email === '' && form.password === '';
  }, [form]);

  const handleGoogleSignin = async () => {
    setIsSignInLoading(value => ({ ...value, google: true }));
    await authServices.googleSignIn();
    setIsSignInLoading(value => ({ ...value, google: true }));
  };

  return (
    <AppBackground style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.emailLoginContainer}>
          <Text variant="h4" color={colors.grey1}>
            HMS Connect
          </Text>
          <Spacer marginVertical={30} />
          <>
            <TextInputIcon
              icon={<Email width="20" height="20" fill={colors.grey1} />}
              placeHolderTextColor={colors.grey1}
              placeholder={'Email'}
              keyboardType={'email-address'}
              textContentType={'emailAddress'}
              value={form.value}
              onChangeText={email => setForm(value => ({ ...value, email }))}
            />
            <Spacer marginVertical={10} />
            <TextInputIcon
              icon={<Password width="20" height="20" fill={colors.grey1} />}
              placeHolderTextColor={colors.grey1}
              placeholder={'Password'}
              textContentType={'password'}
              secureTextEntry
              value={form.password}
              onChangeText={password =>
                setForm(value => ({ ...value, password }))
              }
            />
            <Spacer marginVertical={10} />
          </>
          <Text style={styles.body2} variant="body2" color={colors.grey1}>
            Or request access from HMS
          </Text>
          <Spacer marginVertical={10} />
          <View style={styles.buttonWrapper}>
            <Button
              titleStyle={styles.buttonText}
              contentContainerStyle={styles.loginButtonContainer}
              title="Log In"
              color={colors.blue}
              uppercase={false}
              onPress={isSignInLoading.email ? null : handleOnPressLogin}
              disabled={isLoginButtonDisabled()}
              loading={isSignInLoading.email}
            />
          </View>
        </View>
        <View style={styles.socialLoginContainer}>
          <View style={styles.alignCenter}>
            <Text style={styles.body2} variant="body2" color={colors.grey1}>
              Sign in with
            </Text>
          </View>
          <Spacer marginVertical={10} />
          <Button
            titleStyle={[styles.buttonText, { color: colors.blue }]}
            title="Google"
            contentContainerStyle={styles.googleButtonContainer}
            leading={props => (
              <GoogleIcon width="20" height="20" fill={colors.grey1} />
            )}
            leadingContainerStyle={styles.googleButtonLeading}
            loading={false}
            color="white"
            onPress={handleGoogleSignin}
          />
        </View>
        <View style={styles.bottomBorder} />
      </View>
    </AppBackground>
  );
}
