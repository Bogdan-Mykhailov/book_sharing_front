import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import { FieldValues } from 'react-hook-form';

export type FormRulesType = Omit<
  RegisterOptions<FieldValues, any>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;
