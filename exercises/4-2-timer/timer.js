try {
    let [timeStr, hours, minutes, seconds] = process.argv[2].match(/(\d+)?h\s+(\d+)?m\s+(\d+)?s/);

    if (
        Number(minutes) > 60
        || Number(seconds) > 60
    ) {
        throw new Error('Ошибка ввода: Число минут или секунд не может превышать 60.');
    }
    console.log('BeforeSUM:', Number(hours), Number(minutes), Number(seconds));
    console.log('SUM:', Number(hours) * 60 * 60 * 1000 + Number(minutes) * 60 * 1000 + Number(seconds) * 1000);

    setTimeout(
        () => console.log('Дзынь, дзынь! Таймер сработал!'),
        Number(hours) * 60 * 60 * 1000 + Number(minutes) * 60 * 1000 + Number(seconds) * 1000
    );

} catch (e) {
    (e instanceof TypeError)
        ?
        console.log('Некорректный формат ввода таймера. Необходимо передать строку формата 1h 4m 2s.')
        :
        console.log(e.message);
}
