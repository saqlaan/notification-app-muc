import axios from 'axios';
import Constants from '../constants/env';
import { updateNotification } from './user';

export const confirmRecipt = async (id, caseNumber) => {
  // Confirm on the netsuite
  // Update the firebase
  const config = {
    headers: {
      'Ocp-Apim-Subscription-Key': '1c7deac4594d44fbae5a042838138725',
    },
  };
  try {
    await axios.patch(
      `${Constants.netsuiteSuiteSandbox}/supportcase/${caseNumber}`,
      {
        confirmed: true,
        timestamp: Date.now(),
      },
      config,
    );
    updateNotification({
      id,
      data: {
        isConfirmed: true,
      },
    });
    return true;
  } catch (e) {
    return false;
  }
};
