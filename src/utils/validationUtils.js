// Form validation utilities
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePhone = (phone) => {
    // Indian phone number validation
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s+/g, ''));
};

export const validatePassword = (password) => {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

export const validateRequired = (value) => {
    return value && value.toString().trim().length > 0;
};

export const validateNumber = (value, min = null, max = null) => {
    const num = parseFloat(value);
    if (isNaN(num)) return false;
    if (min !== null && num < min) return false;
    if (max !== null && num > max) return false;
    return true;
};

export const validatePositiveNumber = (value) => {
    return validateNumber(value, 0.01);
};

export const validateDate = (date) => {
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj);
};

export const validateFutureDate = (date) => {
    if (!validateDate(date)) return false;
    return new Date(date) > new Date();
};

// Form validation helper
export const validateForm = (formData, rules) => {
    const errors = {};

    Object.keys(rules).forEach(field => {
        const value = formData[field];
        const fieldRules = rules[field];

        if (fieldRules.required && !validateRequired(value)) {
            errors[field] = `${field} is required`;
            return;
        }

        if (value && fieldRules.email && !validateEmail(value)) {
            errors[field] = 'Please enter a valid email address';
            return;
        }

        if (value && fieldRules.phone && !validatePhone(value)) {
            errors[field] = 'Please enter a valid phone number';
            return;
        }

        if (value && fieldRules.password && !validatePassword(value)) {
            errors[field] = 'Password must be at least 8 characters with uppercase, lowercase, and number';
            return;
        }

        if (value && fieldRules.number && !validateNumber(value, fieldRules.min, fieldRules.max)) {
            errors[field] = `Please enter a valid number${fieldRules.min ? ` (min: ${fieldRules.min})` : ''}${fieldRules.max ? ` (max: ${fieldRules.max})` : ''}`;
            return;
        }

        if (value && fieldRules.positiveNumber && !validatePositiveNumber(value)) {
            errors[field] = 'Please enter a positive number';
            return;
        }

        if (value && fieldRules.date && !validateDate(value)) {
            errors[field] = 'Please enter a valid date';
            return;
        }

        if (value && fieldRules.futureDate && !validateFutureDate(value)) {
            errors[field] = 'Please enter a future date';
            return;
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};