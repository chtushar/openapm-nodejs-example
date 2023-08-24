CREATE DATABASE IF NOT EXISTS order_sevice;

use order_sevice;

CREATE TABLE IF NOT EXISTS `Orders` (
	`id` int NOT NULL AUTO_INCREMENT,
	`customerName` varchar(255) NOT NULL,
	`product` varchar(255) NOT NULL,
	`quantity` int NOT NULL,
	`createdAt` datetime NOT NULL,
	`updatedAt` datetime NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE InnoDB,
  CHARSET utf8mb4,
  COLLATE utf8mb4_0900_ai_ci;