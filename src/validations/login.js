import {object, string} from 'yup';

export default object({
  email: string().email('Invalid Email Address'),
  password: string().required().min(8),
});
