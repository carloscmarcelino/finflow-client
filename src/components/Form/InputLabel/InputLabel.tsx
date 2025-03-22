import React, { LabelHTMLAttributes, ReactNode } from 'react';

type InputLabelProps = {
  children: ReactNode;
} & LabelHTMLAttributes<HTMLLabelElement>;

export const InputLabel = ({ children, ...props }: InputLabelProps) => (
  <label className="text-subtitle text-gray" {...props}>
    {children}
  </label>
);
