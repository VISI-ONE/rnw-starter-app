import React from 'react';
import { Platform, Text, TouchableHighlight } from 'react-native';
import { shallow } from 'enzyme';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Button from './Button';

const text = 'test button';

describe('Button component', () => {
  it('renders properly - ' + Platform.OS, () => {
    const mockFunc = jest.fn();
    const tree = renderer.create(
      <Button text={text} onClick={mockFunc} style={2} textStyle={3} />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  describe('functionality', () => {
    it('receives props', () => {
      const mockFunc = jest.fn();
      const tree = shallow(
        <Button text={text} onClick={mockFunc} style={2} textStyle={3} />
      );
      expect(
        tree.contains(
          <TouchableHighlight onPress={mockFunc} style={2} >
            <Text style={3}>{text}</Text>
          </TouchableHighlight>
        )
      ).toBe(true);
    });

    it('trigger onClick callback', () => {
      const mockFunc = jest.fn();
      const tree = shallow(
        <Button text={text} onClick={mockFunc} style={2} textStyle={3} />
      );
      const btn = tree.find(TouchableHighlight);
      btn.simulate('press');
      expect(mockFunc.mock.calls.length).toEqual(1);
      expect(mockFunc).toBeCalled();
    });
  });
});
