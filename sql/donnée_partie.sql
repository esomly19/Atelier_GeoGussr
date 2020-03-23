
INSERT INTO `serie` (`ville`,`map_refs`,`dist`)
VALUES
('Nancy','{"positionX":48.6890,"positionY":6.1738,"zoom":13}',50),
('Nancy','{"positionX":48.6890,"positionY":6.1738,"zoom":13}',100),
('Nancy','{"positionX":48.6890,"positionY":6.1738,"zoom":13}',250),
('Nancy','{"positionX":48.6890,"positionY":6.1738,"zoom":13}',500);

INSERT INTO `photo` (`desc`,`positionX`,`positionY`,`url`)
VALUES
('Place Stanislas',48.69350,6.18328,'NULL'),
('Place Saint-Epvre',48.69632,6.17922,'NULL'),
('Porte Stanislas',48.69111,6.17543,'NULL'),
('Gare (Statut des Coeurs)',48.688982,6.175579,'NULL'),
('Viaduc Kennedy (Métropole du grand Nancy)',48.686137,6.174943,'NULL'),
('IUT Nancy Charlemagne',48.683124,6.161126,'NULL'),
('parc Sainte-Marie',48.680668,6.170788,'NULL'),
('Boulevard d austrasie (L autre Canal)',48.694061,6.198157,'NULL'),
('Boulevard Jean Jaurès (caisse d épargne)',48.681087,6.176793,'NULL'),
('Place Charles III',48.689076,6.181556,'NULL');

INSERT INTO `serie_photo` (`id_serie`,`id_photo`)
VALUES
('1','1'),
('1','2'),
('1','3'),
('1','4'),
('1','5'),
('1','6'),
('1','7'),
('1','8'),
('1','9'),
('1','10'),
('2','1'),
('2','2'),
('2','3'),
('2','4'),
('2','5'),
('2','6'),
('2','7'),
('2','8'),
('2','9'),
('2','10'),
('3','1'),
('3','2'),
('3','3'),
('3','4'),
('3','5'),
('3','6'),
('3','7'),
('3','8'),
('3','9'),
('3','10'),
('4','1'),
('4','2'),
('4','3'),
('4','4'),
('4','5'),
('4','6'),
('4','7'),
('4','8'),
('4','9'),
('4','10');


INSERT INTO `utilisateur` (`email`,`password`)
VALUES
('admin','$2y$10$SgqINto.4DDHqHTsHVOxqONUTWDnvKTxxFf9gYa4Ewnv2mph/Sxim'),
('mobileman@gmail.com','$2y$10$ThBunj.Zk1EYbVr7BQPKku1THP60Bxo1PQwH04Fy7McWLXS86nqf.');