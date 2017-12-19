import { Platform } from 'react-native';

export const isWeb = Platform.OS === 'web';
export const isNative = Platform.OS === 'ios' || Platform.OS === 'android';
export const isIos = Platform.OS === 'ios';
export const isDev = process.env.NODE_ENV !== 'production';
export const extractValueFromEvent = (event) => event.target ? event.target.value : event;
export const extractKeyFromEvent = (event) => event.nativeEvent ? event.nativeEvent.key : event.key;
