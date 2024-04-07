import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';
import { Input } from '../Input';
import { Control, Controller } from 'react-hook-form';

interface Props extends TextInputProps {
  control: Control<any>;
  name: string;
}

export function InputForm({ control, name, ...rest }: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input {...rest} onChangeText={onChange} value={value} />
        )}
        name={name}
      />
    </Container>
  );
}
