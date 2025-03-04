import React, { createRef } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { TextInput, Alert } from 'react-native';
import TodoInput from '../src/components/TodoInput';
import { apiReq } from '../src/utils/api';
import * as URLS from '../src/config/urls';

// Mock the API request function
jest.mock('../src/utils/api', () => ({
  apiReq: jest.fn(),
}));

// Mock Alert to avoid real pop-ups during tests
jest.spyOn(Alert, 'alert').mockImplementation(() => {});

describe('TodoInput Component', () => {
  const mockFetchTodoList = jest.fn();
  const mockRef = createRef<TextInput>();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default values', () => {
    const { getByTestId, getByText } = render(
      <TodoInput refInput={mockRef} fetchTodoList={mockFetchTodoList} />
    );

    expect(getByTestId('todo-input')).toBeTruthy();
    expect(getByText('ADD')).toBeTruthy();
  });

  it('updates input text on change', () => {
    const { getByTestId } = render(
      <TodoInput refInput={mockRef} fetchTodoList={mockFetchTodoList} />
    );

    const inputField = getByTestId('todo-input');
    fireEvent.changeText(inputField, 'New Todo Item');

    expect(inputField.props.value).toBe('New Todo Item');
  });

  it('calls addNewTodo when add button is pressed', async () => {
    (apiReq as jest.Mock).mockResolvedValueOnce({ message: 'Todo added successfully.' });

    const { getByTestId, getByText } = render(
      <TodoInput refInput={mockRef} fetchTodoList={mockFetchTodoList} />
    );

    const inputField = getByTestId('todo-input');
    const addButton = getByText('ADD');

    fireEvent.changeText(inputField, 'New Todo');
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(apiReq).toHaveBeenCalledWith(
        URLS.ADD_NEW_TODO,
        'POST',
        expect.objectContaining({ title: 'New Todo' }),
        expect.objectContaining({ 'Content-Type': 'application/json' })
      );
      expect(mockFetchTodoList).toHaveBeenCalled();
    });
  });

  it('calls updateTodo when update button is pressed', async () => {
    (apiReq as jest.Mock).mockResolvedValueOnce({ message: 'Todo updated successfully.' });

    const { getByTestId, getByText } = render(
      <TodoInput refInput={mockRef} fetchTodoList={mockFetchTodoList} title="Existing Todo" id="123" />
    );

    const inputField = getByTestId('todo-input');
    const updateButton = getByText('Update');

    fireEvent.changeText(inputField, 'Updated Todo');
    fireEvent.press(updateButton);

    await waitFor(() => {
      expect(apiReq).toHaveBeenCalledWith(
        `${URLS.UPDATE_TODO}123`,
        'PUT',
        expect.objectContaining({ title: 'Updated Todo' }),
        expect.objectContaining({ 'Content-Type': 'application/json' })
      );
      expect(mockFetchTodoList).toHaveBeenCalled();
    });
  });

  it('shows an alert when the API call fails', async () => {
    (apiReq as jest.Mock).mockRejectedValueOnce('Something went wrong!');

    const { getByText } = render(
      <TodoInput refInput={mockRef} fetchTodoList={mockFetchTodoList} />
    );

    const addButton = getByText('ADD');
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Something went wrong!');
    });
  });
});