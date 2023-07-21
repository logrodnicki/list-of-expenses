export const titleValidator = (value: string): string | null => {
  if (value.length < 5) {
    return 'Title should have at least 5 characters';
  }

  return null;
};

export const amountValidator = (value: number): string | null => {
  if (Number.isNaN(value)) {
    return 'Invalid amount format';
  }

  if (!value) {
    return "Amount can't be empty";
  }

  if (Number.isInteger(value)) {
    return null;
  }

  if (String(value).split('.')[1].length > 3) {
    return 'Amount has too many decimals';
  }

  return null;
};
