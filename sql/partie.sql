SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

DROP TABLE IF EXISTS `partie`;
CREATE TABLE IF NOT EXISTS `partie`(
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `token` varchar(255) DEFAULT NULL,
  `nb_photos` int(2) NOT NULL,
  `status` int(1) NOT NULL,
  `score` varchar(10) NOT NULL,
  `joueur` varchar(255) NOT NULL,
  `id_serie` bigint(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  FOREIGN KEY (`id_serie`) REFERENCES `serie`(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1; 

DROP TABLE IF EXISTS `serie`;
CREATE TABLE IF NOT EXISTS `serie` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ville` varchar(100) NOT NULL,
  `map_refs` varchar(255) NOT NULL,
  `dist` int(4)  NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `serie_Unique` (`ville`,`map_refs`,`dist`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



DROP TABLE IF EXISTS `photo`;
CREATE TABLE IF NOT EXISTS `photo` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `desc` varchar(255) NOT NULL,
  `positionX` float(10) NOT NULL,
  `positionY` float(10) NOT NULL,
  `url` varchar(255)  NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `serie_photo`;
CREATE TABLE IF NOT EXISTS `serie_photo` (
  `id_serie` bigint(20) UNSIGNED NOT NULL,
  `id_photo` bigint(20) UNSIGNED NOT NULL,
  UNIQUE KEY `Photo_Unique_Par_Serie` (`id_serie`,`id_photo`),
  FOREIGN KEY (`id_serie`) REFERENCES `serie`(`id`),
  FOREIGN KEY (`id_photo`) REFERENCES `photo`(`id_photo`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur`(
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id`(`id`),
  UNIQUE KEY `email`(`email`),
)ENGINE=MyISAM DEFAULT CHARSET=latin1;