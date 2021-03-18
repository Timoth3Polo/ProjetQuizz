import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import "dotenv/config";

import { UserTypesEnum } from "../enums/UserTypesEnum";
import { Professeur } from '../models/Professeur';
import { Eleve } from "../models/Eleve";

export class ProfesseurController {

    //Create Professeur
    async createProfesseur(req: Request, res: Response, next: NextFunction)
    {
        const body: Professeur = req.body;
        if(!body)
        {
            const error = "Le body est n'est pas complet.";
            res.status(400).send({ messages: error });
            return;
        }

        const newProfesseur = Professeur.create(body);

        if(!newProfesseur)
        {
            const error = "Échec de la création de l'élève.";
            res.status(400).send({ messages: error });
            return;
        }

        const errors = await validate(newProfesseur);
        if(errors.length > 0)
        {
            res.status(400).send({ messages: errors });
            return;
        } 
        else 
        {
            const hashedPword = await hash(newProfesseur.password, 12);
            newProfesseur.password = hashedPword;
            res.json(await newProfesseur.save());
        }
    }

    //Prend l'info du Professeur courant
    async getProfesseurCourant(req: Request, res: Response, next: NextFunction)
    {
        const professeurId: string = req.userId;
        if(!professeurId)
        {
            const error = "L'id du professeur n'est pas présent dans le body.";
            res.status(400).send({ messages: error });
            return;
        }

        const me = await Professeur.findOne(professeurId, { relations: ["createCours", "createCours.eleveParticiperCours", "createGroupe", "createGroupe.eleveParticiperGroupe", "createQuizz", "createQuestion"] });
        if(!me)
        {
            const error = "L'id du professeur n'a pas été trouvé.";
            res.status(400).send({ messages: error });
            return;
        }

        return res.json(me);
    }

    //Update du Professeur courant
    async patchProfesseur(req: Request, res: Response, next: NextFunction)
    {
        const professeurId = req.userId;
        if(!professeurId)
        {
            res.sendStatus(400);
            return;
        }

        const body: Professeur = req.body;
        if(!body)
        {
            res.sendStatus(400);
            return;
        }

        const me = await Professeur.findOne(professeurId);
        if(!me)
        {
            res.sendStatus(400);
            return;
        }

        const professeurRepository = getRepository(Professeur);
        if(!professeurRepository)
        {
            res.sendStatus(400);
            return;
        }

        await professeurRepository.update(me.id, body);
        return res.json(await professeurRepository.findOne(me.id));
    }

    //Delete du Professeur courant
    async deleteProfesseur(req: Request, res: Response, next: NextFunction)
    {
        const professeurIdToDelete = req.userId;
        if(!professeurIdToDelete)
        {
            res.sendStatus(400);
            return;
        }

        const professeurToDelete = await Professeur.findOne(professeurIdToDelete);
        if(!professeurToDelete)
        {
            res.sendStatus(400);
            return;
        }

        const professeurRepository = getRepository(Professeur);
        if(!professeurRepository)
        {
            res.sendStatus(400);
            return;
        }

        professeurRepository.delete(professeurToDelete.id);
        return res.json({message: `Le professeur avec l'id ${professeurIdToDelete} est supprimé.`});
    }

    //LOGIN Professeur
    async loginProfesseur(req: Request, res: Response, next: NextFunction) 
    {
        const { mail, password } = req.body;
        if(!mail || !password)
        {
            res.sendStatus(400);
            return;
        }

        const professeur = await Professeur.findOne({where: {mail:mail}});
        if(!professeur)
        {
            res.sendStatus(400);
            return;
        }

        const pwordVerify = await compare(password, professeur.password);
        if(!pwordVerify)
        {
            res.sendStatus(400);
            return;
        }

        //Give it token
        const jwt = sign(
            { id: professeur.id, prenom: professeur.prenom, nom: professeur.nom, type: UserTypesEnum.PROFESSEUR },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d"}
        );
        if(!jwt)
        {
            res.sendStatus(400);
            return;
        }

        res.json({token: jwt});
    }
}