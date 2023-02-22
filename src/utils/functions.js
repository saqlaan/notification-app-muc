import { showMessage } from 'react-native-flash-message';

export const errorMessage = (text = 'Something went wrong') => {
  showMessage({
    message: text,
    type: 'danger',
  });
};

export const successMessage = (text = 'Success') => {
  showMessage({
    message: text,
    type: 'success',
  });
};
