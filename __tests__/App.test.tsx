import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';
import TodosScreen from '../src/screens/TodosScreen';

jest.mock('../src/screens/TodosScreen', () => jest.fn(() => <></>));
jest.mock('../src/screens/AuthScreen', () => jest.fn(() => <></>));

describe('App Component', () => {
  it('renders TodosScreen by default', () => {
    render(<App />);
    expect(TodosScreen).toHaveBeenCalled();
  });

  // Uncomment below test if screen switching is implemented
  // it('renders AuthScreen when condition is met', () => {
  //   jest.mock('../src/screens/TodosScreen', () => jest.fn(() => <></>));
  //   render(<App />);
  //   expect(AuthScreen).toHaveBeenCalled();
  // });
});
