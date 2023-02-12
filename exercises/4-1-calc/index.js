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
    throw new Error('Ошибка ввода: Необходимо передать в качестве параметров два числа и строку с операцией.');
}

switch (method) {
    case 'add':
        console.log(add(firstNum, secondNum));
        break;
    case 'subtract':
        console.log(subtract(firstNum, secondNum));
        break;
    case 'multiply':
        console.log(multiply(firstNum, secondNum));
        break;
    case 'divide':
        if (secondNum === 0) {
            throw new Error('Ошибка ввода: Нельзя делить на 0');
        }
        console.log(divide(firstNum, secondNum));
        break;
    default:
        throw new Error('Ошибка ввода: Не существующая операция ' + method);
}
