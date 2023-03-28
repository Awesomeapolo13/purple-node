import express from 'express';
import { handleHelp } from '../../handlers/help.handler.js';

const helpRouter = express.Router();

helpRouter.get('/help', async (req, res) => {
    try {
        res.status(200).json(await handleHelp())
    } catch (err) {
        console.log(err.message);
        res.status(400).json({
            success: false,
            message: 'Что-то пошло не так, попробуйте позднее...',
        });
    }
});

export { helpRouter };
