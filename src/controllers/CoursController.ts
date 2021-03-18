import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import "dotenv/config";

import { Cours } from '../models/Cours';
import { Professeur } from '../models/Professeur';
import { Eleve } from "../models/Eleve";
import { coursInput } from "@/types/inputTypes";

export class CoursController {
    
    //Create Cours
    async createCours(req: Request, res: Response, next: NextFunction) {
        const body: Cours = req.body;
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

        const newCours = Cours.create({
            ...body,
            professeur
        });

        return res.json(await newCours.save());
    }

    //Get un Cours
    async getCours(req: Request, res: Response, next: NextFunction) {
        const idCours : string = req.params.id;
        if(!idCours) { return res.sendStatus(400); }

        const cours = await Cours.findOne(idCours, { relations: ["participantQuizz", "eleveParticiperCours"]});
        if(!cours) { return res.sendStatus(400); }

        return res.json(cours);
    }

    //Update d'un Cours
    async patchCours(req: Request, res: Response, next: NextFunction) {
        const idCours : string = req.params.id;
        if(!idCours) { return res.sendStatus(400); }

        const cours = await Cours.findOne(idCours);
        if(!cours) { return res.sendStatus(400); }

        const body : Cours = req.body;
        if(!body) {return res.sendStatus(400); }

        const coursRepository = getRepository(Cours);
        if(!coursRepository)
        {
            res.sendStatus(400);
            return;
        }

        await coursRepository.update(cours.id, body);
        return res.json(await coursRepository.findOne(cours.id));
    }

    //Delete d'un Cours
    async deleteCours(req: Request, res: Response, next: NextFunction) {
        const idCours : string = req.params.id;
        if(!idCours) { return res.sendStatus(400); }

        const cours = await Cours.findOne(idCours);
        if(!cours) { return res.sendStatus(400); }

        const coursRepository = getRepository(Cours);
        if(!coursRepository) { return res.sendStatus(400); }

        coursRepository.delete(cours.id);
        return res.json({ message : "Cours bien supprimé."});
    }

    //updateEleveToCours
    async updateEleve(req: Request, res: Response, next: NextFunction) {
        const idCours: string = req.params.id;
        if(!idCours) { return res.sendStatus(400); }

        const cours = await Cours.findOne(idCours);
        if(!cours) { return res.sendStatus(400); }

        const body: coursInput = req.body;
        if(!body) { return res.sendStatus(400); }

        const eleveRepository = getRepository(Eleve);
        const eleves = await Eleve.findByIds(body?.elevesParticiperCours || []);

        return res.json(await eleveRepository.save({ 
            ...cours,
            ...body,
            eleves
         }));
    }
}