import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    ManyToMany,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinTable
    } from "typeorm";

import { IsDefined, Length } from "class-validator";
import { Professeur } from './Professeur';
import { Eleve } from './Eleve';
import { ParticipantQuizz } from './ParticipantQuizz';
  
@Entity()
export class Cours extends BaseEntity {
    //Primary Key
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    //Entities
    @Column()
    @IsDefined()
    libelle: string;

    //Foreign Key Professeur
    @ManyToOne(() => Professeur, professeur => professeur.createCours)
    professeur: Professeur;

    //Foreign Key Eleve
    @ManyToMany(() => Eleve, eleve => eleve.coursAvoirEleve)
    elevesParticiperCours: Eleve[];

    //Foreign Key ParticipantQuizz
    @ManyToMany(() => ParticipantQuizz)
    @JoinTable({name:"cours_participant_quizz"})
    participantQuizz: ParticipantQuizz[];
}