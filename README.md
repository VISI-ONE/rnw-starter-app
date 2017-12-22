# The Platform agnostic React Native Web Starter App
### With Redux, Jest, Enzyme and React-Router

<p align="center">
<img src="https://raw.githubusercontent.com/VISI-ONE/rnw-starter-app/master/src/assets/logo.png">
</p>

## Based on
- [React Native for Web (react-native-web)](https://github.com/necolas/react-native-web)
- [React Everywhere boilerplate (react-native-template-re-start)](https://github.com/react-everywhere/re-start)
- [React](https://reactjs.org/)
- [React Native](http://facebook.github.io/react-native/)
- [Redux](https://redux.js.org/)
- [React Router](https://reacttraining.com/react-router/native/)
- [Jest](https://facebook.github.io/jest/)
- [Enzyme](http://airbnb.io/enzyme/)

## Installation

- Install yarn package manager (1.3.2): `npm i -g yarn`
- Install node (minimum: node v8.9.1) through [nvm (Node version manager)](https://github.com/creationix/nvm)
- Install [adb (Android Debug Bridge)](https://developer.android.com/studio/releases/platform-tools.html)


- Clone the repo and install dependencies
```
npm -g i react-native-cli
git clone git@github.com:VISI-ONE/rnw-starter-app.git
cd rnw-starter-app
rm -rf .git
yarn
```

- install Xcode and android studio and follow the react native instructions [under the "Building Projects with Native Code" tab](http://facebook.github.io/react-native/docs/getting-started.html)

## Running

- Native - `yarn start`
- Web - `yarn web`
- IOS Simulator - `yarn ios`
- Android Simulator - `yarn android`

<p align="center">
<img src="https://raw.githubusercontent.com/VISI-ONE/rnw-starter-app/master/src/assets/desktop.png" height="450"  width="70%">
<img src="https://raw.githubusercontent.com/VISI-ONE/rnw-starter-app/master/src/assets/ios.png" height="450"  width="29%">
</p>

## Testing

- Eslint - `yarn lint`
- Eslint fix - `yarn lint-fix`
- Web - `yarn test:web`

- Web watch mode - `yarn test:web-watch`

- Native - `yarn test:native`

- Web watch mode - `yarn test:native-watch`

- Coverage - web `yarn coverage`
- Coverage - native `yarn coverage:native`
- Open Coverage - web `yarn open-coverage`
- Open Coverage - native `yarn open-coverage:native`

## Debugging

Open dev menu:
1. CMD+D (IOS) / CMD+M (Android)
2. Press "Enable Live-Reload"

[On real devices](http://facebook.github.io/react-native/releases/0.49/docs/running-on-device.html)
[React native docs](http://facebook.github.io/react-native/docs/debugging.html)


## Build
- WEB - run `yarn build`
- Android - [React native docs](http://facebook.github.io/react-native/releases/0.49/docs/signed-apk-android.html)
- IOS - [React native docs](http://facebook.github.io/react-native/releases/0.49/docs/running-on-device.html#building-your-app-for-production)


## Shortcuts
- see package.json scripts
