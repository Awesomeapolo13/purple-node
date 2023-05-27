# API прогноза погоды на TS

API для получения информации о прогнозе погоды.

Для корректной работы приложения необходимо зарегистрироваться и
получить токен на сайте OpenWeather. Затем произвести настройки
города, токена, и языка. Так же можно установить несколько городов,
из которых Вам было бы интересно получать прогноз погоды.

Все установленные Вами данные сохраняются в файл
`weather.json` размещенный в домашней директорию.

Запросы curl для работы с API:

1) Справка по работе с API:

```shell
curl --location --request GET 'http://localhost:8000/help'
```

2) Установка токена:

```shell
curl --location --request POST 'http://localhost:8000/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "token": "your-token"
}'
```

3) Добавление города в список для получения прогноза:

```shell
curl --location --request POST 'http://localhost:8000/city/add' \
--header 'token: your-token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "city": "moscow"
}'
```

4) Удаление города из списка для получения прогноза:

```shell
curl --location --request POST 'http://localhost:8000/city/remove' \
--header 'token: token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "city": "moscow"
}'
```

5) Установка языковых настроек. По умолчанию ru (пока доступны только en и ru ключи)

```shell
curl --location --request POST 'http://localhost:8000/lang/set' \
--header 'token: token' \
--header 'Content-Type: application/json' \
--data-raw '{
    "lang": "en"
}'
```

6) Получение погоды в переданном городе

```shell
curl --location --request GET 'http://localhost:8000/weather?city=moscow' \
--header 'token: token'
```

7) Получение погоды из городов, сохраненных в параметрах

```shell
curl --location --request GET 'http://localhost:8000/weather/all' \
--header 'token: token'
```