import Emitter from 'events';
import notifier from 'node-notifier';
import resolveParams from './custom-modules/params-resolver.js';

const emitter = new Emitter();
const [hours, minutes, seconds] = resolveParams(process.argv[2]);

setTimeout(
    () => notifier.notify(
        {
            title: 'Дзынь, дзынь!',
            message: 'Таймер сработал!'
        },
        (err) => {
            if (err) {
                emitter.emit(
                    'error',
                    new Error('Ошибка модуля оповещений. Попробуйте позднее')
                );
            }
        }
    ),
    hours + minutes + seconds
);
