import React from 'react';
import { View, Text, Platform } from 'react-native';
import { shallow } from 'enzyme';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import NotFound, { styles } from './NotFound';

describe('NotFound page', () => {
  it('render properly - ' + Platform.OS, () => {
    const tree = renderer.create(<NotFound />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('render the proper structure', () => {
    const tree = shallow(<NotFound />);
    expect(
      tree.contains(
        <View style={styles.container}>
          <Text>404 Page Not Found</Text>
        </View>
      )
    ).toBe(true);
  });
});
