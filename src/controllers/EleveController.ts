import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import "dotenv/config";

import { Eleve } from "../models/Eleve";
import { UserTypesEnum } from "../enums/UserTypesEnum";

export class EleveController {

    //Create Eleve
    async createEleve(req: Request, res: Response, next: NextFunction)
    {
        const body: Eleve = req.body;
        if(!body)
        {
            const error = "Le body est n'est pas complet.";
            res.status(400).send({ messages: error });
            return;
        }

        const newEleve = Eleve.create(body);
        const errors = await validate(newEleve);
        if(errors.length > 0)
        {
            res.status(400).send({ messages: errors });
            return;
        } 
        else 
        {
            const hashedPword = await hash(newEleve.password, 12);
            newEleve.password = hashedPword;
            res.json(await newEleve.save());
        }
    }

    //Prend l'info de l'Eleve courant
    async getEleveCourant(req: Request, res: Response, next: NextFunction)
    {
        const eleveId = req.userId
        if(!eleveId)
        {
            const error = "L'id de l'élève n'est pas présent dans le body.";
            res.status(400).send({ messages: error });
            return;
        }

        const me = await Eleve.findOne(eleveId, { relations: ["coursAvoirEleve", "groupeAvoirEleve"]});
        if(!me)
        {
            const error = "L'id de l'élève n'a pas été trouvé.";
            res.status(400).send({ messages: error });
            return;
        }

        return res.json(me);
    }

    //Update de l'Eleve courant
    async patchEleve(req: Request, res: Response, next: NextFunction)
    {
        const eleveId = (req as any).userId;
        if(!eleveId)
        {
            res.sendStatus(400);
            return;
        }

        const body: Eleve = req.body;
        if(!body)
        {
            res.sendStatus(400);
            return;
        }

        const me = await Eleve.findOne(eleveId);
        if(!me)
        {
            res.sendStatus(400);
            return;
        }

        const eleveRepository = getRepository(Eleve);
        if(!eleveRepository)
        {
            res.sendStatus(400);
            return;
        }

        await eleveRepository.update(me.id, body);
        return res.json(await eleveRepository.findOne(me.id));
    }

    //Delete de l'Eleve courant
    async deleteEleve(req: Request, res: Response, next: NextFunction)
    {
        const eleveIdToDelete = req.userId;
        if(!eleveIdToDelete)
        {
            res.sendStatus(400);
            return;
        }

        const eleveToDelete = await Eleve.findOne(eleveIdToDelete);
        if(!eleveToDelete)
        {
            res.sendStatus(400);
            return;
        }

        const eleveRepository = getRepository(Eleve);
        if(!eleveRepository)
        {
            res.sendStatus(400);
            return;
        }

        eleveRepository.delete(eleveToDelete.id);
        return res.json({message: `L'élève avec l'id ${eleveIdToDelete} est supprimé.`});
    }

    //LOGIN Eleve
    async loginEleve(req: Request, res: Response, next: NextFunction) 
    {
        const { mail, password } = req.body;
        if(!mail || !password)
        {
            res.sendStatus(400);
            return;
        }

        const eleve = await Eleve.findOne({where: {mail:mail}});
        if(!eleve)
        {
            res.sendStatus(400);
            return;
        }

        const pwordVerify = await compare(password, eleve.password);
        if(!pwordVerify)
        {
            res.sendStatus(400);
            return;
        }

        //Give it token
        const jwt = sign(
            { id: eleve.id, prenom: eleve.prenom, nom: eleve.nom, type: UserTypesEnum.ELEVE },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d"}
        );
       
        res.json({token: jwt});
    }
}