import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    ManyToOne,
    ManyToMany,
    PrimaryGeneratedColumn,
    JoinTable
    } from "typeorm";

import { IsDefined, IsInt, Min } from "class-validator";
import { Reponse } from "./Reponse";
import { Professeur } from "./Professeur";

@Entity()
export class Question extends BaseEntity {
    //Primary Key
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //Entities
    @Column({type: "text"})
    @IsDefined()
    laQuestion: string;

    @Column()
    @IsDefined()
    @IsInt()
    @Min(0)
    nbPoint: number;

    @Column()
    @IsDefined()
    @IsInt()
    @Min(0)
    niveau: number;

    @Column()
    @IsDefined()
    type: string;

    //Foreign Key Reponse
    @OneToMany(() => Reponse, (reponse) => reponse.question)
    lesReponses: [Reponse];

    //Foreign Key Professeur
    @ManyToOne(() => Professeur, professeur => professeur.createQuizz)
    professeur: Professeur;
}