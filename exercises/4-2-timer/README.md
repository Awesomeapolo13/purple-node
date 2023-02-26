# Таймер

Для работы с приложением таймера выполнить следующую команду;

```shell
node timer.js '0h 0m 2s'
```

Аргумент `0h 0m 2s` - строка, состоящая из часов, минут и секунд соответственно.

Ошибки:
1) При передаче строки некорректного формата, например `0m 2s` - `Ошибка ввода: Некорректный формат ввода таймера. Необходимо передать строку формата 1h 4m 2s.`