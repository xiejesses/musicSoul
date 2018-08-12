
-- show create table books 

DROP TABLE IF EXISTS `books`;

 CREATE TABLE `albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(100) NOT NULL,
  `albumName` varchar(100) NOT NULL,
  `albumDes` varchar(100) NOT NULL,
  `songNum` int(3) NOT NULL DEFAULT '0',
  `stars` int(11) NOT NULL DEFAULT '0',
  `creator` varchar(100) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(100) NOT NULL,
  `bookid` varchar(100) NOT NULL,
  `comment` varchar(200) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `location` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

