import express from 'express';
import type { Application } from 'express';
import { authenticationMiddleware } from './middlewares/auth.middleware';

export function createServerApplication(): Application {
    const app = express();
    app.use(express.json());
    app.use(authenticationMiddleware());
    app.get("/", (req, res) => {
        res.status(200).json("request get successfully");
    })
    return app;
}



