import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import colors from '../../theme/colors';

export default function TextInputIcon({ icon, ...rest }) {
  return (
    <View style={[styles.container]}>
      {icon && (
        <>
          {icon}
          <View style={styles.spacer} />
        </>
      )}
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    alignItems: 'center',
  },
  spacer: {
    marginHorizontal: 5,
  },
  inputStyle: {
    flex: 1,
    color: colors.grey1,
    fontFamily: 'OpenSans-Regular',
  },
});
