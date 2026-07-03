import JWT from 'jsonwebtoken';

interface userTokenPayload {
    id : string
}

interface userPayloadToken {
    payload : {
        id : string
    },
    iat : number,
    exp : number
}

export async function createUserToken(payload : userTokenPayload){
    return JWT.sign({payload}, process.env.TOKEN_SECRET!, { expiresIn : "12m" });
}

export async function verifyUserToken(token : string){
    try {
        return JWT.verify(token,process.env.TOKEN_SECRET!) as userPayloadToken;
    } catch (error) {
        throw error;
    }
}