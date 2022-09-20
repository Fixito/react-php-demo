## Créer la BDD test

```SQL
CREATE DATABASE People DEFAULT CHARACTER SET utf8;
```

## Créer la table Users

```SQL
CREATE TABLE `users` (
`user_id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
```
