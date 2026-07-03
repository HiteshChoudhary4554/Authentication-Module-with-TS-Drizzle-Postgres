import type {Request, Response} from 'express';
import { signInPayloadModel, signUpPayloadModel } from './auth.model';
import { db } from '../../db/index.js';
import { userTable } from '../../db/schema.js';
import { eq } from 'drizzle-orm';
import { createHmac, randomBytes } from 'crypto';
import { createUserToken, verifyUserToken } from './utils/token';
import { decode } from 'jsonwebtoken';

class AuthenticationController {

    public async handleSignup(req : Request , res : Response){

        const validateResult = await signUpPayloadModel.safeParseAsync(req.body);
        if(validateResult.error) return res.status(400).json({message : "body vailidation is faileld", error : validateResult.error});

        const { firstName, lastName, email, password } = validateResult.data;

        const userEmailResult = await db.select().from(userTable).where(eq(userTable.email, email));
        // console like check what return

        if (userEmailResult.length > 0) res.status(400).json({ msg : `user with email ${email} already exists`, error : "duplicate Entry" });

        const salt = randomBytes(32).toString('hex');

        const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');
        const result = await db.insert(userTable).values({
            firstName,
            lastName,
            email,
            password : hashedPassword,
            salt
        });

        if (!result) return res.status(500).json({ message : "Internal server error" , error : "user object did'nt create" });

        return res.status(200).json({ message : "user create successfully", user : result });

    }

    public async handleSignin(req : Request, res : Response){
        const validateResult = await signInPayloadModel.safeParseAsync(req.body);

        if (validateResult.error) return res.status(400).json({ message : "body vailidation is failed " , error : validateResult.error});

        const { email, password } = validateResult.data;

        const [user] = await db.select().from(userTable).where(eq(userTable.email,email));

        if (!user) return res.status(400).json({ message : `Email ${email} does not exist in the DB` });

        const salt = user.salt!;

        const hashedPassword = createHmac("sha256",salt).update(password).digest('hex');

        if (hashedPassword !== user.password) return res.status(400).json({ message : "password and email is un creadential ", error : "Password and Email is wrong" });

        const token = await createUserToken({ id : user.id });

        return res.status(200).json({ message : " user login successfully", user, token });
        
    }

    public async getMe(req : Request, res : Response){
        const token : string = String(req.params.token);

        if (!token) return res.status(400).json({ message : "unauthorized user", error : "required token" });

        const decoded = await verifyUserToken(token);

        if (!decoded.payload.id) return res.status(400).json({ message : "Invaild token" , error : "invalid token"});

        const user = await db.select().from(userTable).where(eq(userTable.id, decoded.payload.id));

        if (!user) return res.status(400).json({ message : "invalid token", error : "user not found "});

        return res.status(200).json({ message : "loginging user ....", user });

    }
}


export const AuthenticationMethod = new AuthenticationController();