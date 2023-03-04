import Emitter from 'events';

const emitter = new Emitter();

emitter.on('error', (e) => {
    console.log(e.message);

    throw e;
});

const fromSeconds = (seconds) => seconds * 1000;
const fromMinutes = (minutes) => fromSeconds(minutes * 60);
const fromHours = (hours) => fromMinutes(hours * 60);


/**
 * Извлекает параметры из строки, переданной в таймер
 *
 * @param data - строка в формате "1h 4m 2s"
 * @returns {[number,number,number]}
 */
export default function resolveParams(data) {
    // Проверка входного типа параметра.
    if (typeof data !== 'string') {
        throw new TypeError('Ошибка ввода: Время таймера необходимо передать в формате строки.');
    }

    try {
        const [timeStr, hours, minutes, seconds] = data.match(/(\d+)?h\s+(\d+)?m\s+(\d+)?s/);

        return [
            fromHours(Number(hours)),
            fromMinutes(Number(minutes)),
            fromSeconds(Number(seconds)),
        ];
    } catch (e) {
        emitter.emit(
            'error',
            new Error('Ошибка ввода: Некорректный формат ввода таймера. Необходимо передать строку формата 1h 4m 2s.')
        );
    }
}
