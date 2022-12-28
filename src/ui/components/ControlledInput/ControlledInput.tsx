import React from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';
import { StyledInput, StyledInputPassword } from 'ui/common-styles/common.styles';

interface IControlledInput {
  name: string;
  placeholder: string;
  control: Control<any>;
  defaultValue?: string;
  rules: Omit<RegisterOptions<FieldValues, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
}

export const ControlledInput = ({ name, control, rules, defaultValue, placeholder }: IControlledInput) => {
  const defineType = (): 'password' | 'email' | 'text' => {
    switch (name) {
      case 'password':
        return 'password';
      case 'confirmPassword':
        return 'password';
      case 'email':
        return 'email';
      default:
        return 'text';
    }
  };

  const isPassword = defineType() === 'password';

  return (
    <Controller
      render={({ field }) =>
        !isPassword ? (
          <StyledInput type={defineType()} required placeholder={placeholder} {...field} />
        ) : (
          <StyledInputPassword type={defineType()} required placeholder={placeholder} {...field} />
        )
      }
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
    />
  );
};
