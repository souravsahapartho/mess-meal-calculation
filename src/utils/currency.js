export const CURRENCY_SYMBOL = '৳';

export const formatCurrency = (amount, includeSymbol = true, showPlusSign = false) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return includeSymbol ? `${CURRENCY_SYMBOL}0.00` : '0.00';
  }

  const isNegative = amount < -0.0049;
  const isPositive = amount > 0.0049;
  const absAmount = Math.abs(amount);
  
  const formatted = absAmount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  let prefix = '';
  if (showPlusSign && isPositive) {
    prefix = '+';
  } else if (isNegative) {
    prefix = '-';
  }

  const symbol = includeSymbol ? CURRENCY_SYMBOL : '';
  return `${prefix}${symbol}${formatted}`;
};

export const formatNumber = (num, decimals = 2) => {
  if (num === null || num === undefined || isNaN(num)) return '0';
  if (Number.isInteger(num)) {
    return num.toLocaleString('en-US');
  }
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
};

export const round2 = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};
