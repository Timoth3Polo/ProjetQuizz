import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    ManyToOne,
    ManyToMany,
    JoinTable,
    PrimaryGeneratedColumn
    } from "typeorm";

import { IsDefined, Length } from "class-validator";
import { Professeur } from './Professeur';
import { Eleve } from './Eleve';
import { ParticipantQuizz } from './ParticipantQuizz';

@Entity()
export class Groupe extends BaseEntity {
    //Primary Key
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //Entities
    @Column()
    @IsDefined()
    libelle: string;

    //Foreign Key Professeur
    @ManyToOne(() => Professeur, professeur => professeur.createGroupe)
    professeur: Professeur;

    //Foreign Key Eleve
    @ManyToMany(() => Eleve, eleve => eleve.groupeAvoirEleve)
    eleveParticiperGroupe: Eleve[];

    //Foreign Key ParticipantQuizz
    @ManyToMany(() => ParticipantQuizz)
    @JoinTable({name:"groupe_participant_quizz"})
    participantQuizz: ParticipantQuizz[];
}