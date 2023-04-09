import express, { Request, Response, NextFunction } from 'express';

const port = 8000;
const app = express();

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    
})

