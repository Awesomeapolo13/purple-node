import { parentPort, workerData } from "worker_threads";

const getCountDividedOnThree = (arr) => {
    let onThreeDividedCount = 0
    arr.data.forEach((item) => {
        if (item % 3 === 0) {
            onThreeDividedCount++;
        }
    });

    return onThreeDividedCount;
}

parentPort.postMessage(getCountDividedOnThree(workerData));
