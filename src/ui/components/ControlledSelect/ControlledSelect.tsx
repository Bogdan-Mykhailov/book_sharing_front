import React from 'react';
import { Select } from 'antd';
import { Control, Controller, FieldValues } from 'react-hook-form';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

interface IControlledSelect {
  name: string;
  values: { id: number; name: string }[];
  mode?: 'multiple' | 'tags';
  placeholder: string;
  control: Control<any>;
  defaultValue?: string;
  rules: Omit<RegisterOptions<FieldValues, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
}

export const ControlledSelect = ({
  name,
  control,
  rules,
  placeholder,
  defaultValue,
  mode,
  values,
}: IControlledSelect) => {
  return (
    <div>
      <Controller
        render={({ field }) => (
          <Select mode={mode} {...field} placeholder={placeholder}>
            {values.map((value) => (
              <Select.Option key={value.id} value={value.id}>
                {value.name}
              </Select.Option>
            ))}
          </Select>
        )}
        defaultValue={defaultValue}
        name={name}
        control={control}
        rules={rules}
      />
    </div>
  );
};
