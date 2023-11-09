CREATE TABLE `documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255),
	`content` text,
	`created_at` timestamp,
	`updated_at` timestamp,
	`is_public` tinyint NOT NULL DEFAULT 0,
	`user_id` int NOT NULL,
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);
