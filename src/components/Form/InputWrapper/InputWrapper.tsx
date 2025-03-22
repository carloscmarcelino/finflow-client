import React, { ReactNode } from 'react';

import { ErrorMessage } from '../ErrorMessage';
import { InputLabel } from '../InputLabel';

export type InputWrapperProps = {
  label: string;
  children: ReactNode;
  error?: string;
};

export const InputWrapper = ({ label, children, error }: InputWrapperProps) => (
  <div className="flex flex-col">
    <div className="flex flex-col">
      <InputLabel htmlFor={label}>{label}</InputLabel>
      {children}
    </div>
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </div>
);
