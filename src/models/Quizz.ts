import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    ManyToMany,
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToOne
    } from "typeorm";

import { IsDefined, Length } from "class-validator";
import { Professeur } from "./Professeur";
import { Question } from "./Question";

@Entity()
export class Quizz extends BaseEntity {
    //Primary Key
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //Foreign Key Professeur
    @ManyToOne(() => Professeur, professeur => professeur.createQuizz)
    professeur: Professeur;

    //Foreign Key Question
    @ManyToMany(() => Question)
    @JoinTable()
    questions: Question[];
}