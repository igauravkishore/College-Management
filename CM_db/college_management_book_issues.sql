-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: college_management
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book_issues`
--

DROP TABLE IF EXISTS `book_issues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_issues` (
  `issueId` int NOT NULL AUTO_INCREMENT,
  `memberId` int NOT NULL,
  `bookId` int NOT NULL,
  `issueDate` date NOT NULL,
  `dueDate` date DEFAULT NULL,
  `returnDate` date DEFAULT NULL,
  PRIMARY KEY (`issueId`),
  KEY `bookId` (`bookId`),
  KEY `FK_member` (`memberId`),
  CONSTRAINT `book_issues_ibfk_1` FOREIGN KEY (`memberId`) REFERENCES `members` (`memberId`),
  CONSTRAINT `book_issues_ibfk_2` FOREIGN KEY (`bookId`) REFERENCES `books` (`bookId`),
  CONSTRAINT `FK_member` FOREIGN KEY (`memberId`) REFERENCES `members` (`memberId`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_issues`
--

LOCK TABLES `book_issues` WRITE;
/*!40000 ALTER TABLE `book_issues` DISABLE KEYS */;
INSERT INTO `book_issues` VALUES (2,2,2,'2024-02-01',NULL,'2024-02-15'),(4,4,4,'2024-04-01',NULL,'2024-04-15'),(5,5,5,'2024-05-01',NULL,'2024-05-15'),(8,2,1,'2024-06-01',NULL,'2024-06-15'),(18,2,2,'2024-06-01',NULL,'2024-06-15'),(19,2,2,'2024-06-01','2024-06-16','2024-06-15'),(20,2,4,'2024-06-01','2024-06-16','2024-06-15'),(22,5,5,'2024-06-01','2024-06-16',NULL);
/*!40000 ALTER TABLE `book_issues` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-21 12:01:04
