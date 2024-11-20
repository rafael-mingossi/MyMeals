import React from 'react';

import {Controller, UseControllerProps, FieldValues} from 'react-hook-form';

import {TextInput, TextInputProps} from '../TextInput/TextInput';

export function FormTextInput<FormType extends FieldValues>({
  control,
  name,
  rules,
  errorMessage,
  ...textInputProps
}: TextInputProps & UseControllerProps<FormType>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field, fieldState}) => (
        <TextInput
          errorMessage={fieldState.error?.message || errorMessage}
          value={field.value}
          onChangeText={field.onChange}
          {...textInputProps}
        />
      )}
    />
  );
}
