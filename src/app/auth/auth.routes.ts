import express from 'express';
import type { Router } from 'express';
import { AuthenticationMethod } from './auth.controller'
import { restrictToAuthenticatedUser } from '../middlewares/auth.middleware';

export const authRouter:Router = express();

authRouter.post("/sign-up", AuthenticationMethod.handleSignup);
authRouter.post("/sign-in", AuthenticationMethod.handleSignin);
authRouter.get("/get-me", restrictToAuthenticatedUser(), AuthenticationMethod.getMe);


