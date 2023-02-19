import { performance, PerformanceObserver } from 'perf_hooks';
import { Worker } from "worker_threads";
import splitToSmallerArrs from './modules/array-split.js';

const array = [...Array(300000).keys()];

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
    let onThreeDividedCount = 0;
    array.forEach((item) => {
        if (item % 3 === 0) {
            onThreeDividedCount++;
        }
    })
    performance.mark('endUsual');
    performance.measure('measure usual', 'startUsual', 'endUsual');

    return onThreeDividedCount;
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
    const usual = getUsualCountDividedOnThree(array);
    console.log(`Usual result: ${usual}`);
    performance.mark('startWorker');
    const threadedRes = (await Promise.all(
        splitToSmallerArrs(array,8)
            .map(item => getThreadedCountDividedOnThree(item))
    )).reduce((num1, num2) => num1 + num2, 0);
    performance.mark('endWorker');
    performance.measure('Measure worker threads', 'startWorker', 'endWorker');
    console.log(`Result with worker threads: ${threadedRes}`);
}

main(array);
