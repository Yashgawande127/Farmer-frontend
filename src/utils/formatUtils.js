// Currency formatting utilities
export const formatCurrency = (amount, currency = 'INR') => {
    if (amount === null || amount === undefined) return '';

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
};

export const formatNumber = (number) => {
    if (number === null || number === undefined) return '';

    return new Intl.NumberFormat('en-IN').format(number);
};

export const formatWeight = (weight, unit = 'kg') => {
    if (weight === null || weight === undefined) return '';

    return `${formatNumber(weight)} ${unit}`;
};

export const formatArea = (area, unit = 'acres') => {
    if (area === null || area === undefined) return '';

    return `${formatNumber(area)} ${unit}`;
};

// Parse currency string to number
export const parseCurrency = (currencyString) => {
    if (!currencyString) return 0;

    // Remove currency symbol and commas, then parse
    return parseFloat(currencyString.replace(/[₹,\s]/g, '')) || 0;
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
    if (!total || total === 0) return 0;
    return Math.round((value / total) * 100);
};

// Format percentage
export const formatPercentage = (percentage) => {
    return `${percentage}%`;
};