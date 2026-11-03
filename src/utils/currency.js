export const CURRENCY_SYMBOL = '৳';

/**
 * Smart formatting for money values
 * Rounds to nearest integer (e.g. 10.6 -> 11, 10.4 -> 10, 864.98 -> 865)
 * @param {number} amount 
 * @param {boolean} includeSymbol 
 * @param {boolean} showPlusSign 
 * @param {string} customSymbol 
 * @returns {string}
 */
export const formatCurrency = (
  amount,
  includeSymbol = true,
  showPlusSign = false,
  customSymbol = CURRENCY_SYMBOL
) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return includeSymbol ? `${customSymbol}0` : '0';
  }

  // Smart integer rounding
  const rounded = Math.round(amount);
  const isNegative = rounded < 0;
  const isPositive = rounded > 0;
  const absAmount = Math.abs(rounded);

  const formatted = absAmount.toLocaleString('en-US');

  let prefix = '';
  if (showPlusSign && isPositive) {
    prefix = '+';
  } else if (isNegative) {
    prefix = '-';
  }

  const symbol = includeSymbol ? customSymbol : '';
  return `${prefix}${symbol}${formatted}`;
};

/**
 * Format meal rate with 2 decimal places precision
 * (e.g. 52.338 -> ৳52.34, 52.3 -> ৳52.30)
 */
export const formatRate = (rate, customSymbol = CURRENCY_SYMBOL) => {
  if (rate === null || rate === undefined || isNaN(rate)) return `${customSymbol}0.00`;
  const val = Number(rate);
  return `${customSymbol}${val.toFixed(2)}`;
};

/**
 * Format numbers (meal counts) - clean integer or decimal
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) return '0';
  const val = parseFloat(num);
  if (Number.isInteger(val)) {
    return val.toLocaleString('en-US');
  }
  return parseFloat(val.toFixed(1)).toLocaleString('en-US');
};

export const roundSmart = (num) => {
  return Math.round(num);
};

export const round2 = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};
