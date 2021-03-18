import  { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { parseAuthorizationHeader } from '../helpers/parseAuthorizationHeader';
import { Env } from '../Env';
import { IToken } from '../types/IToken';

export const authCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    if(!authHeader)
    {
        res.sendStatus(401);
        return;
    }
    const token = parseAuthorizationHeader(authHeader)

    try
    {
        const userInfo: IToken = verify(token, Env.JWT_SECRET) as IToken;
        req.userId = userInfo.id;
    }
    catch(error)
    {
        return res.sendStatus(401);
    }

    return next();
}