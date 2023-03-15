
const getArgs = (args) => {
    const res = {
        s: null,
        h: null,
        t: null,
        r: null
    };
    const [executor, file, ...rest] = args;

    rest.forEach((value, index, arr) => {
        if (
            value.charAt(0) === '-'
        ) {
            // Если это аргумент типа -opt, но он последний, то пишем его как true
            if (
                index === arr.length - 1
            ) {
                res[value.charAt(1)] = true;
                // Если это аргумент типа -opt, но значение после него определено,
                // и в результирующем объекте есть такой ключ.
            } else if (
                arr[index + 1].charAt(0) !== '-'
                && res[value.substring(1)] !== undefined
            ) {
                res[value.charAt(1)] = arr[index + 1];
            } else {
                res[value.charAt(1)] = false;
            }
        }
    });

    return res;
}

export {getArgs};
