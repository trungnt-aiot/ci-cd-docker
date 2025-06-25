import express, { Application } from 'express';
import { connectRedis } from './config/redis';
import { router } from './routes';
import cors from 'cors';
import { connectMysql } from './config/mysql';
import { migrateDB } from './migrations/migrate';
import { globalErrorHandler, APIError } from './utils/error.handler.utils';
import { RESPONSE_STATUS_CODE } from './utils/enum.utils';

const app: Application = express();

connectRedis();
connectMysql();
migrateDB();

app.use(express.json());

app.use(
    cors({
        origin: `http://${process.env.HOST_IP}:${process.env.FRONTEND_PORT}`,
        methods: ['PATCH', 'GET', 'POST', 'DELETE'],
    })
);

app.use('/api', router);

app.all(/.*/, (req, res, next) => {
    next(new APIError(`Can't find ${req.originalUrl} on this server!`, RESPONSE_STATUS_CODE.NOT_FOUND));
});

app.use(globalErrorHandler);

export default app;
