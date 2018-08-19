

DROP TABLE IF EXISTS `albums`;

 CREATE TABLE `albums` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(100) NOT NULL,
  `albumName` varchar(100) NOT NULL,
  `albumDes` varchar(100) NOT NULL,
  `pic` varchar(100),
  `songNum` int(3) NOT NULL DEFAULT '0',
  `stars` int(11) NOT NULL DEFAULT '0',
  `creator` varchar(100) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `songs`;

 CREATE TABLE `songs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `songId` int(50) NOT NULL,
  `songName` varchar(100) NOT NULL,
  `songAuthor` varchar(100) NOT NULL,
  `pic` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `albumsongs`;

 CREATE TABLE `albumsongs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `songId` int(50) NOT NULL,
  `useralbumId` int(50) NOT NULL,
  `openId` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


 CREATE TABLE `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `songId` int(50) NOT NULL,
  `openId` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

  -- `likeStatus` int(1) NOT NULL  DEFAULT '0',
  -- `songIndex`int(11) NOT NULL, //后面再加这个功能


