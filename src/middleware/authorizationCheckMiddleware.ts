import  { NextFunction, Request, Response } from "express";
import "dotenv/config";
import { verify } from "jsonwebtoken";
import { IToken } from '../types/IToken';
import { UserTypesEnum } from "../enums/UserTypesEnum";
import { parseAuthorizationHeader } from '../helpers/parseAuthorizationHeader';
import { Env } from '../Env';

export const authorizationCheckMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers["authorization"];
    if(!authorizationHeader)
    {
        res.sendStatus(400);
        return;
    }
    const token = parseAuthorizationHeader(authorizationHeader)

    try
    {
        const userInfo: IToken = verify(token, Env.JWT_SECRET) as IToken;
        const typeUser = userInfo.type;
        if(typeUser === UserTypesEnum.PROFESSEUR)
        {
            return next();
        }
        else
        {
            return res.sendStatus(400);
        }
    }
    catch(error)
    {
        return res.sendStatus(401);
    }
}