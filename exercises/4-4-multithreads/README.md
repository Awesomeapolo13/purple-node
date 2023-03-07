# Проверка скорости работы кода на worker threads и классическим способом

1) Запустить командой
```shell
node multithreads.js
```
2) Результат вывода:
```shell
Usual result: 100000
measure usual: 3.5424990002065897
Result with worker threads: 100000
Measure worker threads: 90.18059100024402
```

3) Вывод: по каким-то причинам код построенный на worker threads отрабатывает медленнее.
