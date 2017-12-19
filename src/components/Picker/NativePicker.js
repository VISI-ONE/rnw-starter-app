import React from 'react';
import { Picker } from 'react-native';

export const NativePicker = ({
  style,
  currentValue,
  onChange,
  options,
}) => (
  <Picker
    style={style}
    selectedValue={currentValue}
    onValueChange={onChange}
  >
    {options.map(option => (
      <Picker.Item key={`${option.label}_${option.value}`} label={option.label} value={option.value} />
    ))}
  </Picker>
);

export default NativePicker;
