import Emmiter from 'events';

const emmiter = new Emmiter();

emmiter.on('error', (e) => {
    console.log(e.message);

    throw e;
});

/**
 * Извлекает параметры из строки, переданной в таймер
 *
 * @param data - строка в формате "1h 4m 2s"
 * @returns {[string,string,string]}
 */
const resolveParams = (data) => {
    // Проверка входного типа параметра.
    if (typeof data !== 'string') {
        throw new TypeError('Ошибка ввода: Время таймера необходимо передать в формате строки.');
    }

    try {
        let [timeStr, hours, minutes, seconds] = data.match(/(\d+)?h\s+(\d+)?m\s+(\d+)?s/);

        return [hours, minutes, seconds];
    } catch (e) {
        emmiter.emit(
            'error',
            new Error('Ошибка ввода: Некорректный формат ввода таймера. Необходимо передать строку формата 1h 4m 2s.')
        );
    }
}

let [hours, minutes, seconds] = resolveParams(process.argv[2]);

if (
    Number(minutes) > 60
    || Number(seconds) > 60
) {
    // throw new Error('Ошибка ввода: Число минут или секунд не может превышать 60.');
    emmiter.emit('error', new Error('Ошибка ввода: Число минут или секунд не может превышать 60.'));
}

setTimeout(
    () => console.log('Дзынь, дзынь! Таймер сработал!'),
    Number(hours) * 60 * 60 * 1000 + Number(minutes) * 60 * 1000 + Number(seconds) * 1000
);
