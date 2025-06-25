import { Request, Response, NextFunction } from 'express';
import { RESPONSE_STATUS_CODE } from './enum.utils';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function globalErrorHandler(err: APIError, req: Request, res: Response, next: NextFunction) {
    err.status = err.status || 'error';
    err.statusCode = err.statusCode || RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR;

    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });

        return;
    }

    res.status(RESPONSE_STATUS_CODE.INTERNAL_SERVER_ERROR).json({
        status: 'Error',
        message: 'Something went wrong!',
    });
}

export class APIError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'Fail' : 'Error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
