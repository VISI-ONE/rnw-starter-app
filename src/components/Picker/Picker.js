import React from 'react';
import { string, array, func, number } from 'prop-types';
import { isWeb } from '../../utils/common';
import NativePicker from './NativePicker';
import WebPicker from './WebPicker';

const Picker = (props) => isWeb ? <WebPicker {...props} /> : <NativePicker {...props} />;

Picker.propTypes = {
  currentValue: string.isRequired,
  onChange: func.isRequired,
  options: array.isRequired,
  style: number,
};

export default Picker;
