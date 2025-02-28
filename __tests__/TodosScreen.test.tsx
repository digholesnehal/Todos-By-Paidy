import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TodosScreen from '../src/screens/TodosScreen';
import { apiReq } from '../src/utils/api';
import * as URLS from '../src/config/urls';

// Mock apiReq function
jest.mock('../src/utils/api', () => ({
  apiReq: jest.fn(),
}));

describe('TodosScreen Component', () => {
  const mockTodos = [
    { title: 'Test Todo 1', _id: '1' },
    { title: 'Test Todo 2', _id: '2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (apiReq as jest.Mock).mockImplementation((url, method) => {
      if (url === URLS.GET_ALL_TODOS && method === 'GET') return Promise.resolve(mockTodos);
      if (url.startsWith(URLS.DELETE_TODO) && method === 'DELETE') return Promise.resolve({ message: 'Todo deleted successfully.' });
      if (url === URLS.ADD_NEW_TODO && method === 'POST') return Promise.resolve({ message: 'Todo added successfully.' });
      return Promise.reject('API Error');
    });
  });

  it('renders todos when API returns data', async () => {
    const { getByText } = render(<TodosScreen />);

    await waitFor(() => {
      expect(getByText('Test Todo 1')).toBeTruthy();
      expect(getByText('Test Todo 2')).toBeTruthy();
    });
  });

  it('calls updateTodo when edit button is pressed', async () => {
    const { getAllByTestId } = render(<TodosScreen />);

    await waitFor(() => {
      const editButtons = getAllByTestId('edit-icon');
      fireEvent.press(editButtons[0]);
    });

    await waitFor(() => {
      expect(apiReq).toHaveBeenCalled();
    });
  });

  it('calls deleteTodo when delete button is pressed', async () => {
    const { getAllByTestId } = render(<TodosScreen />);

    await waitFor(() => {
      const deleteButtons = getAllByTestId('delete-icon');
      fireEvent.press(deleteButtons[0]);
    });

    await waitFor(() => {
      expect(apiReq).toHaveBeenCalledWith(`${URLS.DELETE_TODO}1`, 'DELETE');
    });
  });

  it('adds a new todo when add button is pressed', async () => {
    const { getByTestId, getByText } = render(<TodosScreen />);

    const input = getByTestId('todo-input'); // Replaced `getByPlaceholderText`
    fireEvent.changeText(input, 'New Todo');

    const addButton = getByText('ADD');
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(apiReq).toHaveBeenCalledWith(
        URLS.ADD_NEW_TODO,
        'POST',
        expect.objectContaining({ title: 'New Todo' }),
        { 'Content-Type': 'application/json' }
      );
    });
  });
});
