import React from 'react';
import { View, Text, Platform } from 'react-native';
import { shallow } from 'enzyme';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import About, { styles } from './About';

describe('About page', () => {
  it('render properly - ' + Platform.OS, () => {
    const tree = renderer.create(<About />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render the proper structure', () => {
    const tree = shallow(<About />);
    expect(
      tree.contains(
        <View style={styles.container}>
          <Text>About Page</Text>
        </View>
      )
    ).toBe(true);
  });
});
