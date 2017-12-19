import React from 'react';
import Routing from '../utils/routing';

const { Router } = Routing; // eslint-disable-line
const history = {
  location: '/',
  listen: jest.fn(),
  createHref: jest.fn(),
  replace: jest.fn(),
  push: jest.fn()
};

const TestRouter = ({ children }) => (
  <Router history={history}>{children}</Router>
);

export default TestRouter;
