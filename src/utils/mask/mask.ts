import { ChangeEvent } from 'react';

import { centsToNumber } from './centsToNumber';
import { toBRL } from './toBRL';

export type MaskType = 'letters' | 'numbers' | 'both';

export type MaskFormatterOptions = {
  event: ChangeEvent<HTMLInputElement>;
  maskType?: MaskType;
  intlOptions?: Intl.NumberFormatOptions;
};

export type MaskFormatter = (value: string, options: MaskFormatterOptions) => string;

const applyMask = (
  value: string | number,
  mask: string,
  maskType: MaskType = 'numbers',
): string => {
  if (!value) return '';

  let regex;

  switch (maskType) {
    case 'letters':
      regex = /[^a-zA-Z]+/g;
      break;
    case 'numbers':
      regex = /\D+/g;
      break;
    case 'both':
    default:
      regex = /[^a-zA-Z0-9]+/g;
      break;
  }

  let formattedValue = '';
  const unmaskedValue = String(value).replace(regex, '');
  let position = 0;

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '*' && unmaskedValue[position] !== undefined) {
      formattedValue += unmaskedValue[position++];
    } else if (unmaskedValue[position] !== undefined) {
      formattedValue += mask[i];
    }
  }

  return formattedValue;
};

const formatBRL: MaskFormatter = (value, { intlOptions }) => {
  const valueInCents = parseFloat(value.replace('.', '').replace(',', '').replace(/\D/g, ''));

  if (isNaN(valueInCents)) {
    return '';
  }

  const formattedValue = toBRL(centsToNumber(valueInCents), intlOptions);

  return formattedValue;
};

const formatYield: MaskFormatter = (value, { maskType = 'numbers' }) =>
  applyMask(value, '**.**', maskType);

const formatRate: MaskFormatter = (value, { maskType = 'numbers' }) => {
  const formattedValue = applyMask(value, '**%', maskType);
  return formattedValue.endsWith('%') ? formattedValue : formattedValue + '%';
};

const formatPeriod: MaskFormatter = (value, { maskType = 'numbers' }) => {
  const formattedValue = applyMask(value, '**', maskType);
  return formattedValue.endsWith('m') ? formattedValue : formattedValue + 'm';
};

export const Mask = {
  brl: formatBRL,
  yield: formatYield,
  rate: formatRate,
  period: formatPeriod,
};
