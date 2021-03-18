import { UserTypesEnum } from "src/enums/UserTypesEnum";

export interface IToken {
    id: string;
    nom: string;
    prenom: string;
    type: UserTypesEnum
}