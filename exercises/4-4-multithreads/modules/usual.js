/**
 * Выполняет переданную функцию и выводит результат её работы в консоль.
 */
export default function getResultForUsual(array, func) {
    // Сколько элементов в каждом массиве.
    const usual = func(array);
    console.log(`Usual result: ${usual}`);
}
