export const formatCurrency = (n: Number) => {
  return '$' + Number(n).toFixed(1).toLocaleString() + '';
};
