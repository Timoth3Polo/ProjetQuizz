import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import "dotenv/config";

import { ParticipantQuizz } from "../models/ParticipantQuizz";
import { Cours } from "../models/Cours";
import { Groupe } from "../models/Groupe";
import { participantQuizzInput } from "@/types/inputTypes";

export class ParticipantQuizzControler {

    //Create ParticipantQuizz
    async createParticipantQuizz(req: Request, res: Response, next: NextFunction) {
        const participantQuizz : ParticipantQuizz = req.body;
        if(!participantQuizz) { res.sendStatus(400); }

        const coursRepository = getRepository(Cours);
        const cours = await coursRepository.findByIds(participantQuizz?.cours ?? [])

        const groupeRepository = getRepository(Groupe);
        const groupe = await groupeRepository.findByIds(participantQuizz?.groupe ?? [])

        const newParticipantQuizz = ParticipantQuizz.create({
            ...participantQuizz,
            cours,
            groupe
        });

        const errors = await validate(newParticipantQuizz);
        if(errors.length > 0)
        {
            res.status(400).send({ messages: errors });
            return;
        } 

        return res.json(await newParticipantQuizz.save());
    }

    //Get ParticipantQuizz
    async getParticipantQuizz(req: Request, res: Response, next: NextFunction) {
        const idParticipantQuizz : string = req.params.id;
        if(!idParticipantQuizz) { return res.sendStatus(400); }

        const participantQuizz = await ParticipantQuizz.findOne(idParticipantQuizz, { relations: ["cours", "cours.eleveParticiperCours", "groupe"]});
        if(!participantQuizz) { return res.sendStatus(400); }

        return res.json(participantQuizz);
    }

    //Update ParticipantQuizz
    async patchParticipantQuizz(req: Request, res: Response, next: NextFunction) {
        const idParticipantQuizz : string = req.params.id;
        if(!idParticipantQuizz) { return res.sendStatus(400); }

        const participantQuizz = await ParticipantQuizz.findOne(idParticipantQuizz, { relations: ["cours", "cours.eleveParticiperCours", "groupe", "groupe.eleveParticiperGroupe"]});
        if(!participantQuizz) { return res.sendStatus(404); }

        const body : participantQuizzInput = req.body;
        if(!body) { return res.sendStatus(400); }

        const participantQuizzRepository = getRepository(ParticipantQuizz);

        const cours = await Cours.findByIds(body?.cours || []);

        const groupe = await Groupe.findByIds(body?.groupe || []);

        return res.json(await participantQuizzRepository.save({ 
            ...participantQuizz,
            ...body,
            cours,
            groupe
         }));
    }

    //Delete ParticipantQuizz
    async deleteParticipant(req: Request, res: Response, next: NextFunction) {
        const idParticipantQuizz : string = req.params.id;
        if(!idParticipantQuizz) { return res.sendStatus(400); }

        const participantQuizz = await ParticipantQuizz.findOne(idParticipantQuizz);
        if(!participantQuizz) { return res.sendStatus(400); }

        const participantQuizzRepository = getRepository(ParticipantQuizz);
        if(!participantQuizzRepository) { return res.sendStatus(400); }

        participantQuizzRepository.delete(participantQuizz);

        return res.json({message : "La participation au quizz a bien été supprimée."})
    }
}