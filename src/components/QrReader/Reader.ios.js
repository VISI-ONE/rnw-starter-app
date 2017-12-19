import React from 'react';
import Camera from 'react-native-camera';

const codeOptions = [
  Camera.constants.BarCodeType.qr,
  Camera.constants.BarCodeType.code128,
  Camera.constants.BarCodeType.code39,
  Camera.constants.BarCodeType.code39mod43,
  Camera.constants.BarCodeType.code93,
  Camera.constants.BarCodeType.ean13,
  Camera.constants.BarCodeType.ean8,
  Camera.constants.BarCodeType.upce,
];

export const Reader = ({
  isTorchOn,
  styles,
  onBarCodeRead,
  children
}) => (
  <Camera
    onBarCodeRead={onBarCodeRead}
    barCodeTypes={codeOptions}
    style={styles}
    aspect={Camera.constants.Aspect.fill}
    torchMode={isTorchOn ? 'on' : 'off'}
    cameraType="back"
    keepAwake
  >
    {children}
  </Camera>
);

export default Reader;
