import express from 'express';
import { userRouter } from './src/routes/users/users.js';
import { isAuth } from './src/services/secure.service.js';

const port = 8000;
// Приложение
const app = express();

app.use(express.json());
app.use(express.urlencoded());

// Обработчик для авторизации.
app.use((req, res, next) => {
    // Проверка на аутентификацию
    if (!isAuth(req)) {
        res.status(401).json({
            success: false,
            message: 'Осуществите вход для получения доступа к функционалу'
        });
    }

    next();
});

// Когда пользователь стучится на роут гланый префикс /users он попадает на обработку текущего роута на UserRouter.
app.use('/user', userRouter);

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
