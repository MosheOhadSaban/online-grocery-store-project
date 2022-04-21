-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: supermarket
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `carts_items`
--

DROP TABLE IF EXISTS `carts_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `quantity_price` int NOT NULL,
  `products_id` int NOT NULL,
  `shopping_carts_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_carts_details_products1_idx` (`products_id`),
  KEY `fk_carts_details_shopping_carts1_idx` (`shopping_carts_id`),
  CONSTRAINT `fk_carts_details_products1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`),
  CONSTRAINT `fk_carts_details_shopping_carts1` FOREIGN KEY (`shopping_carts_id`) REFERENCES `shopping_carts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=450 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts_items`
--

LOCK TABLES `carts_items` WRITE;
/*!40000 ALTER TABLE `carts_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL,
  `total_price` int NOT NULL,
  `delivery_city` varchar(45) NOT NULL,
  `delivery_street` varchar(45) NOT NULL,
  `delivery_date` varchar(45) NOT NULL,
  `order_date` varchar(45) NOT NULL,
  `shopping_carts_id` int NOT NULL,
  `users_id` int NOT NULL,
  `credit_card_last_four_digits` varchar(45) NOT NULL,
  `record_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_orders_shopping_carts1_idx` (`shopping_carts_id`),
  KEY `fk_orders_users1_idx` (`users_id`),
  CONSTRAINT `fk_orders_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (599726,233,'Jerusalem','geulim 4','26-03-2022','Thu Mar 17 2022',74982,305434300,'4556','2022-03-17 17:13:19');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` int NOT NULL,
  `img_path` longtext,
  `amount` float DEFAULT NULL,
  `unit_measurement` varchar(45) NOT NULL,
  `products_categories_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_products_products_categories1_idx` (`products_categories_id`),
  CONSTRAINT `fk_products_products_categories1` FOREIGN KEY (`products_categories_id`) REFERENCES `products_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Kiwi',25,'http://127.0.0.1:8081/kiwi.jpg',1,'kg',4),(2,'Apple',12,'http://127.0.0.1:8081/greenapple.webp',1,'kg',2),(3,'Green Pear',17,'http://127.0.0.1:8081/green_pear.webp',1,'kg',8),(4,'3% Milk Tnuva ',11,'http://127.0.0.1:8081/1.5lmilktnuva.webp',1.5,'liter',2),(5,'Yoplait Yogurt 0% Berries',7,'http://127.0.0.1:8081/yoplait0_berries.webp',100,'g',2),(6,'Carrots',10,'http://127.0.0.1:8081/Carrots.webp',1,'kg',3),(7,'Vegan Mazola Margarine',13,'http://127.0.0.1:8081/veganfriendlymazolamargarine250g.webp',250,'g',2),(8,'Danone Bio Yogurt 0%',5,'http://127.0.0.1:8081/danonebioyogurt0.webp',200,'g',2),(9,'Yoplait Yogurt Strawberry',7,'http://127.0.0.1:8081/yoplaitcheesecake3.webp',150,'g',2),(10,'Banana Milk Yotvata',8,'http://127.0.0.1:8081/bananamilkdrink.webp',250,'ml',2),(11,'Danone Bar Yogurt Pecan Choco Balls',7,'http://127.0.0.1:8081/yogurtwithpecansdanone.webp',183,'g',2),(12,'Red Pepper',14,'http://127.0.0.1:8081/RedPepper.webp',1,'kg',3),(13,'Cucumber',9,'http://127.0.0.1:8081/Cucumbers.webp',1,'kg',3),(14,'Purple (Red) Onion',8,'http://127.0.0.1:8081/PurpleRedOnion.webp',1,'kg',3),(15,'Tomato',10,'http://127.0.0.1:8081/tomato1.webp',1,'kg',3),(16,'Eggplant',7,'http://127.0.0.1:8081/eggplant.webp',1,'kg',3),(17,'Berman Bread Buns',13,'http://127.0.0.1:8081/bermanbuns6x75g.webp',450,'g',4),(18,'Home Style Fresh Pitas',17,'http://127.0.0.1:8081/homestylepitas10pack.webp',1,'kg',4),(19,'Frozen Greek Cheese Tiropita',26,'http://127.0.0.1:8081/greektiropita.webp',400,'g',4),(20,'Coca-Cola - 1.5 liter',11,'http://127.0.0.1:8081/cocacola.webp',1.5,'liter',5),(21,'Sprite Zero - 1.5 liter',11,'http://127.0.0.1:8081/spritezero.webp',1.5,'liter',5),(22,'Pepsi - 1.5 liter',10,'http://127.0.0.1:8081/pepsi.webp',1.5,'liter',5),(23,'Minced Ground Beef Meat',40,'http://127.0.0.1:8081/mincedbeef.webp',1,'kg',6),(24,'Frozen Black Angus Beef Carpaccio',25,'http://127.0.0.1:8081/frozenblackangusbeefcarpaccio.webp',120,'g',6),(25,'Frozen Hamburgers Burgers',52,'http://127.0.0.1:8081/burgerfrozen.webp',640,'g',6),(26,'Osem Bageleh Gluten-Free Pretzels',14,'http://127.0.0.1:8081/osemGluten-freepretzels.webp',300,'g',7),(27,'Chocolate Covered Pretzels',12,'http://127.0.0.1:8081/chocolatecoveredpretzels.webp',140,'g',7),(28,'Banana',13,'http://127.0.0.1:8081/Banana.webp',1,'kg',8),(29,'Lemon',10,'data:image/webp;base64,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',1,'kg',8),(30,'Frozen Hamburgers',29,'http://127.0.0.1:8081/elgauchoburgers_360x.webp',360,'g',6);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_categories`
--

DROP TABLE IF EXISTS `products_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_categories`
--

LOCK TABLES `products_categories` WRITE;
/*!40000 ALTER TABLE `products_categories` DISABLE KEYS */;
INSERT INTO `products_categories` VALUES (1,'All'),(2,'Dairy Products'),(3,'Vegetables'),(4,'Bakery & Bread'),(5,'Beverage & Drinks'),(6,'Meat'),(7,'Snacks'),(8,'Fruits');
/*!40000 ALTER TABLE `products_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_carts`
--

DROP TABLE IF EXISTS `shopping_carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_carts` (
  `id` int unsigned NOT NULL,
  `cart_date` varchar(45) DEFAULT NULL,
  `users_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_shopping_carts_users1_idx` (`users_id`),
  CONSTRAINT `fk_shopping_carts_users1` FOREIGN KEY (`users_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_carts`
--

LOCK TABLES `shopping_carts` WRITE;
/*!40000 ALTER TABLE `shopping_carts` DISABLE KEYS */;
INSERT INTO `shopping_carts` VALUES (74982,'Thu Mar 17 2022',305434300),(576951,'Thu Mar 17 2022',234324234);
/*!40000 ALTER TABLE `shopping_carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `street` varchar(45) NOT NULL,
  `user_type` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (234324234,'admin','admin','admin@admin.net','ac20839ab9e90a5362a0ed9d6b6b743d','none','none','ADMIN'),(305434300,'moshe','saban','moshe.ohad_saban@hotmail.com','ac20839ab9e90a5362a0ed9d6b6b743d','Jerusalem','geulim 4','CUSTOMER');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-17 19:23:27
