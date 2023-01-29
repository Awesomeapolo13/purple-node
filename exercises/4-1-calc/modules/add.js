export default function add (num1, num2) {
    if (
        typeof num1 !== 'number'
        || typeof num2 !== 'number'
    ) {
        throw new Error('Invalid argument types for add.js module.');
    }
    return num1 + num2;
};