import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable
    } from "typeorm";

import { IsDefined, Length, IsDate, IsEmail } from "class-validator";
import { Cours } from "./Cours";
import { Groupe } from "./Groupe";
import { Quizz } from "./Quizz";
import { Question } from './Question';
import { Eleve } from './Eleve';

@Entity()
export class Professeur extends BaseEntity {
    //Primary Key
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //Entities
    @Column()
    @IsDefined()
    nom: string;

    @Column()
    @IsDefined()
    prenom: string;

    @Column()
    @IsDefined()
    password: string;

    @Column()
    @IsDefined()
    dateDeNaissance: Date;

    @Column()
    @Length(10,10)
    @IsDefined()
    telephone: string;

    @Column()
    @IsEmail()
    @IsDefined()
    mail: string;

    //Foreign Key Cours
    @OneToMany(() => Cours, (cours) => cours.professeur)
    createCours: [Cours];

    //Foreign Key Groupe
    @OneToMany(() => Groupe, (groupe) => groupe.professeur)
    createGroupe: [Groupe];

    //Foreign Key Quizz
    @OneToMany(() => Quizz, (quizz) => quizz.professeur)
    createQuizz: [Quizz];

    //Foreign Key Question
    @OneToMany(() => Question, (question) => question.professeur)
    createQuestion: [Question];
}