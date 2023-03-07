/**
 * Вернет количество элементов массива, которые делятся на 3.
 */
export const dividedOnThreeCount =  (arr) => {
    let onThreeDividedCount = 0
    arr.forEach((item) => {
        const types = [
            String,
            Number,
            Boolean
        ];
        const randomTypeId = Math.floor(Math.random() * ((types.length - 1) + 1));
        item = types[randomTypeId](item);
        if (item % 3 === 0) {
            onThreeDividedCount++;
        }
    });

    return onThreeDividedCount;
}
