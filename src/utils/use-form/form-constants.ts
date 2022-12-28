import { NOT_CORRECT_EMAIL, REQUIRED_EMAIL, REQUIRED_PASSWORD, TO_SHORT_PASSWORD } from '../constants/error-conatants';
import { emailRegExp } from 'utils/constants/regExp-constants';
import { FormRulesType } from 'utils/use-form/form-types';

export const emailRules: FormRulesType = {
  required: { message: REQUIRED_EMAIL, value: true },
  pattern: { message: NOT_CORRECT_EMAIL, value: emailRegExp },
};

export const passwordRules: FormRulesType = {
  required: { message: REQUIRED_PASSWORD, value: true },
  minLength: { message: TO_SHORT_PASSWORD, value: 8 },
};
