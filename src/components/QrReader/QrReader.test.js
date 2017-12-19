/* eslint-disable import/no-unresolved */
import React from 'react';
import { Platform, View } from 'react-native';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { QrReader, styles, mapStateToProps, mapDispatchToProps } from './QrReader';
import Reader from './Reader.ios';
import { isWeb } from '../../utils/common';
import translations from '../../utils/locales/en-US';
import { qrVisible, qrHidden, qrReceived } from '../../actions/qr';

describe('QrReader component', () => {
  if (!isWeb) {
    it('renders properly and call qrVisible when componentDidMount - ' + Platform.OS, () => {
      const mockFunc = jest.fn();
      const tree = renderer.create(
        <QrReader isLoggedIn translations={translations} qrVisible={mockFunc} />
      );
      expect(tree.toJSON()).toMatchSnapshot();
      expect(mockFunc.mock.calls.length).toEqual(1);
      expect(mockFunc).toHaveBeenCalled();
    });

    describe('functionality', () => {
      it('receives props', () => {
        const mockFunc = jest.fn();
        const history = jest.fn();
        const tree = renderer.create(
          <QrReader isLoggedIn translations={translations} qrVisible={mockFunc} history={history} />
        ).root;

        const reader = tree.findByType(Reader);
        const container = tree.findByType(View);
        const options = tree.findByProps({ style: styles.options });
        const flashButton = options.props.children[0];
        const backButton = options.props.children[1];

        expect(reader.props.styles).toEqual(styles.preview);
        expect(typeof reader.props.onBarCodeRead).toEqual('function');
        expect(reader.props.isTorchOn).toEqual(false);
        expect(container.props.style).toEqual(styles.container);
        expect(options.props.style).toEqual(styles.options);
        expect(flashButton.props.textStyle).toEqual(styles.button);
        expect(flashButton.props.text).toEqual(translations.flash);
        expect(typeof flashButton.props.onClick).toEqual('function');
        expect(backButton.props.textStyle).toEqual(styles.button);
        expect(backButton.props.text).toEqual(translations.back);
        expect(typeof backButton.props.onClick).toEqual('function');
      });

      it('returns to the previous route on back-button click', () => {
        const mockFunc = jest.fn();
        const history = { goBack: jest.fn() };
        const tree = renderer.create(
          <QrReader isLoggedIn translations={translations} qrVisible={mockFunc} history={history} />
        ).root;

        const options = tree.findByProps({ style: styles.options });
        const backButton = options.props.children[1];
        backButton.props.onClick();

        expect(mockFunc.mock.calls.length).toEqual(1);
        expect(mockFunc).toHaveBeenCalled();
      });

      it('returns to toggle flash (isTorchOn) on flash-button click', () => {
        const mockFunc = jest.fn();
        const history = { goBack: jest.fn() };
        const tree = renderer.create(
          <QrReader isLoggedIn translations={translations} qrVisible={mockFunc} history={history} />
        ).root;

        const reader = tree.findByType(Reader);
        const options = tree.findByProps({ style: styles.options });
        const flashButton = options.props.children[0];
        expect(reader.props.isTorchOn).toEqual(false);
        flashButton.props.onClick();

        expect(mockFunc.mock.calls.length).toEqual(1);
        expect(mockFunc).toHaveBeenCalled();
        expect(reader.props.isTorchOn).toEqual(true);
      });

      it('componentWillUnmount calls qrHidden action', () => {
        const mockFunc = jest.fn();
        const qrHiddenMockFunc = jest.fn();
        const history = { goBack: jest.fn() };
        const tree = renderer.create(
          <QrReader isLoggedIn translations={translations} qrVisible={mockFunc} history={history} qrHidden={qrHiddenMockFunc} />
        );

        const reader = tree.getInstance();
        expect(qrHiddenMockFunc).not.toBeCalled();
        reader.componentWillUnmount();
        expect(qrHiddenMockFunc).toBeCalled();
        expect(qrHiddenMockFunc.mock.calls.length).toEqual(1);
      });

      it('onBarCodeRead calls qrReceived action and set value in the state', () => {
        const value = false; // must be falsey otherwise it throws an error
        const mockFunc = jest.fn();
        const qrReceivedMockFunc = jest.fn();
        const history = { goBack: jest.fn() };
        const tree = renderer.create(
          <QrReader isLoggedIn translations={translations} qrVisible={mockFunc} history={history} qrReceived={qrReceivedMockFunc} />
        );

        const reader = tree.getInstance();
        expect(qrReceivedMockFunc).not.toBeCalled();
        reader.onBarCodeRead({ data: value });
        expect(qrReceivedMockFunc).toBeCalledWith(value);
        expect(qrReceivedMockFunc.mock.calls.length).toEqual(1);
        expect(reader.state).toEqual({ isTorchOn: false, value });
      });
    });

    describe('redux', () => {
      it('mapStateToProps', () => {
        const isLoggedIn = 'isLoggedIn-test';
        const fakeState = { auth: { isLoggedIn }, locale: { translations } };
        const props = mapStateToProps(fakeState);
        expect(props).toEqual({
          isLoggedIn,
          translations: {
            flash: translations.flash,
            back: translations.back,
            instructions: translations.qr_code_instructions,
          },
        });
      });

      it('mapDispatchToProps', () => {
        const data = 'data';
        const mockDispatch = jest.fn();
        const props = mapDispatchToProps(mockDispatch);
        expect(Object.keys(props)).toEqual(['qrVisible', 'qrHidden', 'qrReceived']);
        expect(typeof props.qrVisible).toEqual('function');
        expect(typeof props.qrHidden).toEqual('function');
        expect(typeof props.qrReceived).toEqual('function');
        props.qrVisible();

        expect(mockDispatch.mock.calls.length).toEqual(1);
        expect(mockDispatch).toBeCalledWith(qrVisible());
        props.qrHidden();

        expect(mockDispatch.mock.calls.length).toEqual(2);
        expect(mockDispatch).toBeCalledWith(qrHidden());
        props.qrReceived(data);

        expect(mockDispatch.mock.calls.length).toEqual(3);
        expect(mockDispatch).toBeCalledWith(qrReceived(data));
      });
    });
  } else {
    it('shouldn\'t work on web', () => {
      expect(true).toBe(true);
    });
  }
});
