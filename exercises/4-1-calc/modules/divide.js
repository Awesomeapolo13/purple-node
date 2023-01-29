export default function subtract (num1, num2) {
    if (
        typeof num1 !== 'number'
        || typeof num2 !== 'number'
        || num2 === 0
    ) {
        throw new Error('Invalid argument types for divide.js module.');
    }
    return num1 / num2;
};
