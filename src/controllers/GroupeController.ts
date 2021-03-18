import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import "dotenv/config";

import { Groupe } from '../models/Groupe';
import { Professeur } from '../models/Professeur';
import { group } from "console";

export class GroupeController {
    
    //Create Groupe
    async createGroupe(req: Request, res: Response, next: NextFunction) {
        const body: Groupe = req.body;
        if(!body) { return res.sendStatus(400); }

        const professeurId = req.userId;
        if(!professeurId)
        {
            const error = "Le body est n'est pas complet.";
            res.status(400).send({ messages: error });
            return;
        }

        const professeur = await Professeur.findOne(professeurId);
        if(!professeur) {
            res.sendStatus(400);
        }

        const newGroupe = Groupe.create({
            ...body,
            professeur
        });

        return res.json(await newGroupe.save());
    }

    //Get un Groupe
    async getGroupe(req: Request, res: Response, next: NextFunction) {
        const idGroupe : string = req.params.id;
        if(!idGroupe) { return res.sendStatus(400); }

        const groupe = await Groupe.findOne(idGroupe, { relations: ["participantQuizz", "eleveParticiperGroupe"]});
        if(!groupe) { return res.sendStatus(400); }

        return res.json(groupe);
    }

    //Update d'un Groupe
    async patchGroupe(req: Request, res: Response, next: NextFunction) {
        const idGroupe : string = req.params.id;
        if(!idGroupe) { return res.sendStatus(400); }

        const groupe = await Groupe.findOne(idGroupe);
        if(!groupe) { return res.sendStatus(400); }

        const body : Groupe = req.body;
        if(!body) {return res.sendStatus(400); }

        const groupeRepository = getRepository(Groupe);
        if(!groupeRepository)
        {
            res.sendStatus(400);
            return;
        }

        await groupeRepository.update(groupe.id, body);
        return res.json(await groupeRepository.findOne(groupe.id));
    }

    //Delete d'un Groupe
    async deleteGroupe(req: Request, res: Response, next: NextFunction) {
        const idGroupe : string = req.params.id;
        if(!idGroupe) { return res.sendStatus(400); }

        const groupe = await Groupe.findOne(idGroupe);
        if(!groupe) { return res.sendStatus(400); }

        const groupeRepository = getRepository(Groupe);
        if(!groupeRepository) { return res.sendStatus(400); }

        groupeRepository.delete(groupe.id);
        return res.json({ message : "Groupe bien supprimé."});
    }
}