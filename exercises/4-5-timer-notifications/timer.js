import Emmiter from 'events';
import notifier from 'node-notifier';
import resolveParams from './custom-modules/params-resolver.js';

const emmiter = new Emmiter();

let [hours, minutes, seconds] = resolveParams(process.argv[2]);

setTimeout(
    () => notifier.notify(
        {
            title: 'Дзынь, дзынь!',
            message: 'Таймер сработал!'
        },
        function (err) {
            if (err) {
                emmiter.emit(
                    'error',
                    new Error('Ошибка модуля оповещений. Попробуйте позднее')
                );
            }
        }
    ),
    Number(hours) * 60 * 60 * 1000 + Number(minutes) * 60 * 1000 + Number(seconds) * 1000
);
