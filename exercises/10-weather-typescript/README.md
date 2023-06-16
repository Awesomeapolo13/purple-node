# API прогноза погоды на TS

API для получения информации о прогнозе погоды.

Для корректной работы приложения необходимо зарегистрироваться и
получить токен на сайте OpenWeather. Затем произвести настройки
города, токена, и языка. Так же можно установить несколько городов,
из которых Вам было бы интересно получать прогноз погоды.

Все установленные Вами данные сохраняются в файл
`weather-data.json` размещенный в домашней директорию.
Рекомендуется предварительно его создать.

Для установки языка достаточно передавать его в заголовке `'X-App-Lang'`.

Параметры для окружения содержаться в файле `.env.dist`.
Его нужно переименовать в `.env`.

Запросы curl для работы с API:

1) Справка по работе с API:

```shell
curl --location 'http://localhost:8000/help/' \
--header 'X-App-Lang: ru' \
--data ''
```

2) Установка токена:

```shell
curl --location 'http://localhost:8000/users/login' \
--header 'X-App-Lang: ru' \
--header 'Content-Type: application/json' \
--data '{
    "token": "your-token"
}'
```

3) Добавление города в список для получения прогноза:

```shell
curl --location 'http://localhost:8000/city/add' \
--header 'token: your-token' \
--header 'X-App-Lang: ru' \
--header 'Content-Type: application/json' \
--data '{
    "city": "moscow"
}'
```

4) Удаление города из списка для получения прогноза:

```shell
curl --location 'http://localhost:8000/city/remove' \
--header 'token: your-token' \
--header 'X-App-Token: ru' \
--header 'Content-Type: application/json' \
--data '{
    "city": "moscow"
}'
```

5) Установка языковых настроек. По умолчанию ru (пока доступны только en и ru ключи)

```shell
curl --location 'http://localhost:8000/lang/set' \
--header 'token: your-token' \
--header 'X-App-Lang: ru' \
--header 'Content-Type: application/json' \
--data '{
    "lang": "ru"
}'
```

6) Получение погоды в переданном городе

```shell
curl --location 'http://localhost:8000/weather?city=moscow' \
--header 'token: your-token' \
--header 'X-App-Lang: ru'
```

7) Получение погоды из городов, сохраненных в параметрах

```shell
curl --location 'http://localhost:8000/weather/all' \
--header 'token: your-token' \
--header 'X-App-Lang: ru'
```