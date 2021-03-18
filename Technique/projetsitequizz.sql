-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  lun. 18 jan. 2021 à 18:03
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `projetsitequizz`
--

-- --------------------------------------------------------

--
-- Structure de la table `archivequizzfaiteleve`
--

DROP TABLE IF EXISTS `archivequizzfaiteleve`;
CREATE TABLE IF NOT EXISTS `archivequizzfaiteleve` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idEleve` bigint(20) NOT NULL,
  `idParticipant` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idParticipant` (`idParticipant`),
  KEY `idEleve` (`idEleve`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `cours`
--

DROP TABLE IF EXISTS `cours`;
CREATE TABLE IF NOT EXISTS `cours` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idChefCours` bigint(20) NOT NULL,
  `libelle` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueNomCours` (`libelle`),
  KEY `idChefCours` (`idChefCours`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `cours`
--

INSERT INTO `cours` (`id`, `idChefCours`, `libelle`) VALUES
(1, 1, 'Mathématique'),
(2, 2, 'Français'),
(3, 1, 'Algèbre'),
(4, 2, 'Philosophie'),
(5, 1, 'Géométrie'),
(6, 3, 'EDM'),
(7, 3, 'Droit'),
(8, 3, 'Économie');

-- --------------------------------------------------------

--
-- Structure de la table `eleve`
--

DROP TABLE IF EXISTS `eleve`;
CREATE TABLE IF NOT EXISTS `eleve` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `pseudo` varchar(100) NOT NULL,
  `dateDeNaissance` date NOT NULL,
  `telephone` varchar(10) NOT NULL CHECK (octet_length(`telephone`) = 10),
  `mail` varchar(100) NOT NULL CHECK (`mail` like '%@%.%'),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueEmail` (`mail`),
  UNIQUE KEY `uniqueContact` (`nom`,`prenom`,`dateDeNaissance`),
  UNIQUE KEY `uniqueTel` (`telephone`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `eleve`
--

INSERT INTO `eleve` (`id`, `nom`, `prenom`, `mdp`, `pseudo`, `dateDeNaissance`, `telephone`, `mail`) VALUES
(1, 'PAUL', 'Timothé', 'eleve1', 'eleve1', '1997-12-12', '0689457513', 'timothepaul@gmail.com'),
(2, 'PAUL', 'Benjamin', 'eleve2', 'eleve2', '1997-12-12', '0689357513', 'benjaminpaul@gmail.com'),
(3, 'PAUL', 'Barbara', 'eleve3', 'eleve3', '1997-12-12', '0625357513', 'barbarapaul@gmail.com'),
(4, 'DUPONT', 'Albert', 'eleve4', 'eleve4', '1996-12-12', '0679456523', 'albertdupont@gmail.com'),
(5, 'DUPONT', 'Roger', 'eleve5', 'eleve5', '1996-12-12', '0679456524', 'rogerdupont@gmail.com'),
(6, 'DUPONT', 'Florant', 'eleve6', 'eleve6', '1996-12-12', '0679456525', 'Florantdupont@gmail.com'),
(7, 'DUPONT', 'Bob', 'eleve7', 'eleve7', '1996-12-12', '0679456526', 'bobdupont@gmail.com'),
(8, 'DUPONT', 'Paul', 'eleve8', 'eleve8', '1996-12-12', '0679456527', 'pauldupont@gmail.com'),
(9, 'DUPONT', 'Marie', 'eleve9', 'eleve9', '1996-12-12', '0679456528', 'mariedupont@gmail.com'),
(10, 'DUPONT', 'Loic', 'eleve10', 'eleve10', '1996-12-12', '0679456529', 'loicdupont@gmail.com');

-- --------------------------------------------------------

--
-- Structure de la table `eleveparticiper`
--

DROP TABLE IF EXISTS `eleveparticiper`;
CREATE TABLE IF NOT EXISTS `eleveparticiper` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idEleveParticipant` bigint(20) NOT NULL,
  `idParticiperGroupe` bigint(20) DEFAULT NULL,
  `idParticiperCours` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idEleveParticipant` (`idEleveParticipant`),
  KEY `idParticiperGroupe` (`idParticiperGroupe`),
  KEY `idParticiperCours` (`idParticiperCours`)
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `eleveparticiper`
--

INSERT INTO `eleveparticiper` (`id`, `idEleveParticipant`, `idParticiperGroupe`, `idParticiperCours`) VALUES
(1, 1, 1, 1),
(2, 2, 1, 1),
(3, 3, 2, 1),
(4, 1, 9, 3),
(5, 1, 6, 7),
(6, 1, NULL, 5),
(7, 1, NULL, 8),
(8, 1, NULL, 6),
(9, 2, 3, 2),
(10, 2, 5, 4),
(11, 2, 7, 3),
(12, 2, 10, 7),
(13, 3, 8, 3),
(14, 3, NULL, 5),
(15, 4, NULL, 1),
(16, 4, NULL, 2),
(17, 4, NULL, 3),
(18, 4, NULL, 4),
(19, 4, NULL, 5),
(20, 4, NULL, 6),
(21, 4, NULL, 7),
(22, 4, NULL, 8),
(23, 5, 1, 2),
(24, 5, 2, 3),
(25, 5, NULL, 6),
(26, 6, 13, 7),
(27, 6, 7, 3),
(28, 6, 5, 4),
(29, 7, 12, 7),
(30, 7, 8, 3),
(31, 8, 11, 7),
(32, 9, 11, 7),
(33, 10, NULL, 3),
(34, 10, NULL, 7);

-- --------------------------------------------------------

--
-- Structure de la table `groupe`
--

DROP TABLE IF EXISTS `groupe`;
CREATE TABLE IF NOT EXISTS `groupe` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idChefGroupe` bigint(20) NOT NULL,
  `libelle` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueNomGroupe` (`libelle`),
  KEY `idChefGroupe` (`idChefGroupe`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `groupe`
--

INSERT INTO `groupe` (`id`, `idChefGroupe`, `libelle`) VALUES
(1, 1, 'Math1'),
(2, 1, 'Math2'),
(3, 2, 'TD-Français'),
(4, 2, 'TD-Philo1'),
(5, 2, 'TD-Philo2'),
(6, 1, 'TD-Algèbre1'),
(7, 1, 'TD-Algèbre3'),
(8, 1, 'TD-Algèbre2'),
(9, 3, 'TD-Droit1'),
(10, 3, 'TD-Droit2'),
(11, 3, 'TD-Droit3'),
(12, 3, 'TD-Droit4'),
(13, 3, 'TD-Droit5');

-- --------------------------------------------------------

--
-- Structure de la table `groupeavoircours`
--

DROP TABLE IF EXISTS `groupeavoircours`;
CREATE TABLE IF NOT EXISTS `groupeavoircours` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idCours` bigint(20) NOT NULL,
  `idGroupe` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idGroupe` (`idGroupe`),
  KEY `idCours` (`idCours`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `groupeavoircours`
--

INSERT INTO `groupeavoircours` (`id`, `idCours`, `idGroupe`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 4, 4),
(5, 4, 5),
(6, 3, 6),
(7, 3, 7),
(8, 3, 8),
(9, 7, 9),
(10, 7, 10),
(11, 7, 11),
(12, 7, 12),
(13, 7, 13),
(14, 1, NULL),
(15, 2, NULL),
(16, 3, NULL),
(17, 4, NULL),
(18, 5, NULL),
(19, 6, NULL),
(20, 7, NULL),
(21, 8, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `partagerquizz`
--

DROP TABLE IF EXISTS `partagerquizz`;
CREATE TABLE IF NOT EXISTS `partagerquizz` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idDonneAuProf` bigint(20) NOT NULL,
  `idQuizzDonner` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idDonneAuProf` (`idDonneAuProf`),
  KEY `idQuizzDonner` (`idQuizzDonner`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `partagerquizz`
--

INSERT INTO `partagerquizz` (`id`, `idDonneAuProf`, `idQuizzDonner`) VALUES
(1, 2, 1),
(2, 3, 2),
(3, 1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `participantquizz`
--

DROP TABLE IF EXISTS `participantquizz`;
CREATE TABLE IF NOT EXISTS `participantquizz` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idGroupeAvoirCours` bigint(20) NOT NULL,
  `idQuizz` bigint(20) NOT NULL,
  `quizzTerminer` tinyint(4) NOT NULL,
  `date` date NOT NULL,
  `temps` int(11) NOT NULL CHECK (`temps` > 0),
  PRIMARY KEY (`id`),
  KEY `idQuizz` (`idQuizz`),
  KEY `idGroupeAvoirCours` (`idGroupeAvoirCours`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `participantquizz`
--

INSERT INTO `participantquizz` (`id`, `idGroupeAvoirCours`, `idQuizz`, `quizzTerminer`, `date`, `temps`) VALUES
(3, 14, 1, 0, '2021-01-15', 30),
(4, 16, 1, 0, '2021-01-15', 30),
(5, 18, 1, 0, '2021-01-15', 30),
(6, 16, 4, 0, '2021-01-15', 45),
(7, 18, 4, 0, '2021-01-15', 45),
(8, 15, 2, 0, '2021-01-15', 30),
(9, 17, 2, 0, '2021-01-15', 30),
(10, 15, 5, 0, '2021-01-15', 60),
(11, 17, 5, 0, '2021-01-15', 60),
(12, 19, 3, 0, '2021-01-15', 30),
(13, 20, 3, 0, '2021-01-15', 30),
(14, 21, 3, 0, '2021-01-15', 30),
(15, 20, 6, 0, '2021-01-15', 15),
(16, 21, 6, 0, '2021-01-15', 15);

-- --------------------------------------------------------

--
-- Structure de la table `professeur`
--

DROP TABLE IF EXISTS `professeur`;
CREATE TABLE IF NOT EXISTS `professeur` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `mdp` varchar(255) NOT NULL,
  `pseudo` varchar(100) NOT NULL,
  `dateDeNaissance` date NOT NULL,
  `telephone` varchar(10) NOT NULL CHECK (octet_length(`telephone`) = 10),
  `mail` varchar(100) NOT NULL CHECK (`mail` like '%@%.%'),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueEmail` (`mail`),
  UNIQUE KEY `uniqueContact` (`nom`,`prenom`,`dateDeNaissance`),
  UNIQUE KEY `uniqueTel` (`telephone`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `professeur`
--

INSERT INTO `professeur` (`id`, `nom`, `prenom`, `mdp`, `pseudo`, `dateDeNaissance`, `telephone`, `mail`) VALUES
(1, 'MARCHAL', 'Gilles', 'prof1', 'prof1', '2000-12-12', '0689456536', 'marGille@gmail.com'),
(2, 'DAUCOURT', 'Gabriel', 'prof2', 'prof2', '1999-12-12', '0689457536', 'gabDAUCOURT@gmail.com'),
(3, 'BOURBEAU', 'Roger', 'prof3', 'prof3', '1997-12-12', '0689457516', 'rogBOURBEAU@gmail.com');

-- --------------------------------------------------------

--
-- Structure de la table `question`
--

DROP TABLE IF EXISTS `question`;
CREATE TABLE IF NOT EXISTS `question` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idProfCreateQuestion` bigint(20) NOT NULL,
  `laQuestion` text NOT NULL CHECK (octet_length(`laQuestion`) >= 5),
  `nbPoint` float NOT NULL CHECK (`nbPoint` > 0),
  `niveau` int(11) NOT NULL CHECK (`niveau` > 0),
  PRIMARY KEY (`id`),
  KEY `idProfCreateQuestion` (`idProfCreateQuestion`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `question`
--

INSERT INTO `question` (`id`, `idProfCreate`, `laQuestion`, `nbPoint`, `niveau`) VALUES
(6, 1, '8/3 = ?', 3, 2),
(5, 1, '2x7 = ?', 2, 2),
(4, 1, '1+1 = ?', 1, 1),
(7, 1, 'La valeur de pie est de ? (arrondir au 100ième)', 4, 3),
(8, 1, '98+165 = ?', 2, 2),
(9, 1, '163/8 = ?', 4, 3),
(10, 1, '12*12 = ?', 2, 2),
(11, 1, '12*12*15 = ?', 4, 3),
(12, 1, 'Le carré de 9 = ?', 2, 2),
(13, 1, '5 puissance 3 = ?', 3, 3),
(14, 2, 'La première lettre de l\'alphabet', 1, 1),
(15, 2, 'La dernière lettre de l\'alphabet', 2, 2),
(16, 2, 'Qui est E. MACRON ?', 3, 2),
(17, 2, 'Qui était Louis XVI ?', 1, 1),
(18, 2, 'Comment écris ton Paris ?', 2, 2),
(19, 2, 'D\'où provient le français ?', 3, 2),
(20, 2, 'La terre est-elle ronde ?', 1, 1),
(21, 2, 'Quelles sont les attributs du français ?', 2, 2),
(22, 2, 'Écrivez épidermie', 3, 2),
(23, 2, 'La france est belle ?', 3, 2),
(24, 3, 'Combien il faut de centime pour faire un euro ?', 1, 1),
(25, 3, 'La conversion du franc à l\'euro', 2, 2),
(26, 3, 'La conversion du dollar en euro', 3, 2),
(27, 3, 'La conversion du livre en euro', 1, 1),
(28, 3, 'L\'économie est-elle importante ?', 2, 2),
(29, 3, 'Pourquoi faut-il comprendre les lois ?', 3, 2),
(30, 3, 'Connaître les lois est-il un atout dans la vie ?', 1, 1),
(31, 3, 'Connaître les droits du travail permet de se faire respecter ?', 2, 2),
(32, 3, 'Le droit est-il compliqué ?', 3, 2),
(33, 3, 'Peut-on voler l\'idée de Monsieur X alors qu\'elle est sur le marché ?', 3, 2);

-- --------------------------------------------------------

--
-- Structure de la table `quizz`
--

DROP TABLE IF EXISTS `quizz`;
CREATE TABLE IF NOT EXISTS `quizz` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idProfCreateQuizz` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idProfCreateQuizz` (`idProfCreateQuizz`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `quizz`
--

INSERT INTO `quizz` (`id`, `idProfCreateQuizz`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 1),
(5, 2),
(6, 3);

-- --------------------------------------------------------

--
-- Structure de la table `quizzquestion`
--

DROP TABLE IF EXISTS `quizzquestion`;
CREATE TABLE IF NOT EXISTS `quizzquestion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idQuestion` bigint(20) NOT NULL,
  `idQuizz` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idQuestion` (`idQuestion`),
  KEY `idQuizz` (`idQuizz`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `quizzquestion`
--

INSERT INTO `quizzquestion` (`id`, `idQuestion`, `idQuizz`) VALUES
(6, 6, 1),
(5, 5, 1),
(4, 4, 1),
(7, 7, 1),
(8, 8, 1),
(9, 9, 4),
(10, 10, 4),
(11, 11, 4),
(12, 12, 4),
(13, 13, 4),
(14, 14, 2),
(15, 15, 2),
(16, 16, 2),
(17, 17, 2),
(18, 18, 2),
(19, 19, 5),
(20, 20, 5),
(21, 21, 5),
(22, 22, 5),
(23, 23, 5),
(24, 24, 3),
(25, 25, 3),
(26, 26, 3),
(27, 27, 3),
(28, 28, 3),
(29, 29, 6),
(30, 30, 6),
(31, 31, 6),
(32, 32, 6),
(33, 33, 6);

-- --------------------------------------------------------

--
-- Structure de la table `reponse`
--

DROP TABLE IF EXISTS `reponse`;
CREATE TABLE IF NOT EXISTS `reponse` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `idQuestion` bigint(20) NOT NULL,
  `laReponse` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idQuestion` (`idQuestion`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `reponse`
--

INSERT INTO `reponse` (`id`, `idQuestion`, `laReponse`) VALUES
(6, 6, '2.66'),
(5, 5, '14'),
(4, 4, '2'),
(7, 7, '3.14'),
(8, 8, '263'),
(9, 9, '20.375'),
(10, 10, '144'),
(11, 11, '2160'),
(12, 12, '81'),
(13, 13, '125'),
(14, 14, 'A'),
(15, 15, 'Z'),
(16, 16, 'Le président de la République du mandat 2017-2022'),
(17, 17, 'Un roi'),
(18, 18, 'Paris'),
(19, 19, 'Latin'),
(20, 20, 'Oui'),
(21, 21, 'Le vin et la baguette mais aussi le fromage'),
(22, 22, 'épidermie'),
(23, 23, 'Oui'),
(24, 24, '100'),
(25, 25, 'franc'),
(26, 26, 'dollar'),
(27, 27, 'livre'),
(28, 28, 'Oui'),
(29, 29, 'Pour permettre de se défendre'),
(30, 30, 'Oui'),
(31, 31, 'Oui'),
(32, 32, 'Oui'),
(33, 33, 'Non');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
