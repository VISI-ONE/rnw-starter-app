import { Platform, Picker as IOSPicker } from 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Picker from './Picker';
import NativePicker from './NativePicker';
import WebPicker from './WebPicker';

const isWeb = Platform.OS === 'web';

const currentValue = 'en-US';
const localeOptions = [
  {
    label: 'en',
    value: 'en-US',
  },
  {
    label: 'de',
    value: 'de-DE',
  },
];

describe('Picker component', () => {
  it('renders properly - ' + Platform.OS, () => {
    const mockFunc = jest.fn();
    const tree = renderer.create(
      <Picker currentValue={currentValue} options={localeOptions} onChange={mockFunc} style={2} />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders proper structure', () => {
    const mockFunc = jest.fn();
    const tree = shallow(
      <Picker currentValue={currentValue} options={localeOptions} onChange={mockFunc} style={2} />
    );
    if (isWeb) {
      expect(tree.html()).toEqual(
        '<select class="2"><option selected="" value="en-US">en</option><option value="de-DE">de</option></select>'
      );
    } else {
      expect(tree.find(NativePicker).text()).toEqual('<NativePicker />');
    }
  });

  it('trigger onChange callback', () => {
    const mockFunc = jest.fn();
    const tree = renderer.create(
      <Picker currentValue={currentValue} options={localeOptions} onChange={mockFunc} style={2} />
    ).root;

    const value = 'de';
    if (isWeb) {
      const event = { target: { value } };
      tree.findByType('select').props.onChange(event);
    } else {
      const event = 'de';
      tree.findByProps({ style: 2 }).props.onChange(event);
    }

    expect(mockFunc.mock.calls.length).toEqual(1);
    expect(mockFunc).toBeCalledWith(value);
  });

  it('passes the right props', () => {
    const mockFunc = jest.fn();
    const tree = renderer.create(
      <Picker currentValue={currentValue} options={localeOptions} onChange={mockFunc} style={2} />
    ).root;

    if (isWeb) {
      expect(tree.findByType(WebPicker).props.style).toEqual(2);
      expect(tree.findByType(WebPicker).props.currentValue).toEqual(currentValue);
      expect(tree.findByType(WebPicker).props.onChange).toEqual(mockFunc);
      expect(tree.findByType('select').props.className).toEqual(2);
      expect(tree.findByType('select').props.value).toEqual(currentValue);
      expect(tree.findByType('select').props.children[0].props).toEqual(localeOptions[0]);
      expect(tree.findByType('select').props.children[1].props).toEqual(localeOptions[1]);
    } else {
      expect(tree.findByType(NativePicker).props.style).toEqual(2);
      expect(tree.findByType(NativePicker).props.currentValue).toEqual(currentValue);
      expect(tree.findByType(NativePicker).props.onChange).toEqual(mockFunc);
      expect(tree.findByType(IOSPicker).props.style).toEqual(2);
      expect(tree.findByType(IOSPicker).props.selectedValue).toEqual(currentValue);
      expect(tree.findByType(IOSPicker).props.onValueChange).toEqual(mockFunc);
      expect(tree.findByType(IOSPicker).props.children[0].props).toEqual(localeOptions[0]);
      expect(tree.findByType(IOSPicker).props.children[1].props).toEqual(localeOptions[1]);
    }
  });
});
