import { parentPort, workerData } from "worker_threads";
import { dividedOnThreeCount } from "./dividing.js";

parentPort.postMessage(dividedOnThreeCount(workerData.data));
