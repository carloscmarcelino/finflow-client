export const brlToNumber = (value: string | number): number => {
  if (!value) return 0;

  if (typeof value === 'number') return value;

  return Number(value.replace('R$', '').replaceAll('.', '').replace(',', '.').trim());
};
