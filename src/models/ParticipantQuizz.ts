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

import { IsDefined, IsInt, Min } from "class-validator";
import { Groupe } from "./Groupe";
import { Cours } from "./Cours";

@Entity()
export class ParticipantQuizz extends BaseEntity {
    //Primary Key
    @PrimaryGeneratedColumn('uuid')
    id: string;

    //Entities
    @Column()
    @IsDefined()
    quizzTerminer: boolean;

    @Column()
    @IsDefined()
    datePassage: Date;

    @Column()
    @IsDefined()
    @IsInt()
    @Min(0)
    dureeQuizz: number;

    //Foreign Key Cours
    @ManyToMany(() => Cours)
    @JoinTable({name:"cours_participant_quizz"})
    cours: Cours[];

    //Foreign Key Groupe
    @ManyToMany(() => Groupe)
    @JoinTable({name:"groupe_participant_quizz"})
    groupe: Groupe[];
}