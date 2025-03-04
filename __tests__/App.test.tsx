import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';
import AuthScreen from '../src/screens/AuthScreen';

jest.mock('../src/screens/AuthScreen', () => jest.fn(() => <></>));

describe('App Component', () => {
  it('renders AuthScreen by default', () => {
    render(<App />);
    expect(AuthScreen).toHaveBeenCalled();
  });
});
