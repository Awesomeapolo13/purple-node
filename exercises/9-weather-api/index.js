import express from 'express';
import {userRouter} from './src/routes/users/users.js';
import {isAuth} from './src/services/secure.service.js';
import {helpRouter} from "./src/routes/help/help.js";
import {cityRouter} from "./src/routes/city/city.js";
import {languageRouter} from "./src/routes/language/lang.js";
import {weatherRouter} from "./src/routes/weather/weather.js";

const port = 8000;
// Приложение
const app = express();

app.use(express.json());
app.use(express.urlencoded());

// Обработчик для авторизации.
app.use(async (req, res, next) => {
    // Авторизация
    if (! await isAuth(req)) {
        res.status(401).json({
            success: false,
            message: 'Осуществите вход для получения доступа к функционалу'
        });
    }

    next();
});

// Когда пользователь стучится на роут гланый префикс /users он попадает на обработку текущего роута на UserRouter.
app.use('/user', userRouter);
app.get('/help', helpRouter);
app.use('/city', cityRouter);
app.use('/lang', languageRouter);
app.use('/weather', weatherRouter);

// Слушатель приложения.
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

// Обработчик ошибок должен объявляться после всех объявлений use, иначе он просто не отработает.
app.use((err, req, res) => {
    if (err) {
        res.status(500).json({
            succes: false,
            message: err.message
        });
    }
});
