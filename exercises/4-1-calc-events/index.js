import Emmiter from 'events';

const [firstNum, secondNum, method] = [
    Number(process.argv[2]), // привожу к числу, поскольку аргументы всегда строки
    Number(process.argv[3]),
    process.argv[4],
];
const emmiter = new Emmiter();

// Обработка ошибок
emmiter.on('error', (err) => {
    console.log(err);
})

// Валидация входных параметров
if (
    typeof firstNum !== 'number'
    || typeof secondNum !== 'number'
    || typeof method !== 'string'
) {
    emmiter.emit('error', 'Invalid argument type! Check your arguments.');
}

// Выведение результата операции или ошибки.
emmiter.on('showRes', (expression) => console.log(expression))

// Сложение.
emmiter.on(
    'add',
    (num1, num2) => emmiter.emit('showRes', num1 + num2)
);

// Вычитание.
emmiter.on(
    'subtract',
    (num1, num2) => emmiter.emit('showRes', num1 - num2)
);

// Умножение.
emmiter.on(
    'multiply',
    (num1, num2) => emmiter.emit('showRes', num1 * num2)
);

// Деление.
emmiter.on(
    'divide',
    (num1, num2) => {
        if (num2 === 0) {
           emmiter.emit('error','Invalid argument type! You can not divine on 0.');
           return;
        }
        return emmiter.emit('showRes', num1 / num2);
    }
);

if (!emmiter.eventNames().find(item => item === method)) {
    emmiter.emit('error', 'Could not find such operation ' + method);
}

emmiter.emit(method, firstNum, secondNum);
