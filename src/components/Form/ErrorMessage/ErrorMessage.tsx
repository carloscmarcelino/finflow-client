import React, { ReactNode } from 'react';

type ErrorMessageProps = {
  children: ReactNode;
};

export const ErrorMessage = ({ children }: ErrorMessageProps) => (
  <span className="text-red-500 text-sm">{children}</span>
);
