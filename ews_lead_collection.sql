-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 11, 2018 at 12:55 PM
-- Server version: 5.7.19
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wptest_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `ews_lead_collection`
--

DROP TABLE IF EXISTS `ews_lead_collection`;
CREATE TABLE IF NOT EXISTS `ews_lead_collection` (
  `rowid` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(32) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `email_address` varchar(64) NOT NULL,
  `webinar_date` datetime NOT NULL,
  `date_timezone` varchar(32) NOT NULL,
  `webinar_id` varchar(16) NOT NULL,
  `user_id` varchar(32) NOT NULL,
  `thankyou_url` varchar(256) NOT NULL,
  `liveroom_url` varchar(256) NOT NULL,
  `replyroom_url` varchar(256) NOT NULL,
  `schedule` varchar(5) NOT NULL,
  PRIMARY KEY (`rowid`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
