import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  container: {
    backgroundColor: '#f4f5f7',
    borderRadius: 6,
    overflow: 'hidden',
  },
  emailLoginContainer: {
    paddingHorizontal: 15,
    backgroundColor: '#F5F5F5',
    paddingVertical: 60,
    paddingTop: 70,
    paddingBottom: 60,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 600,
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
  },
  buttonWrapper: {
    width: 200,
  },
  loginButtonContainer: {
    height: 45,
  },
  socialLoginContainer: {
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 60,
    backgroundColor: 'white',
  },
  googleButtonContainer: {
    width: '100%',
    height: 45,
  },
  googleButtonLeading: {
    right: 40,
  },
  alignCenter: {
    alignItems: 'center',
  },
  bottomBorder: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#8898AA1A',
    position: 'absolute',
    bottom: 20,
  },
  body2: {
    fontFamily: 'OpenSans-Regular',
  },
});
