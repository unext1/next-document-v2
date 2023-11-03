-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`author` varchar(255),
	`title` varchar(255),
	`content` text,
	`createdAt` timestamp,
	`deleted` tinyint,
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);

*/