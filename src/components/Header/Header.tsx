'use client';

import { motion } from 'framer-motion';
import React from 'react';

import { HeaderWeb } from './HeaderWeb';
import { HeaderMobile } from './HeaderMobile';

export type HeaderOptions = { label: string; href: string };

const options = [
  {
    label: 'Conta',
    href: '',
  },
];

export const Header = () => {
  return (
    <>
      <HeaderWeb options={options} />
      <HeaderMobile options={options} />
    </>
  );
};
