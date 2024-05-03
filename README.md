# TechCraft-Solutions

A weboldal frontendje CRA (create-react-app) keretrendszerben írodott, az oldal backendje pedig az express nevű node modullal készült.

## Környezeti változók - .env

```dotenv
PORT=<port>
DBHOST=<Adatbázis kiszolgáló neve>
DBUSER=<Felhasználónév>
DBPASSWORD=<Felhasználó jelszó>
DBNAME=<Adatbázis neve>
ACCESS_SECRET=<JWT access tokenhez szükséges token>
```

Nodemailer kiszolgálására létrehozott email adatai

```dotenv
EMAIL=<Email cím>
PASSWORD=<API jelszó>
```

## Adatbázisok

A projekt két adatbázist tartalmaz, ezen adatbázisok használhatók, legalább az egyik beimportálása ajánlott.

### techcraft_solutions.sql - üres adatbázis

Az üres adatbázishoz tartozó rendszergazdai felhasználó adatai:

* **Email:** rg@tcs.hu
* **Jelszó:** Admin123

### techcraft_solutions_datas.sql - adatbázis adatokkal

Az adatokkal feltöltött adatbázishoz tartozó felhasználói adatok:

Rendszergazda:

* **Email:** rg@tcs.hu
* **Jelszó:** Admin123

Admin:

* **Email:** admin@tcs.hu
* **Jelszó:** Admin123

Megrendelő:

* **Email:** megrendelo@tcs.hu
* **Jelszó:** Admin123

## Telepítési útmutató

A telepítés előtt töltsük le, klónozzuk a forráskódot a github oldalról.

```bash
git clone https://github.com/Gbandi14/TechCraft-Solutions.git
```

### Frontend letöltése

```bash
cd frontend
npm install
npm run build
npx serve
npm start
```

### Backend letöltése

```bash
cd backend
npm install
npm run start
npm run dev
```
