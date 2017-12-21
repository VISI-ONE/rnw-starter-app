import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import store from './utils/store/store';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import AccountLogin from './pages/AccountLogin';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import Menu from './components/Menu';
import Routing, { Router } from './utils/routing';
const { Route, Switch } = Routing;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <View style={styles.container}>
            <Menu />
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/About" component={About} />
              <PrivateRoute exact path="/Contact" component={Contact} />
              <Route exact path="/login" component={AccountLogin} />
              <Route component={NotFound} />
            </Switch>
          </View>
        </Router>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
