/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Volcado de tabla category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` char(36) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;

INSERT INTO `category` (`id`, `name`)
VALUES
  ('67c480be-3703-11e5-823c-22cb9381cb76','web'),
  ('6f2dd58a-3703-11e5-823c-22cb9381cb76','app'),
  ('74f729bc-3703-11e5-823c-22cb9381cb76','game'),
  ('7aca5454-3703-11e5-823c-22cb9381cb76','maker');

/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;


# Volcado de tabla contact
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contact`;

CREATE TABLE `contact` (
  `id` char(36) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `lastname` varchar(255) NOT NULL DEFAULT '',
  `dni` int(10) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL DEFAULT '',
  `facebook` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `path_picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla diary
# ------------------------------------------------------------

DROP TABLE IF EXISTS `diary`;

CREATE TABLE `diary` (
  `id` char(36) NOT NULL DEFAULT '',
  `id_padawan` char(36) NOT NULL,
  `id_project` char(36) NOT NULL,
  `date` date NOT NULL,
  `last_week` varchar(255) NOT NULL DEFAULT '',
  `daily_target` varchar(255) NOT NULL DEFAULT '',
  `tools` varchar(255) NOT NULL DEFAULT '',
  `observations` varchar(255) NOT NULL DEFAULT '',
  `attitude` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `id_padawan` (`id_padawan`),
  KEY `id_project` (`id_project`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla dojo
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dojo`;

CREATE TABLE `dojo` (
  `id` char(36) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `description` text,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `id_status` char(36) NOT NULL DEFAULT '',
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_status` (`id_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla dojo_employee
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dojo_employee`;

CREATE TABLE `dojo_employee` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_dojo` char(36) NOT NULL DEFAULT '',
  `id_employee` char(36) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `id_dojo` (`id_dojo`),
  KEY `id_employee` (`id_employee`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla dojo_mentor
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dojo_mentor`;

CREATE TABLE `dojo_mentor` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_dojo` char(36) NOT NULL DEFAULT '',
  `id_mentor` char(36) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `id_dojo` (`id_dojo`),
  KEY `id_mentor` (`id_mentor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla dojo_padawan
# ------------------------------------------------------------

DROP TABLE IF EXISTS `dojo_padawan`;

CREATE TABLE `dojo_padawan` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_dojo` char(36) NOT NULL DEFAULT '',
  `id_padawan` char(36) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `id_dojo` (`id_dojo`),
  KEY `id_padawan` (`id_padawan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla employee
# ------------------------------------------------------------

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `id` char(36) NOT NULL DEFAULT '',
  `id_contact` char(36) NOT NULL DEFAULT '',
  `id_status` char(36) NOT NULL DEFAULT '',
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_status` (`id_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla log_mentor
# ------------------------------------------------------------

DROP TABLE IF EXISTS `log_mentor`;

CREATE TABLE `log_mentor` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `id_dojo` char(36) NOT NULL DEFAULT '',
  `id_mentor` char(36) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `id_dojo` (`id_dojo`),
  KEY `id_mentor` (`id_mentor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla log_padawan
# ------------------------------------------------------------

DROP TABLE IF EXISTS `log_padawan`;

CREATE TABLE `log_padawan` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `id_dojo` char(36) NOT NULL,
  `id_padawan` char(36) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `id_dojo` (`id_dojo`),
  KEY `id_padawan` (`id_padawan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla mentor
# ------------------------------------------------------------

DROP TABLE IF EXISTS `mentor`;

CREATE TABLE `mentor` (
  `id` char(36) NOT NULL DEFAULT '',
  `id_contact` char(36) NOT NULL,
  `id_status` char(36) NOT NULL DEFAULT '',
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_status` (`id_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla padawan
# ------------------------------------------------------------

DROP TABLE IF EXISTS `padawan`;

CREATE TABLE `padawan` (
  `id` char(36) NOT NULL DEFAULT '',
  `id_contact` char(36) NOT NULL DEFAULT '',
  `id_status` char(36) NOT NULL DEFAULT '',
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_status` (`id_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla payment
# ------------------------------------------------------------

DROP TABLE IF EXISTS `payment`;

CREATE TABLE `payment` (
  `id` char(36) NOT NULL DEFAULT '',
  `date` date NOT NULL,
  `month` int(2) NOT NULL,
  `year` int(4) NOT NULL,
  `id_dojo` char(36) NOT NULL,
  `id_padawan` char(36) NOT NULL DEFAULT '',
  `amount` double NOT NULL,
  `observation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_dojo` (`id_dojo`),
  KEY `id_padawan` (`id_padawan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla project
# ------------------------------------------------------------

DROP TABLE IF EXISTS `project`;

CREATE TABLE `project` (
  `id` char(36) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `target` varchar(255) NOT NULL DEFAULT '',
  `why` varchar(255) NOT NULL DEFAULT '',
  `who` varchar(255) NOT NULL DEFAULT '',
  `scope` varchar(255) NOT NULL DEFAULT '',
  `id_status` char(36) NOT NULL DEFAULT '',
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_status` (`id_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla project_category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `project_category`;

CREATE TABLE `project_category` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_project` char(36) NOT NULL DEFAULT '',
  `id_category` char(36) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `id_project` (`id_project`),
  KEY `id_category` (`id_category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla project_padawan
# ------------------------------------------------------------

DROP TABLE IF EXISTS `project_padawan`;

CREATE TABLE `project_padawan` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_project` char(36) NOT NULL DEFAULT '',
  `id_padawan` char(36) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `id_project` (`id_project`),
  KEY `id_padawan` (`id_padawan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla responsible
# ------------------------------------------------------------

DROP TABLE IF EXISTS `responsible`;

CREATE TABLE `responsible` (
  `id` char(36) NOT NULL DEFAULT '',
  `id_contact` char(36) NOT NULL,
  `id_status` char(36) NOT NULL DEFAULT '',
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_status` (`id_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla responsible_padawan
# ------------------------------------------------------------

DROP TABLE IF EXISTS `responsible_padawan`;

CREATE TABLE `responsible_padawan` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_responsible` char(36) NOT NULL DEFAULT '',
  `id_padawan` char(36) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `id_responsible` (`id_responsible`),
  KEY `id_padawan` (`id_padawan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Volcado de tabla status
# ------------------------------------------------------------

DROP TABLE IF EXISTS `status`;

CREATE TABLE `status` (
  `id` char(36) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;

INSERT INTO `status` (`id`, `name`)
VALUES
  ('0547367a-2d80-11e5-8741-2bb60d1f72e2','activo'),
  ('f9d8fb5c-2d7f-11e5-8741-2bb60d1f72e2','pendiente'),
  ('ff0de0c4-2d7f-11e5-8741-2bb60d1f72e2','lost');

/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;