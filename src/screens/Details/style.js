import { StyleSheet } from 'react-native';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';

export const styles = StyleSheet.create({
  detialsContainer: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    padding: 20,
  },
  rightHeaderButton: {
    backgroundColor: colors.yellow,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  actionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: '100%',
    justifyContent: 'space-between',
    paddingVertical: 20,
    gap: 10,
  },
  button: {
    flex: 1,
  },
  buttonContainerStyle: {
    height: 45,
  },
  buttonTitleStyle: {
    color: '#fff',
    fontFamily: fonts.BOLD,
    fontWeight: 700,
  },
});
