//Importing packages
import bodyParser from "body-parser";
import cors from "cors";
import Express from "express";
import morgan from "morgan";
import "reflect-metadata";

//Importing models
import { createConnection } from "typeorm";
import { EleveController } from "./controllers/EleveController";
import { ProfesseurController } from "./controllers/ProfesseurController";
import { QuestionController } from './controllers/QuestionController';
import { QuizzController } from './controllers/QuizzController';
import { authCheckMiddleware } from "./middleware/authCheckMiddleware";
import { authorizationCheckMiddleware } from './middleware/authorizationCheckMiddleware';
import { CoursController } from './controllers/CoursController';
import { ReponseController } from './controllers/ReponseController';
import { GroupeController } from './controllers/GroupeController';
import { ParticipantQuizzControler } from './controllers/ParicipantQuizzController';

//Express instance
const app = Express();

//Using packages
app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

//Controllers
const eleveController = new EleveController();
const professeurController = new ProfesseurController();
const questionController = new QuestionController();
const quizzController = new QuizzController();
const coursController = new CoursController();
const reponseController = new ReponseController();
const groupeController = new GroupeController();
const participantQuizzController = new ParticipantQuizzControler();

declare global {
    namespace Express {
      interface Request {
        userId: string 
      }
    }
  }

//URL from Eleve
app.post("/api/newEleve", eleveController.createEleve);
app.get("/api/Eleve/Courant", authCheckMiddleware, eleveController.getEleveCourant);
app.patch("/api/Eleve/Patch", authCheckMiddleware, eleveController.patchEleve);
app.delete("/api/Eleve/Delete", authCheckMiddleware, eleveController.deleteEleve);
app.post("/api/loginEleve", eleveController.loginEleve);

//URL from Professeur
app.post("/api/newProfesseur", professeurController.createProfesseur);
app.get("/api/Professeur/Courant", authCheckMiddleware, authorizationCheckMiddleware, professeurController.getProfesseurCourant);
app.patch("/api/Professeur/Patch", authCheckMiddleware, professeurController.patchProfesseur);
app.delete("/api/Professeur/Delete", authCheckMiddleware, professeurController.deleteProfesseur);
app.post("/api/loginProfesseur", professeurController.loginProfesseur);

//URL from Question
app.post("/api/newQuestion", authCheckMiddleware, authorizationCheckMiddleware, questionController.createQuestion);
app.get("/api/Question/Voir/:id", authCheckMiddleware, authCheckMiddleware, questionController.getQuestion);
app.patch("/api/Question/Update/:id", authCheckMiddleware, authorizationCheckMiddleware, questionController.patchQuestion);
app.delete("/api/Question/Delete/:id", authCheckMiddleware, authorizationCheckMiddleware, questionController.deleteQuestion);

//URL from Quizz
app.post("/api/newQuizz", authCheckMiddleware, authorizationCheckMiddleware, quizzController.createQuizz);
app.get("/api/Quizz/Voir/:id", authCheckMiddleware, authCheckMiddleware, quizzController.getQuizz);
app.patch("/api/Quizz/Update/:id", authCheckMiddleware, authorizationCheckMiddleware, quizzController.patchQuizz);
app.delete("/api/Quizz/Delete/:id", authCheckMiddleware, authorizationCheckMiddleware, quizzController.deleteQuizz);

//URL from Cours
app.post("/api/newCours", authCheckMiddleware, authorizationCheckMiddleware, coursController.createCours);
app.get("/api/Cours/Voir/:id", authCheckMiddleware, authCheckMiddleware, coursController.getCours);
app.patch("/api/Cours/Update/:id", authCheckMiddleware, authorizationCheckMiddleware, coursController.patchCours);
app.delete("/api/Cours/Delete/:id", authCheckMiddleware, authorizationCheckMiddleware, coursController.deleteCours);
app.post("/api/Cours/UpdateEleve/:id", authCheckMiddleware, authorizationCheckMiddleware, coursController.updateEleve);

//URL from Groupe
app.post("/api/newGroupe", authCheckMiddleware, authorizationCheckMiddleware, groupeController.createGroupe);
app.get("/api/Groupe/Voir/:id", authCheckMiddleware, authCheckMiddleware, groupeController.getGroupe);
app.patch("/api/Groupe/Update/:id", authCheckMiddleware, authorizationCheckMiddleware, groupeController.patchGroupe);
app.delete("/api/Groupe/Delete/:id", authCheckMiddleware, authorizationCheckMiddleware, groupeController.deleteGroupe);

//URL from Reponse
app.post("/api/newReponse/:id", authCheckMiddleware, authorizationCheckMiddleware, reponseController.createReponse);
app.get("/api/Reponse/Voir/:id", authCheckMiddleware, authorizationCheckMiddleware, reponseController.getReponse);
app.patch("/api/Reponse/Update/:id", authCheckMiddleware, authorizationCheckMiddleware, reponseController.patchReponse);
app.delete("/api/Reponse/Delete/:id", authCheckMiddleware, authorizationCheckMiddleware, reponseController.deleteReponse);

//URL from ParticipantQuizz
app.post("/api/newParticipantQuizz", authCheckMiddleware, authorizationCheckMiddleware, participantQuizzController.createParticipantQuizz);
app.get("/api/ParticipantQuizz/Voir/:id", authCheckMiddleware, authorizationCheckMiddleware, participantQuizzController.getParticipantQuizz);
app.patch("/api/ParticipantQuizz/Update/:id", authCheckMiddleware, authorizationCheckMiddleware, participantQuizzController.patchParticipantQuizz);
app.delete("/api/ParticipantQuizz/Delete/:id", authCheckMiddleware, authorizationCheckMiddleware, participantQuizzController.deleteParticipant);

//Connecting to the server
const StartServer = async() => {
    await createConnection();
    app.listen(4000, ()=> {
        console.log("Server started (4000) : Hello world !");
    });
}

StartServer();