import React from 'react';
import { View, Text, Platform } from 'react-native';
import { shallow } from 'enzyme';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import Contact, { styles } from './Contact';

describe('Contact page', () => {
  it('render properly - ' + Platform.OS, () => {
    const tree = renderer.create(<Contact />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render the proper structure', () => {
    const tree = shallow(<Contact />);
    expect(
      tree.contains(
        <View style={styles.container}>
          <Text>Contact Page</Text>
        </View>
      )
    ).toBe(true);
  });
});
