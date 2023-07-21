export const formatCurrency = (value: string | number): string | number => {
  const castedValue = Number(value);

  if (Number.isNaN(castedValue)) {
    return value;
  }

  return new Intl.NumberFormat('pl').format(castedValue);
};
