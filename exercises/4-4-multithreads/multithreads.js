import { performance, PerformanceObserver } from 'perf_hooks';
import { Worker } from 'worker_threads';
import { dividedOnThreeCount } from './modules/dividing.js';
import getResultForUsual from './modules/usual.js';
import getResultForThreads from './modules/threaded.js';

const arrLength = 300_000;
const array = [...Array(arrLength).keys()];

const performanceObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(`${entry.name}: ${entry.duration}`);
    });
});

performanceObserver.observe({entryTypes: ['measure']});

const getUsualCountDividedOnThree = (array) => {
    if (!Array.isArray(array)) {
        throw new TypeError('Ошибка типа аргумента: Функция getCountDividedOnThree ожидает массив');
    }
    performance.mark('startUsual');
    const res = dividedOnThreeCount(array)
    performance.mark('endUsual');
    performance.measure('measure usual', 'startUsual', 'endUsual');

    return res;
}

const getThreadedCountDividedOnThree = (array) => {
    return new Promise((resolve) => {
        const worker = new Worker('./modules/worker.js', {
            workerData: { data: array }
        });

        worker.on('message', (msg) => {
            resolve(msg);
        })
    });
}

const main = async () => {
    getResultForUsual(array, getUsualCountDividedOnThree);
    await getResultForThreads(array, getThreadedCountDividedOnThree)
}

main(array);
