import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    ManyToMany,
    PrimaryGeneratedColumn,
    JoinTable,
    } from "typeorm";

import { IsDate, IsDefined, IsEmail, Length } from "class-validator";
import { Groupe } from './Groupe';
import { Cours } from './Cours';

@Entity()
export class Eleve extends BaseEntity {
    //Primary key
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
    //@IsDate()
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

    //Foreign Key Groupe
    @ManyToMany(() => Groupe, groupe => groupe.eleveParticiperGroupe)
    @JoinTable()
    groupeAvoirEleve: Groupe[];

    //Foreign Key Cours
    @ManyToMany(() => Cours, cours => cours.elevesParticiperCours)
    @JoinTable()
    coursAvoirEleve: Cours[];
}