import React from 'react';
import { screen, render, cleanup, fireEvent } from '@testing-library/react'
import Input from 'components/input/Input';

let input, inputID;

beforeAll(() => {
  const { getByTestId, getByLabelText } = render(<Input label='username' id='username' />)
  input = getByLabelText('username');
  inputID = getByTestId('username');
});

test('should have the default value', () => {
  expect(input.value).toBe('');
  fireEvent.change(input, { target: { value: 'ok' } });
});

test('should have the updated value', () => {
  expect(input.value).toBe('ok');
});

test('should have an element with this id', () => {
  expect(inputID).not.toBeNull();
});

afterAll(cleanup);