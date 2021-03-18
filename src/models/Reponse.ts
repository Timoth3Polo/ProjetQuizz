import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    ManyToOne,
    ManyToMany,
    PrimaryGeneratedColumn,
    } from "typeorm";

import { IsDefined, Length } from "class-validator";
import { Question } from "./Question";

@Entity()
export class Reponse extends BaseEntity {
    //Primary Key
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //Entities
    @Column({type: "text"})
    @IsDefined()
    laReponse: string;
    
    //Foreign Key Question
    @ManyToOne(() => Question, question => question.lesReponses)
    question: Question;
}