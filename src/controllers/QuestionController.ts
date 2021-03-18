import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import "dotenv/config";

import { Question } from '../models/Question';
import { Professeur } from '../models/Professeur';

export class QuestionController {

    //Create Question
    async createQuestion(req: Request, res: Response, next: NextFunction)
    {
        const body: Question = req.body;
        if(!body)
        {
            const error = "Le body est n'est pas complet.";
            res.status(400).send({ messages: error });
            return;
        }

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

        const newQuestion = Question.create({
            ...body,
            professeur
        });
        
        const errors = await validate(newQuestion);
        if(errors.length > 0)
        {
            res.status(400).send({ messages: errors });
            return;
        } 

        res.json(await newQuestion.save());
    }

    //Get d'une Question
    async getQuestion(req: Request, res: Response, next: NextFunction)
    {
        const idQuestion = req.params.id;
        if(!idQuestion) { return res.sendStatus(400); }

        const question = await Question.findOne(idQuestion, { relations: ["lesReponses"] });
        if(!question) { return res.sendStatus(400); }

        return res.json(question);
    }

    //Update Question
    async patchQuestion(req: Request, res: Response, next: NextFunction)
    {
        const questionId = req.params.id;
        if(!questionId)
        {
            res.sendStatus(400);
            return;
        }

        const question = await Question.findOne(questionId);
        if(!question)
        {
            res.sendStatus(400);
            return;
        }

        const body: Question = req.body;
        if(!body)
        {
            res.sendStatus(400);
            return;
        }
        
        const questionRepository = getRepository(Question);
        if(!questionRepository)
        {
            res.sendStatus(400);
            return;
        }

        await questionRepository.update(question.id, body);
        return res.json(await questionRepository.findOne(question.id));
    }

    //Delete Question
    async deleteQuestion(req: Request, res: Response, next: NextFunction)
    {
        const questionIdDelete = req.params.id;
        if(!questionIdDelete)
        {
            res.sendStatus(400);
            return;
        }

        const questionToDelete = await Question.findOne(questionIdDelete);
        if(!questionToDelete)
        {
            res.sendStatus(400);
            return;
        }

        const questionRepository = getRepository(Question);
        if(!questionRepository)
        {
            res.sendStatus(400);
            return;
        }

        questionRepository.delete(questionToDelete.id);
        return res.json({message: `La question avec l'id ${questionIdDelete} est supprimé.`});
    }
}