export const formatCurrency = (amount: number, currency = 'MYR') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount)