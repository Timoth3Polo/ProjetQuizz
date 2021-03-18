import { Professeur } from "@/models/Professeur";

export interface participantQuizzInput {
    quizzTerminer: boolean;
    datePassage: Date;
    dureeQuizz: number;
    cours: Array<string>;
    groupe: Array<string>;
}

export interface coursInput {
    libelle: string;
    professeur: Professeur;
    elevesParticiperCours: Array<string>;
}