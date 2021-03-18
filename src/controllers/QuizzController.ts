import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import "dotenv/config";

import { Quizz } from '../models/Quizz';
import { Professeur } from '../models/Professeur';

export class QuizzController {

    //Create Quizz
    async createQuizz(req: Request, res: Response, next: NextFunction)
    {
        const body: Quizz = req.body;
        if(!body)
        {
            res.status(400).send();
            return;
        }

        const professeurId = (req as any).userId;
        if(!professeurId)
        {
            res.status(400).send();
            return;
        }

        const professeur = await Professeur.findOne(professeurId);
        if(!professeur) {
            res.sendStatus(400);
        }

        const newQuizz = Quizz.create({
            ...body,
            professeur
        });
        if(!newQuizz)
        {
            res.status(400).send();
            return;
        }

        const errors = await validate(newQuizz);
        if(errors.length > 0)
        {
            res.status(400).send({ messages: errors });
            return;
        } 

        res.json(await newQuizz.save());
    }

    //Get d'un Quizz
    async getQuizz(req: Request, res: Response, next: NextFunction)
    {
        const idQuizz = req.params.id;
        if(!idQuizz) { return res.sendStatus(400); }

        const quizz = await Quizz.findOne(idQuizz);
        if(!quizz) { return res.sendStatus(400); }

        return res.json(quizz);
    }

    //Update Quizz
    async patchQuizz(req: Request, res: Response, next: NextFunction)
    {
        const quizzId = req.params.id;
        if(!quizzId)
        {
            res.sendStatus(400);
            return;
        }

        const quizz = await Quizz.findOne(quizzId);
        if(!quizz)
        {
            res.sendStatus(400);
            return;
        }

        const body: Quizz = req.body;
        if(!body)
        {
            res.sendStatus(400);
            return;
        }
        
        const quizzRepository = getRepository(Quizz);
        if(!quizzRepository)
        {
            res.sendStatus(400);
            return;
        }

        await quizzRepository.update(quizz.id, body);
        return res.json(await quizzRepository.findOne(quizz.id));
    }

    //Delete Question
    async deleteQuizz(req: Request, res: Response, next: NextFunction)
    {
        const quizzIdDelete = req.params.id;
        if(!quizzIdDelete)
        {
            res.sendStatus(400);
            return;
        }

        const quizzToDelete = await Quizz.findOne(quizzIdDelete);
        if(!quizzToDelete)
        {
            res.sendStatus(400);
            return;
        }

        const quizzRepository = getRepository(Quizz);
        if(!quizzRepository)
        {
            res.sendStatus(400);
            return;
        }

        quizzRepository.delete(quizzToDelete.id);
        return res.json({message: `Le quizz est supprimé.`});
    }

    //Add Question to Quizz
    async addQuestion(req: Request, res: Response, next: NextFunction) {

    }

    //Remove Question to Quizz
    async removeQuestion(req: Request, res: Response, next: NextFunction) {

    }
}