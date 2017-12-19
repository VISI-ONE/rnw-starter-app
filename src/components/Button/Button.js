import React from 'react';
import { string, func, number, object, oneOfType } from 'prop-types';
import { Text, TouchableHighlight } from 'react-native';

const Button = ({
  style,
  onClick,
  text,
  textStyle
}) => (
  <TouchableHighlight onPress={onClick} style={style} >
    <Text style={textStyle}>{text}</Text>
  </TouchableHighlight>
);

Button.propTypes = {
  style: oneOfType([object, string, number]),
  textStyle: oneOfType([object, string, number]),
  onClick: func,
  text: string
};

export default Button;
