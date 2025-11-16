export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US').format(date);
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
