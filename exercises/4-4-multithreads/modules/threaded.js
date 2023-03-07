import {performance} from "perf_hooks";
import splitToSmallerArrs from "./array-split.js";
import {cpus} from "os";

/**
 * Выполняет переданную функцию и выводит результат её работы в консоль.
 */
export default async function getResultForThreads(array, func) {
    // Сколько элементов в каждом массиве.
    const chanks =  splitToSmallerArrs(array, cpus.length);
    performance.mark('startWorker');
    const result = await Promise.all(
        chanks.map(func)
    );
    const threadedRes = result.reduce((num1, num2) => num1 + num2, 0);
    performance.mark('endWorker');
    performance.measure('Measure worker threads', 'startWorker', 'endWorker');
    console.log(`Result with worker threads: ${threadedRes}`);
}
