// AuthScreen.test.tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AuthScreen from '../src/screens/AuthScreen';
import ReactNativeBiometrics from 'react-native-biometrics';
import { Alert } from 'react-native';
import { act } from '@testing-library/react-native';

// Mock ReactNativeBiometrics
jest.mock('react-native-biometrics', () => {
  return jest.fn().mockImplementation(() => ({
    simplePrompt: jest.fn().mockResolvedValue({ success: true }),
  }));
});

// Mock Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

// Mock TodosScreen
jest.mock('../src/screens/TodosScreen', () => {
  return () => {
    const { View } = require('react-native');
    return <View data-testid="todos-screen-mock" />;
  };
});

describe('AuthScreen', () => {
  let simplePromptMock: jest.Mock;

  beforeEach(() => {
    simplePromptMock = jest.fn().mockResolvedValue({ success: true });
    (ReactNativeBiometrics as jest.Mock).mockImplementation(() => ({
      simplePrompt: simplePromptMock,
    }));
    (Alert.alert as jest.Mock).mockClear();
  });

  it('renders loading indicator on initial render', async () => {
    const { getByTestId } = render(<AuthScreen />);
    await waitFor(() => expect(getByTestId('activityIndicator')).toBeTruthy());
  });

  it('attempts authentication on mount', async () => {
    render(<AuthScreen />);
    await waitFor(() => expect(simplePromptMock).toHaveBeenCalled());
  });

  it('navigates to TodosScreen on successful authentication', async () => {
    simplePromptMock.mockResolvedValue({ success: true });
    const { getByTestId } = render(<AuthScreen />);
    await waitFor(() => expect(getByTestId('todos-screen-mock')).toBeTruthy(), { timeout: 2000 });
  });

  it('shows alert on failed authentication', async () => {
    simplePromptMock.mockResolvedValue({ success: false });
    render(<AuthScreen />);
    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        'Authentication Failed',
        'Incorrect passcode. Try again.'
      )
    );
  });

  it('shows alert on authentication error', async () => {
    simplePromptMock.mockRejectedValue(new Error('Authentication error'));
    render(<AuthScreen />);
    await waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        'Error',
        'Authentication error occurred.'
      )
    );
  });

  it('renders authenticate button when not loading and not authenticated', async () => {
    simplePromptMock.mockResolvedValue({ success: false });
    const { getByText } = render(<AuthScreen />);
    await waitFor(() => expect(Alert.alert).toHaveBeenCalled());
    const button = getByText('Authenticate with Device Passcode');
    expect(button).toBeTruthy();
  });

  it('calls handleAuthentication when button is pressed', async () => {
    simplePromptMock.mockResolvedValue({ success: false });
    const { getByText } = render(<AuthScreen />);
    await waitFor(() => expect(Alert.alert).toHaveBeenCalled());
    simplePromptMock.mockClear();
    simplePromptMock.mockResolvedValue({ success: false });
    (ReactNativeBiometrics as jest.Mock).mockImplementation(() => ({
      simplePrompt: simplePromptMock,
    }));
    const button = getByText('Authenticate with Device Passcode');
    fireEvent.press(button);
    await waitFor(() => expect(simplePromptMock).toHaveBeenCalled());
  });
});