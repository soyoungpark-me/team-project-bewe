-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: BeWe
-- ------------------------------------------------------
-- Server version	5.7.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `achievements`
--

DROP TABLE IF EXISTS `achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `achievements` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `score` mediumtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achievements`
--

LOCK TABLES `achievements` WRITE;
/*!40000 ALTER TABLE `achievements` DISABLE KEYS */;
INSERT INTO `achievements` VALUES (1,'업적1','100','2018-01-16 06:36:09'),(2,'업적2','90','2018-01-16 06:36:09'),(3,'업적3','80','2018-01-16 06:36:09'),(4,'업적4','70','2018-01-16 06:36:09'),(5,'업적5','60','2018-01-16 06:36:09');
/*!40000 ALTER TABLE `achievements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boards`
--

DROP TABLE IF EXISTS `boards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boards` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `contents` varchar(225) NOT NULL,
  `users_idx` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),
  KEY `fk_boards_1_idx` (`users_idx`),
  CONSTRAINT `fk_boards_1` FOREIGN KEY (`users_idx`) REFERENCES `users` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boards`
--

LOCK TABLES `boards` WRITE;
/*!40000 ALTER TABLE `boards` DISABLE KEYS */;
INSERT INTO `boards` VALUES (1,'제목1','내용1',1,'2018-01-16 06:36:09'),(2,'제목2','내용2',1,'2018-01-16 06:36:09'),(3,'제목3','내용3',2,'2018-01-16 06:36:09'),(4,'제목4','내용4',3,'2018-01-16 06:36:09'),(5,'제목5','내용5',4,'2018-01-16 06:36:09');
/*!40000 ALTER TABLE `boards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `contents` varchar(225) NOT NULL,
  `users_idx` int(11) NOT NULL,
  `boards_idx` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),
  KEY `fk_comments_1_idx` (`users_idx`),
  KEY `fk_comments_2_idx` (`boards_idx`),
  CONSTRAINT `fk_comments_1` FOREIGN KEY (`users_idx`) REFERENCES `users` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_comments_2` FOREIGN KEY (`boards_idx`) REFERENCES `boards` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'댓글 내용 1',1,1,'2018-01-16 06:36:09'),(2,'댓글 내용 2',1,1,'2018-01-16 06:36:09'),(3,'댓글 내용 3',2,2,'2018-01-16 06:36:09'),(4,'댓글 내용 4',3,4,'2018-01-16 06:36:09'),(5,'댓글 내용 5',4,5,'2018-01-16 06:36:09');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conversations` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `users_idx_1` int(11) NOT NULL,
  `users_idx_2` int(11) NOT NULL,
  `last_message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),
  KEY `fk_conversations_1_idx` (`users_idx_1`),
  KEY `fk_conversations_2_idx` (`users_idx_2`),
  CONSTRAINT `fk_conversations_1` FOREIGN KEY (`users_idx_1`) REFERENCES `users` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_conversations_2` FOREIGN KEY (`users_idx_2`) REFERENCES `users` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friends` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `flag` tinyint(4) NOT NULL DEFAULT '0',
  `sender_idx` int(11) NOT NULL,
  `receiver_idx` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),
  KEY `fk_friends_1_idx` (`sender_idx`),
  KEY `fk_friends_2_idx` (`receiver_idx`),
  CONSTRAINT `fk_friends_1` FOREIGN KEY (`sender_idx`) REFERENCES `users` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_friends_2` FOREIGN KEY (`receiver_idx`) REFERENCES `users` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES (1,0,1,2,'2018-01-16 06:36:09'),(2,1,2,3,'2018-01-16 06:36:09'),(3,0,1,3,'2018-01-16 06:36:09'),(4,1,3,5,'2018-01-16 06:36:09'),(5,1,4,5,'2018-01-16 06:36:09'),(6,0,7,1,'2018-01-22 08:11:39'),(7,0,7,2,'2018-01-22 08:21:11'),(8,0,7,3,'2018-01-22 08:23:33'),(9,2,5,7,'2018-01-22 10:48:34'),(10,1,6,7,'2018-01-22 10:48:39');
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_result`
--

DROP TABLE IF EXISTS `game_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_result` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `data` varchar(225) NOT NULL,
  `games_idx` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),
  KEY `fk_game_result_1_idx` (`games_idx`),
  CONSTRAINT `fk_game_result_1` FOREIGN KEY (`games_idx`) REFERENCES `games` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_result`
--

LOCK TABLES `game_result` WRITE;
/*!40000 ALTER TABLE `game_result` DISABLE KEYS */;
INSERT INTO `game_result` VALUES (1,'data',1,'2018-01-16 06:36:09'),(2,'data',1,'2018-01-16 06:36:09'),(3,'data',1,'2018-01-16 06:36:09'),(4,'data',2,'2018-01-16 06:36:09'),(5,'data',5,'2018-01-16 06:36:09');
/*!40000 ALTER TABLE `game_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `games` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(225) NOT NULL,
  `genre` varchar(45) NOT NULL,
  `image` varchar(225) NOT NULL,
  `flag` tinyint(4) NOT NULL,
  `users_idx` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),
  KEY `fk_games_1_idx` (`users_idx`),
  CONSTRAINT `fk_games_1` FOREIGN KEY (`users_idx`) REFERENCES `users` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'title1','description1','FPS','https://order.goobne.co.kr:8481//Upload/menu//%EA%B5%BD%EB%84%A4%EC%96%91%EB%85%90_L_01.png',1,1,'2018-01-16 06:36:09'),(2,'title2','description2','AOS','https://order.goobne.co.kr:8481//Upload/menu//%EA%B5%BD%EB%84%A4%EA%B3%A0%EC%B6%94%EB%B0%94%EC%82%AC%EC%82%AD_L_01.png',1,2,'2018-01-16 06:36:09'),(3,'title3','description3','RPG','https://order.goobne.co.kr:8481//Upload/menu//101030414.png',1,3,'2018-01-16 06:36:09'),(4,'title4','description4','FPS','https://order.goobne.co.kr:8481//Upload/menu//%EA%B5%BD%EB%84%A4%EB%B3%BC%EC%BC%80%EC%9D%B4%EB%85%B8%EC%8C%80%EB%96%A1%EB%B3%B6%EC%9D%B4_L_01.jpg',0,4,'2018-01-16 06:36:09'),(5,'title5','description5','AOS','https://order.goobne.co.kr:8481//Upload/menu//%EA%B5%BD%EB%84%A4%EC%98%A4%EB%A6%AC%EC%A7%80%EB%84%90%EC%B9%98%ED%82%A8_L_01.png',0,5,'2018-01-16 06:36:09');
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `contents` text NOT NULL,
  `sender_idx` int(11) NOT NULL,
  `receiver_idx` int(11) NOT NULL,
  `conversation_idx` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),
  KEY `fk_messages_1_idx` (`sender_idx`),
  KEY `fk_messages_2_idx` (`receiver_idx`),
  KEY `fk_messages_3_idx` (`conversation_idx`),
  CONSTRAINT `fk_messages_1` FOREIGN KEY (`sender_idx`) REFERENCES `users` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_2` FOREIGN KEY (`receiver_idx`) REFERENCES `users` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_3` FOREIGN KEY (`conversation_idx`) REFERENCES `conversations` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `users_idx` int(11) NOT NULL,
  `contents` varchar(225) NOT NULL,
  `url` varchar(225) NOT NULL,
  `flag` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),
  KEY `fk_notifications_1_idx` (`users_idx`),
  CONSTRAINT `fk_notifications_1` FOREIGN KEY (`users_idx`) REFERENCES `users` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,1,'알림 내용1','http://www.naver.com',0,'2018-01-16 06:53:37'),(2,1,'알림 내용2','http://www.facebook.com',0,'2018-01-16 06:53:37'),(3,2,'알림 내용3','http://www.nate.com',0,'2018-01-16 06:53:37'),(4,3,'알림 내용4','http://www.naver.com',0,'2018-01-16 06:53:37'),(5,4,'알림 내용5','http://www.naver.com',0,'2018-01-16 06:53:37'),(6,1,'g','http://www.naver.com',0,'2018-01-19 02:19:30'),(7,1,'asdf','http://www.naver.com',0,'2018-01-19 02:21:57'),(8,1,'gggggggggggggggggg','http://www.naver.com',0,'2018-01-19 02:25:53'),(9,1,'gggggggggggggggggg','http://www.naver.com',0,'2018-01-19 04:26:34'),(10,1,'fasdfasdf','http://www.naver.com',0,'2018-01-19 04:27:17'),(11,1,'z','http://www.naver.com',0,'2018-01-19 04:30:37'),(12,1,'zz','http://www.naver.com',0,'2018-01-19 04:31:11'),(13,1,'asdf','http://www.naver.com',0,'2018-01-19 04:31:42'),(14,1,'1234','http://www.naver.com',0,'2018-01-19 04:32:19'),(15,1,'11','http://www.naver.com',0,'2018-01-19 04:32:39'),(16,1,'1234','http://www.naver.com',0,'2018-01-19 04:33:18'),(17,1,'11','http://www.naver.com',0,'2018-01-19 04:33:51'),(18,1,'1234123512342134','http://www.naver.com',0,'2018-01-19 04:38:24'),(19,1,'sdfasdfdsadasasad','http://www.naver.com',0,'2018-01-19 04:38:58'),(20,1,'41234213412341234123','http://www.naver.com',0,'2018-01-19 04:40:08'),(21,1,'ㅎㅎㅎㅎ','http://www.naver.com',0,'2018-01-19 04:44:06'),(22,1,'ㅋㅎㅋㅎㅋㅎ','http://www.naver.com',0,'2018-01-19 07:20:52'),(23,1,'adfasdf','http://www.naver.com',0,'2018-01-19 07:36:21'),(24,1,'adfasdf22222222','http://www.naver.com',0,'2018-01-19 07:38:00');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(45) NOT NULL,
  `pw` varchar(50) NOT NULL,
  `nickname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `avatar` varchar(225) DEFAULT NULL,
  `salt` varchar(8) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'id1','password','user1','email1@test.com',NULL,'asdf','2018-01-16 06:36:09'),(2,'id2','password','user2','email2@test.com',NULL,'asdf','2018-01-16 06:36:09'),(3,'id3','password','user3','email3@test.com',NULL,'asdf','2018-01-16 06:36:09'),(4,'id4','password','user4','email4@test.com',NULL,'asdf','2018-01-16 06:36:09'),(5,'id5','password','user5','email5@test.com',NULL,'asdf','2018-01-16 06:36:09'),(6,'asdf','asdf','asdf','asdf',NULL,'asdf','2018-01-16 06:44:50'),(7,'3457soso','6797d5795be43bbdb0a346ef96f506300da3032a4488ce4b','kong','3457soso@naver.com',NULL,'BSnfudXL','2018-01-22 06:31:17');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_has_achievements`
--

DROP TABLE IF EXISTS `users_has_achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_has_achievements` (
  `idx` int(11) NOT NULL AUTO_INCREMENT,
  `users_idx` int(11) NOT NULL,
  `achievements_idx` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),
  KEY `fk_users_has_achievements_1_idx` (`users_idx`),
  KEY `fk_users_has_achievements_2_idx` (`achievements_idx`),
  CONSTRAINT `fk_users_has_achievements_1` FOREIGN KEY (`users_idx`) REFERENCES `users` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_achievements_2` FOREIGN KEY (`achievements_idx`) REFERENCES `achievements` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_has_achievements`
--

LOCK TABLES `users_has_achievements` WRITE;
/*!40000 ALTER TABLE `users_has_achievements` DISABLE KEYS */;
INSERT INTO `users_has_achievements` VALUES (1,1,1,'2018-01-16 06:36:09'),(2,1,2,'2018-01-16 06:36:09'),(3,1,3,'2018-01-16 06:36:09'),(4,2,1,'2018-01-16 06:36:09'),(5,2,5,'2018-01-16 06:36:09');
/*!40000 ALTER TABLE `users_has_achievements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_has_games`
--

DROP TABLE IF EXISTS `users_has_games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_has_games` (
  `idx` int(11) NOT NULL,
  `users_idx` int(11) NOT NULL,
  `games_idx` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),
  KEY `fk_users_has_games_1_idx` (`users_idx`),
  KEY `fk_users_has_games_2_idx` (`games_idx`),
  CONSTRAINT `fk_users_has_games_1` FOREIGN KEY (`users_idx`) REFERENCES `users` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_games_2` FOREIGN KEY (`games_idx`) REFERENCES `games` (`idx`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_has_games`
--

LOCK TABLES `users_has_games` WRITE;
/*!40000 ALTER TABLE `users_has_games` DISABLE KEYS */;
INSERT INTO `users_has_games` VALUES (1,2,1,'2018-01-16 06:36:09'),(2,2,3,'2018-01-16 06:36:09'),(3,3,1,'2018-01-16 06:36:09'),(4,4,1,'2018-01-16 06:36:09'),(5,5,2,'2018-01-16 06:36:09');
/*!40000 ALTER TABLE `users_has_games` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-23 14:45:35
