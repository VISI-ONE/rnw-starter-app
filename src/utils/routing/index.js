import { isWeb } from '../common';

const RouterPackage = isWeb
  ? require('react-router-dom')
  : require('react-router-native');

export const Router = isWeb
  ? RouterPackage.BrowserRouter
  : RouterPackage.NativeRouter;

export default RouterPackage;
