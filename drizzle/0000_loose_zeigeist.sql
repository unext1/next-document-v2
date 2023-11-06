CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(255),
	`password` varchar(255),
	`created_at` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
