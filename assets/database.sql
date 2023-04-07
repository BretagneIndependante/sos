
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 07 avr. 2023 à 23:42
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `SOS`
--

-- --------------------------------------------------------

--
-- Structure de la table `Account`
--

CREATE TABLE `Account` (
  `uuid` varchar(32) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Chat`
--

CREATE TABLE `Chat` (
  `uuid` varchar(32) NOT NULL,
  `the_ticket` varchar(32) DEFAULT NULL,
  `content` text(5000) DEFAULT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `PieceJointe`
--

CREATE TABLE `PieceJointe` (
  `uuid` varchar(32) NOT NULL,
  `the_ticket` varchar(32) DEFAULT NULL,
  `link` varchar(100) DEFAULT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Ticket`
--

CREATE TABLE `Ticket` (
  `uuid` varchar(32) NOT NULL,
  `statut` tinyint(1) DEFAULT NULL,
  `time_stamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `description` text(5000) DEFAULT NULL,
  `location` varchar(22) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Account`
--
ALTER TABLE `Account`
  ADD PRIMARY KEY (`uuid`);

--
-- Index pour la table `Chat`
--
ALTER TABLE `Chat`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `FK_TicketChat` (`the_ticket`);

--
-- Index pour la table `PieceJointe`
--
ALTER TABLE `PieceJointe`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `FK_TicketPieceJointe` (`the_ticket`);

--
-- Index pour la table `Ticket`
--
ALTER TABLE `Ticket`
  ADD PRIMARY KEY (`uuid`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Chat`
--
ALTER TABLE `Chat`
  ADD CONSTRAINT `FK_TicketChat` FOREIGN KEY (`the_ticket`) REFERENCES `Ticket` (`uuid`);

--
-- Contraintes pour la table `PieceJointe`
--
ALTER TABLE `PieceJointe`
  ADD CONSTRAINT `FK_TicketPieceJointe` FOREIGN KEY (`the_ticket`) REFERENCES `Ticket` (`uuid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


