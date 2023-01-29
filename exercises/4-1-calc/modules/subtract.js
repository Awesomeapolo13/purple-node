export default function subtract (num1, num2) {
    if (
        typeof num1 !== 'number'
        || typeof num2 !== 'number'
    ) {
        throw new Error('Invalid argument types for subtract.js module.');
    }
    return num1 - num2;
};
