import add from './modules/add.js';
import subtract from './modules/subtract.js'
import multiply from './modules/multiply.js';
import divide from './modules/divide.js';

// Где должна быть проверка (валидация), внутри каждого модуля или же в index.js?
const [firstNum, secondNum, method] = [
    Number(process.argv[2]),
    Number(process.argv[3]),
    process.argv[4],
];

if (
    typeof firstNum !== 'number'
    || typeof secondNum !== 'number'
    || typeof method !== 'string'
) {
    throw new Error('Invalid argument type! Check your arguments.');
}

switch (true) {
    case method === 'add':
        console.log(add(firstNum, secondNum));
        break;
    case method === 'subtract':
        console.log(subtract(firstNum, secondNum));
        break;
    case method === 'multiply':
        console.log(multiply(firstNum, secondNum));
        break;
    case method === 'divide':
        console.log(divide(firstNum, secondNum));
        break;
    default:
        throw new Error('Could not find such operation ' + method);
}
