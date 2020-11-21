import * as React from 'react';
import { useState } from 'react';

interface InputProps {
  id: string
  label: string
  type?: string
}

const Input: React.FC<InputProps> = ({ id = '', label = '', type = 'text' }) => {
  const [value, handleChange] = useState<string>('');
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id}
        data-testid={id}
        label={label}
        onChange={({ target }) => {
          handleChange(target.value)
        }}
        value={value}
      />
    </div>
  )
}

export default Input;