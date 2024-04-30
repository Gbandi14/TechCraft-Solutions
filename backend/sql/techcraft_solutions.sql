-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Ápr 30. 17:45
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `techcraft_solutions`
--
CREATE DATABASE IF NOT EXISTS `techcraft_solutions` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `techcraft_solutions`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `categories`
--

CREATE TABLE `categories` (
  `ID` int(11) NOT NULL,
  `Title` varchar(512) NOT NULL,
  `Text` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `categories`
--

INSERT INTO `categories` (`ID`, `Title`, `Text`) VALUES
(1, 'Gépészeti tervezés és műszaki tanácsadás', 'Gépészeti tervezés és műszaki tanácsadás olyan szakterület, amely a gépek és mechanikus rendszerek tervezésével, fejlesztésével és optimalizálásával foglalkozik. Ennek a területnek az a célja, hogy hatékony és megbízható gépeket tervezzen és hozzon létre különböző ipari és üzleti alkalmazásokhoz. A gépészeti tervezők és tanácsadók részt vesznek a gépek tervezésének minden folyamatában, kezdve az ötleteléstől és a tervezéstől egészen a prototípusok készítéséig és a gyártási folyamat támogatásáig. Ezek a szakemberek széles körű tudással rendelkeznek a mechanikus mérnöki alapelvekről, anyagokról és folyamatokról, valamint a legfrissebb technológiai fejlesztésekről. A gépészeti tervezés és műszaki tanácsadás kulcsszerepet játszik az ipari innovációban és a hatékony gépészeti rendszerek fejlesztésében a modern gazdaságban.'),
(2, 'Webfejlesztés', 'A webfejlesztés a dinamikus és interaktív webalkalmazások, valamint weboldalak létrehozásának folyamata. A fejlesztés során a tervezéstől kezdve a kódoláson és tesztelésen át egészen a bevezetésig számos lépést tartalmaz. A webfejlesztők különböző eszközöket és technológiákat használnak, beleértve az HTML-t, CSS-t, JavaScriptet és különböző keretrendszereket. A cél az, hogy vonzó, könnyen használható és hatékony webes felületeket hozzanak létre, ami kulcsfontosságú a vállalkozások online jelenlétében és sikerében.'),
(3, 'Szoftverfejlesztés', 'A szoftverfejlesztés a szoftverek tervezésének, kódolásának és tesztelésének folyamata, amelynek célja funkcionális és hatékony programok létrehozása. A fejlesztés során a szoftvermérnökök és fejlesztők tervezik és implementálják a különböző funkcionalitásokat és megoldásokat. A szoftverfejlesztés folyamata általában több lépésből áll, beleértve az igényfelmérést, tervezést, implementációt, tesztelést és karbantartást. A szoftverfejlesztők különböző programozási nyelveket és eszközöket használnak, mint például a Java, Python, C++ vagy JavaScript. A szoftverfejlesztés kulcsfontosságú szerepet játszik a modern informatikai iparágban, segítve az üzleti folyamatok hatékonyabbá tételét és az ügyfélélmény javítását.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `offer`
--

CREATE TABLE `offer` (
  `UserID` int(11) NOT NULL,
  `ServiceID` int(11) NOT NULL,
  `Description` varchar(512) NOT NULL,
  `Type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rating`
--

CREATE TABLE `rating` (
  `UserID` int(11) NOT NULL,
  `ReferenceID` int(11) NOT NULL,
  `Score` int(11) NOT NULL,
  `Text` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `references`
--

CREATE TABLE `references` (
  `ID` int(11) NOT NULL,
  `Image` varchar(256) NOT NULL,
  `Title` varchar(256) NOT NULL,
  `Text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `services`
--

CREATE TABLE `services` (
  `ID` int(11) NOT NULL,
  `Title` varchar(256) NOT NULL,
  `Description` varchar(512) NOT NULL,
  `CategoryID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Username` varchar(256) NOT NULL,
  `CompanyName` varchar(256) DEFAULT NULL,
  `Firstname` varchar(256) NOT NULL,
  `Lastname` varchar(256) NOT NULL,
  `PhoneNumber` varchar(16) DEFAULT NULL,
  `Email` varchar(256) NOT NULL,
  `Password` varchar(256) NOT NULL,
  `ProfilePicture` varchar(256) NOT NULL,
  `Rank` smallint(6) NOT NULL,
  `VerifyToken` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`ID`, `Username`, `CompanyName`, `Firstname`, `Lastname`, `PhoneNumber`, `Email`, `Password`, `ProfilePicture`, `Rank`, `VerifyToken`) VALUES
(1, 'rg', 'TechCraft Solutions Kft.', 'rg', 'rg', '', 'rg@tcs.hu', '$2b$08$qRHyBRBIhl30jeLD.ae94eSvGgi1xkPj0uanvIDPODju2HCK4HjRO', 'https://i.postimg.cc/SK2TYrVV/Profilepic.png', 3, '');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `offer`
--
ALTER TABLE `offer`
  ADD KEY `UserID` (`UserID`),
  ADD KEY `ServiceID` (`ServiceID`);

--
-- A tábla indexei `rating`
--
ALTER TABLE `rating`
  ADD KEY `ReferenceID` (`ReferenceID`),
  ADD KEY `UserID` (`UserID`);

--
-- A tábla indexei `references`
--
ALTER TABLE `references`
  ADD PRIMARY KEY (`ID`);

--
-- A tábla indexei `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CategoryID` (`CategoryID`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `categories`
--
ALTER TABLE `categories`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `references`
--
ALTER TABLE `references`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT a táblához `services`
--
ALTER TABLE `services`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `offer`
--
ALTER TABLE `offer`
  ADD CONSTRAINT `offer_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `offer_ibfk_2` FOREIGN KEY (`ServiceID`) REFERENCES `services` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`ReferenceID`) REFERENCES `references` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_ibfk_1` FOREIGN KEY (`CategoryID`) REFERENCES `categories` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
