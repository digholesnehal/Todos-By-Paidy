import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodoElement from '../src/components/TodoElement'; // Adjust path if needed
import ImagePath from '../src/constants/ImagePath';

describe('TodoElement Component', () => {
  const mockEditTodo = jest.fn();
  const mockDeleteTodo = jest.fn();
  
  const todoProps = {
    title: 'Test Todo',
    id: '1',
    editTodo: mockEditTodo,
    deleteTodo: mockDeleteTodo,
  };

  it('renders correctly with given title', () => {
    const { getByText } = render(<TodoElement {...todoProps} />);
    expect(getByText('Test Todo')).toBeTruthy();
  });

  it('calls editTodo function when edit button is pressed', () => {
    const { getByTestId } = render(<TodoElement {...todoProps} />);
    const editButton = getByTestId('edit-button');

    fireEvent.press(editButton);
    expect(mockEditTodo).toHaveBeenCalledWith('Test Todo', '1');
  });

  it('calls deleteTodo function when delete button is pressed', () => {
    const { getByTestId } = render(<TodoElement {...todoProps} />);
    const deleteButton = getByTestId('delete-button');

    fireEvent.press(deleteButton);
    expect(mockDeleteTodo).toHaveBeenCalledWith('1');
  });

  it('renders edit and delete images', () => {
    const { getByTestId } = render(<TodoElement {...todoProps} />);
    
    const editIcon = getByTestId('edit-icon');
    const deleteIcon = getByTestId('delete-icon');

    expect(editIcon.props.source).toEqual(ImagePath.Edit);
    expect(deleteIcon.props.source).toEqual(ImagePath.Remove);
  });
});
