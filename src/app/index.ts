import express from 'express';
import type { Application } from 'express';
import { authenticationMiddleware } from './middlewares/auth.middleware';
import { authRouter } from './auth/auth.routes';

export function createServerApplication(): Application {
    const app = express();

    // middleware 
    app.use(express.json());
    app.use(authenticationMiddleware());

    // routes
    app.use("/user", authRouter);
    app.get("/api-health", (_, res) => {
        return res.status(200).json({ message : " Api Health is very good because it run in the morning " });
    })

    return app;
}



