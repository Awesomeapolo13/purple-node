/**
 * Делит массив на переданное количество частей.
 */
export default function splitToSmallerArrs(array, arrCount) {
    // Сколько элементов в каждом массиве.
    const chunkSize = array.length / arrCount;
    let result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
}