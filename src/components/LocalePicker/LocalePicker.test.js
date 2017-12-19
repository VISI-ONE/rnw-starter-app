import { Platform } from 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { LocalePicker, mapStateToProps, mapDispatchToProps } from './LocalePicker';
import { setLocale as setLocaleAction } from '../../actions/locale';

const isWeb = Platform.OS === 'web';

const currentValue = 'en-US';

describe('LocalePicker component', () => {
  it('renders properly - ' + Platform.OS, () => {
    const mockFunc = jest.fn();
    const tree = renderer.create(
      <LocalePicker currentLocale={currentValue} setLocale={mockFunc} />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders proper structure', () => {
    const mockFunc = jest.fn();
    const tree = shallow(
      <LocalePicker currentLocale={currentValue} setLocale={mockFunc} />
    );
    if (isWeb) {
      expect(tree.html()).toEqual(
        '<select class="63"><option selected="" value="en-US">en</option><option value="de-DE">de</option></select>'
      );
    } else {
      expect(tree.text()).toEqual('<Button />');
    }
  });

  it('onLocaleChange changes the state and calls setLocale', () => {
    const mockFunc = jest.fn();
    const tree = renderer.create(
      <LocalePicker currentLocale={currentValue} setLocale={mockFunc} />
    ).root;

    const locale = 'de';
    const localePickerInstance = tree.findByType(LocalePicker)._fiber.stateNode;
    localePickerInstance.onLocaleChange(locale);
    const { state } = localePickerInstance;

    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc).toBeCalledWith(locale);
    expect(state).toEqual({ isOpen: false });
  });

  it('openPicker changes the state', () => {
    const mockFunc = jest.fn();
    const tree = renderer.create(
      <LocalePicker currentLocale={currentValue} setLocale={mockFunc} />
    ).root;

    const localePickerInstance = tree.findByType(LocalePicker)._fiber.stateNode;
    localePickerInstance.openPicker();
    const { state } = localePickerInstance;

    expect(state).toEqual({ isOpen: true });
  });

  describe('redux', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    it('mapStateToProps', () => {
      const currentLocale = 'test';
      const fakeState = { locale: { currentLocale } };
      const props = mapStateToProps(fakeState);
      expect(props).toEqual({ currentLocale });
    });

    it('mapDispatchToProps', () => {
      const currentLocale = 'test';
      const mockDispatch = jest.fn();
      const props = mapDispatchToProps(mockDispatch);
      expect(Object.keys(props)).toEqual(['setLocale']);
      expect(typeof props.setLocale).toEqual('function');
      props.setLocale(currentLocale);

      expect(mockDispatch.mock.calls.length).toEqual(1);
      expect(mockDispatch).toBeCalledWith(setLocaleAction(currentLocale));
    });
  });
});
