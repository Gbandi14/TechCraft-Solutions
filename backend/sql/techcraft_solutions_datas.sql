-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Máj 03. 17:58
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

--
-- A tábla adatainak kiíratása `offer`
--

INSERT INTO `offer` (`UserID`, `ServiceID`, `Description`, `Type`) VALUES
(3, 15, 'Kedves TechCraft Solutions! \nÉrdeklődöm a mechatronikai rendszerek tervezése és optimalizálása iránti szolgáltatásotok iránt. Szeretném kérni, hogy küldjetek részletes információt arról, hogy hogyan tudnátok segíteni az általam tervezett projektekben, és milyen módon tudnátok maximalizálni a modern technológia által nyújtott lehetőségeket. Köszönöm! \nÜdvözlettel: Kovács Júlia', 2),
(3, 21, 'Kedves TechCraft Solutions, \n\nSzeretnék érdeklődni a webalkalmazás fejlesztésével kapcsolatban. Olyan egyedi megoldásokra van szükségem, amelyek lehetővé teszik üzleti folyamataim hatékonyabb kezelését. Kérem, küldjenek részletes információt arról, hogy hogyan tudnátok segíteni az alkalmazás fejlesztésében és implementálásában, valamint hogy milyen módon lehetne az a legjobban integrálni a jelenlegi rendszerembe. Köszönöm! \n\nÜdvözlettel,\nKovács Júlia', 1),
(3, 24, 'Kedves TechCraft Solutions,\n\nSzeretnék érdeklődni a mobilalkalmazás fejlesztési szolgáltatásaitok iránt. Konkrétan egy egészségügyi alkalmazást tervezek fejleszteni mind iOS, mind Android platformra, amely segítene felhasználóknak nyomon követni egészségügyi állapotukat és céljaikat. Kérem, küldjetek részletes ajánlatot arról, hogy hogyan tudnátok segíteni az alkalmazás tervezésében és fejlesztésében, valamint milyen lépéseket foglalna magában a folyamat és milyen költségekkel járna. Köszönöm!\n\nÜdvözlettel,', 1);

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

--
-- A tábla adatainak kiíratása `rating`
--

INSERT INTO `rating` (`UserID`, `ReferenceID`, `Score`, `Text`) VALUES
(1, 10, 5, 'Nagyon elégedett voltam a szolgáltatással, gyors és pontos munkát végeztek.'),
(2, 10, 5, 'Teljes mértékben meg vagyok elégedve, minden szempontból kiváló volt.'),
(3, 10, 4, 'Kicsit hosszabb volt a várakozási idő, de a végeredménnyel elégedett vagyok.'),
(1, 11, 4, 'Átlagos élmény volt, de van hova fejlődni.'),
(2, 11, 5, 'Kicsit több kommunikációra lenne szükség, de összességében elégedett vagyok.'),
(3, 11, 3, 'A kiszállítás késve érkezett, ami kicsit bosszantó volt.'),
(1, 12, 5, 'Kiváló referenciát kaptam, köszönöm!'),
(2, 12, 5, 'Nagyon elégedett vagyok a kapott szolgáltatással, minden tökéletesen ment.'),
(3, 12, 5, 'Kis hiba volt az egyik dokumentációban, de gyorsan orvosolták.'),
(1, 13, 3, 'Sajnos nem voltam elégedett a szolgáltatással, vártam volna jobb eredményt.'),
(2, 13, 4, 'Nem lett teljesen elégedett az eredménnyel, de elfogadható volt.'),
(3, 13, 2, 'Sok hibát találtam az eredményben, elégedetlen vagyok.'),
(1, 14, 2, 'Nem ajánlanám senkinek, csalódott vagyok az eredményben.'),
(2, 14, 3, 'Kicsit kevésbé voltak profik, mint vártam.'),
(3, 14, 2, 'Sajnos nagyobb elvárásaim voltak, nem feleltek meg.'),
(1, 11, 5, 'Nagyon elégedett voltam a termék minőségével.'),
(2, 12, 4, 'Kicsit hosszabb ideig tartott, mint vártam, de megérte a várakozást.'),
(3, 13, 3, 'Sajnos nem felelt meg az elvárásaimnak.'),
(2, 10, 5, 'Az ügyfélszolgálat nagyon segítőkész volt, köszönöm!'),
(3, 14, 4, 'Nagyon csalódtam az eredményben, többet vártam.'),
(1, 12, 5, 'Kiváló munkát végeztek, elégedett vagyok a szolgáltatással.'),
(2, 13, 2, 'Nem voltam elégedett a végeredménnyel, sok hiba volt benne.'),
(1, 10, 4, 'Az ár-érték arány kicsit rosszabb volt, mint vártam.'),
(2, 14, 3, 'A szállítás késve érkezett, ami kicsit zavart.'),
(3, 11, 5, 'Az általam várt eredménnyel teljes mértékben elégedett vagyok.'),
(1, 12, 5, 'Nagyon profi volt a munkájuk, csak ajánlani tudom őket.'),
(2, 14, 2, 'Sajnos több hibát találtam az eredményben, mint gondoltam volna.'),
(1, 13, 4, 'Közepes minőségű szolgáltatás, de elfogadható áron.'),
(2, 11, 3, 'Nem voltam annyira elégedett az eredménnyel, mint reméltem.'),
(3, 10, 5, 'Meg vagyok elégedve az általam kapott segítséggel.'),
(3, 14, 5, 'Nagyon szép munkát kaptam! Elégedett vagyok. Legközelebb is a TechCraft Solutions Kft-hez fogok fordulni!'),
(3, 14, 4, 'Kicsit rosszabb minőségű adatbázis terveket kaptam mint vártam, de egyébként minden rendben volt!');

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

--
-- A tábla adatainak kiíratása `references`
--

INSERT INTO `references` (`ID`, `Image`, `Title`, `Text`) VALUES
(10, 'https://uniside.hu/wp-content/uploads/2023/04/mechatronikai-mernoki-123rf.jpg', 'Mechatronikai rendszerek tervezése referencia', '<h3>Mechatronikai rendszerek tervez&eacute;se</h3>\n<p>Ez a referencia munka bemutatja a mechatronikai rendszerek tervez&eacute;s&eacute;t &eacute;s implement&aacute;l&aacute;s&aacute;t. A projekt sor&aacute;n sikeresen optimaliz&aacute;ltuk a rendszert a hat&eacute;konys&aacute;g &eacute;s megb&iacute;zhat&oacute;s&aacute;g n&ouml;vel&eacute;se &eacute;rdek&eacute;ben.</p>\n<ul>\n<li>Komponensek kiv&aacute;laszt&aacute;sa &eacute;s integr&aacute;ci&oacute;ja</li>\n<li>Rendszermodellez&eacute;s &eacute;s szimul&aacute;ci&oacute;</li>\n<li>Protot&iacute;pus tesztel&eacute;se &eacute;s valid&aacute;ci&oacute;ja</li>\n</ul>'),
(11, 'https://doppio.hu/doppio_uploads/2019/07/reszponziv_weboldal.png', 'Reszponzív weboldal készítés referencia', '<h3>Reszponz&iacute;v weboldal k&eacute;sz&iacute;t&eacute;s</h3>\n<p>Ez a referencia munka bemutatja, hogyan tervezt&uuml;nk &eacute;s fejlesztett&uuml;nk egy reszponz&iacute;v weboldalt egy &uuml;gyfel&uuml;nk sz&aacute;m&aacute;ra. A projekt c&eacute;lja az volt, hogy egy modern &eacute;s felhaszn&aacute;l&oacute;bar&aacute;t fel&uuml;letet biztos&iacute;tsunk.</p>\n<ul>\n<li>Kreat&iacute;v webdesign tervez&eacute;se</li>\n<li>Mobilbar&aacute;t felhaszn&aacute;l&oacute;i &eacute;lm&eacute;ny biztos&iacute;t&aacute;sa</li>\n<li>SEO optimaliz&aacute;l&aacute;s</li>\n</ul>'),
(12, 'https://www.smart-gemit.com/wp-content/uploads/2023/06/StockSnap_486CHY0H1Q-1024x683.jpg', 'Egyedi szoftverfejlesztés referencia', '<h3>Egyedi szoftverfejleszt&eacute;s</h3>\n<p>Ez a referencia munka bemutatja az egyedi szoftverfejleszt&eacute;s folyamat&aacute;t &eacute;s eredm&eacute;nyeit. A projekt sor&aacute;n egyedi ig&eacute;nyekre szabott szoftvert fejlesztett&uuml;nk egy &uuml;gyfel&uuml;nk sz&aacute;m&aacute;ra, amely hat&eacute;konyan seg&iacute;tette az &uuml;zleti folyamatait.</p>\n<ul>\n<li>Felhaszn&aacute;l&oacute;i k&ouml;vetelm&eacute;nyek elemz&eacute;se</li>\n<li>Agilis fejleszt&eacute;si m&oacute;dszertan alkalmaz&aacute;sa</li>\n<li>Folyamatos visszajelz&eacute;s &eacute;s tesztel&eacute;s</li>\n</ul>'),
(13, 'https://bmsinformatika.hu/wp-content/uploads/vallatiranyitasi-rendszer-1280x853-1.webp', 'Gyártási folyamat optimalizálás referencia', '<h3>Gy&aacute;rt&aacute;si folyamat optimaliz&aacute;l&aacute;s</h3>\n<p>Ez a referencia munka bemutatja, hogyan seg&iacute;tett&uuml;nk egy gy&aacute;rt&aacute;si v&aacute;llalatnak optimaliz&aacute;lni a gy&aacute;rt&aacute;si folyamatait &eacute;s n&ouml;velni a termel&eacute;kenys&eacute;get. A projekt sor&aacute;n az &uuml;gyf&eacute;llel egy&uuml;ttműk&ouml;dve hat&eacute;konyabb m&oacute;dszereket &eacute;s technol&oacute;gi&aacute;kat vezett&uuml;nk be.</p>\n<ul>\n<li>Folyamat elemz&eacute;se &eacute;s tervez&eacute;se</li>\n<li>Automatiz&aacute;l&aacute;s bevezet&eacute;se</li>\n<li>Munkafolyamatok &aacute;tszervez&eacute;se &eacute;s jav&iacute;t&aacute;sa</li>\n</ul>'),
(14, 'https://media.istockphoto.com/id/1200717412/photo/database-structure-flow-chart-of-a-control-panel-of-web-site.jpg?s=612x612&w=0&k=20&c=SjYg9SrXkYVH5_KbdpaFe_RGpewnhUIrPudHUdP80xI=', 'Adatbázis tervezés és kezelés referencia', '<h3>Adatb&aacute;zis tervez&eacute;s &eacute;s kezel&eacute;s</h3>\n<p>Ez a referencia munka bemutatja, hogyan seg&iacute;tett&uuml;nk egy &uuml;gyfel&uuml;nknek az adatb&aacute;zis tervez&eacute;s&eacute;ben &eacute;s kezel&eacute;s&eacute;ben. A projekt sor&aacute;n biztos&iacute;tottuk az adatok hat&eacute;kony t&aacute;rol&aacute;s&aacute;t &eacute;s kezel&eacute;s&eacute;t az &uuml;gyf&eacute;l &uuml;zleti ig&eacute;nyeinek megfelelően.</p>\n<ul>\n<li>Adatmodell tervez&eacute;se &eacute;s valid&aacute;l&aacute;sa</li>\n<li>Adatb&aacute;zis implement&aacute;l&aacute;sa &eacute;s tesztel&eacute;se</li>\n<li>Sk&aacute;l&aacute;zhat&oacute; architekt&uacute;ra tervez&eacute;se</li>\n</ul>');

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

--
-- A tábla adatainak kiíratása `services`
--

INSERT INTO `services` (`ID`, `Title`, `Description`, `CategoryID`) VALUES
(15, 'Mechatronikai rendszerek tervezése', 'Szakembereink segítenek mechatronikai rendszerek tervezésében és optimalizálásában, hogy Ön hatékonyan kihasználhassa a modern technológia adta lehetőségeket.', 1),
(16, 'Gyártási folyamat optimalizálás', 'Szolgáltatásunk keretében segítünk optimalizálni a gyártási folyamatokat, hogy hatékonyabban és költséghatékonyabban működhessenek a berendezések és a munkaerő.', 1),
(17, 'Energiatakarékos rendszerek tervezése', 'Energiatakarékos rendszerek tervezésével és telepítésével foglalkozunk, hogy ügyfeleink csökkentsék az energiafogyasztást és környezetbarátabb megoldásokat alkalmazzanak.', 1),
(18, 'CAD modellezés és tervezés', 'Szakembereink segítségével pontos és hatékony CAD modelleket készítünk különböző gépészeti tervezési projektekhez, hogy megkönnyítsük a tervezési folyamatot és javítsuk a munka hatékonyságát.', 1),
(19, 'Reszponzív weboldal készítés', 'Professzionális webfejlesztő csapatunk segítségével reszponzív weboldalakat tervezünk és fejlesztünk, amelyek megfelelnek az Ön vállalkozásának igényeinek és a modern webes trendeknek.', 2),
(20, 'E-kereskedelmi platform fejlesztés', 'Az e-kereskedelmi platform fejlesztésében és testreszabásában több éves tapasztalattal rendelkező szakembereink segítenek, hogy online üzlete sikeres legyen és növelje az eladásokat.', 2),
(21, 'Webalkalmazás fejlesztés', 'Egyedi webalkalmazások fejlesztésével és implementálásával foglalkozunk, amelyek lehetővé teszik ügyfeleink számára, hogy hatékonyabban és hatékonyabban kezeljék az üzleti folyamataikat.', 2),
(22, 'SEO tanácsadás és optimalizálás', 'SEO szakértőink segítségével optimalizáljuk weboldalát, hogy jobban rangsorolja a keresőmotorokban, növelje az organikus forgalmat és javítsa az online láthatóságot.', 2),
(23, 'Egyedi szoftverfejlesztés', 'Egyedi szoftvermegoldásokat fejlesztünk különböző iparágak számára, hogy segítsünk optimalizálni az üzleti folyamatokat és növeljük a hatékonyságot.', 3),
(24, 'Mobilalkalmazás fejlesztés', 'Tapasztalt fejlesztőink segítségével mobilalkalmazásokat tervezünk és fejlesztünk iOS és Android platformokra, hogy megfeleljenek az ügyfelek elvárásainak és növeljék a felhasználói élményt.', 3),
(25, 'Adatbázis tervezés és kezelés', 'Adatbázis szakértőink segítenek az adatbázis tervezésében és kezelésében, hogy biztosítsuk az adatok hatékony tárolását, kezelését és biztonságát.', 3),
(26, 'Tesztelési és minőségellenőrzési szolgáltatások', 'Szakembereink segítségével tesztelési és minőségellenőrzési szolgáltatásokat nyújtunk, hogy biztosítsuk a szoftverek és alkalmazások magas minőségét és stabilitását.', 3);

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
(1, '', 'TechCraft Solutions Kft.', 'rg', 'rg', '', 'rg@tcs.hu', '$2b$08$qRHyBRBIhl30jeLD.ae94eSvGgi1xkPj0uanvIDPODju2HCK4HjRO', 'https://i.postimg.cc/SK2TYrVV/Profilepic.png', 3, ''),
(2, '', '', 'Kiss', 'Béla', '', 'admin@tcs.hu', '$2b$08$/lGIyxvBPMIo2y111Ro4LOyEQ1C1zlRzqDho6pvcY7KRsbS/.YovO', 'https://i.postimg.cc/SK2TYrVV/Profilepic.png', 2, ''),
(3, '', '', 'Kovács', 'Júlia', '', 'megrendelo@tcs.hu', '$2b$08$5KKQS4urR49gLDQnYFRMz.GsYRXsr0INPE.66U/1wHNlSqS8iqbae', 'https://i.postimg.cc/SK2TYrVV/Profilepic.png', 1, '');

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT a táblához `services`
--
ALTER TABLE `services`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
