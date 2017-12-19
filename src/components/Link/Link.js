import React from 'react';
import { Text } from 'react-native';
import { string, object, oneOfType, any, number } from 'prop-types';
import Routing from '../../utils/routing';
import { isWeb } from '../../utils/common';

const { Link: NativeLink } = Routing;

const Link = ({
  to,
  children,
  style,
  textStyle
}) => (
  <NativeLink
    to={to}
    style={isWeb ? {} : style}
    className={isWeb ? style : ''}
  >
    <Text style={textStyle}>{children}</Text>
  </NativeLink>
);

Link.propTypes = {
  to: oneOfType([object, string]).isRequired,
  children: any,
  style: oneOfType([object, string, number])
};

export default Link;
