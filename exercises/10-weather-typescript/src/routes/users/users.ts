import express, { Router } from 'express';
import { handleLogin } from '../../handlers/user.handler';

const userRouter: Router = express.Router();

/**
 * Обработка сохранения токена (аутентификации)
 */
userRouter.post('/login', async (req, res) => {
	try {
		res.status(200).json(await handleLogin(req.body));
	} catch (err: any) {
		console.log(err.message);
		res.status(400).json({
			success: false,
			message: 'Ошибка аутентификации попробуйте позднее',
		});
	}
});

export { userRouter };
