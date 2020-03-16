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
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1; 

DROP TABLE IF EXISTS `série`;
CREATE TABLE IF NOT EXISTS `série` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ville` varchar(100) NOT NULL,
  `map_refs` varchar(255) NOT NULL,
  `dist` int(4)  NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



DROP TABLE IF EXISTS `photo`;
CREATE TABLE IF NOT EXISTS `photo` (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `desc` varchar(255) NOT NULL,
  `position_X` float(10) NOT NULL,
  `position_Y` float(10) NOT NULL,
  `url` varchar(255)  NOT NULL,
  `id_série` bigint(20) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  FOREIGN KEY (`id_série`) REFERENCES `série`(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

