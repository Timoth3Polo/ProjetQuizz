import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import "dotenv/config";

import { Question } from '../models/Question';
import { Reponse } from '../models/Reponse';

export class ReponseController {
    
    //Create Réponse à une Question
    async createReponse(req: Request, res: Response, next: NextFunction) {
        const idQuestion : string = req.params.id;
        if(!idQuestion) { return res.sendStatus(400); }

        const question = await Question.findOne(idQuestion);
        if(!question) { return res.sendStatus(400); }

        const body : Reponse = req.body;
        if(!body) { return res.sendStatus(400); }

        const newReponse = Reponse.create({
            ...body,
            question
        })

        const errors = await validate(newReponse);
        if(errors.length > 0)
        { return res.sendStatus(400); }

        return res.json(await newReponse.save());
    }

    //Get d'une Reponse
    async getReponse(req: Request, res: Response, next: NextFunction) {
        const idReponse : string = req.params.id;
        if(!idReponse) { return res.sendStatus(400); }

        const reponse = await Reponse.findOne(idReponse);
        if(!reponse) { return res.sendStatus(400); }

        return res.json(reponse);
    }

    //Update d'une Reponse
    async patchReponse(req: Request, res: Response, next: NextFunction) {
        const idReponse : string = req.params.id;
        if(!idReponse) { return res.sendStatus(400); }

        const reponse = await Reponse.findOne(idReponse);
        if(!reponse) { return res.sendStatus(400); }

        const body : Reponse = req.body;
        if(!body) { return res.sendStatus(400); }

        const reponseRepository = getRepository(Reponse);
        if(!reponseRepository) { return res.sendStatus(400); }

        await reponseRepository.update(reponse.id, body);
        return res.json(await reponseRepository.findOne(reponse.id));
    }

    //Delete d'une Reponse
    async deleteReponse(req: Request, res: Response, next: NextFunction) {
        const idReponse : string = req.params.id;
        if(!idReponse) { return res.sendStatus(400); }

        const reponse = await Reponse.findOne(idReponse);
        if(!reponse) { return res.sendStatus(400); }

        const reponseRepository = getRepository(Reponse);
        if(!reponseRepository) { return res.sendStatus(400); }

        reponseRepository.delete(reponse);

        return res.json({message : "La réponse a bien été supprimée."})
    }
}