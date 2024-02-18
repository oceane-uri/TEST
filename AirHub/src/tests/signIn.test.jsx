// SignIn.test.jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SignIn } from '../pages/Sign-in';

describe('SignIn component', () => {
  it('renders email and password inputs', () => {
    const { getByPlaceholderText } = render(<SignIn />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('updates email and password inputs when typing', () => {
    const { getByPlaceholderText } = render(<SignIn />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('submits the form with the correct values', () => {
    const mockSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(<SignIn onSubmit={mockSubmit} />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const submitButton = getByText('Sign In');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });
});
