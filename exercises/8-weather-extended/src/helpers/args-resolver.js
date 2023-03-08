
const getArgs = (args) => {
    const res = {
        s: null,
        h: null,
    };
    const [executor, file, ...rest] = args;

    rest.forEach((value, index, arr) => {
        if (
            value.charAt(0) === '-'
        ) {
            if (
                index === arr.length - 1
            ) {
                res[value.charAt(1)] = true;
            } else if (
                arr[index + 1].charAt(0) !== '-'
                && res[value.substring(1)] === null
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
