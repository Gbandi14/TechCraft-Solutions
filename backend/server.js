const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()


const app = express()
const port = process.env.PORT
const pool = mysql.createPool({
    host:process.env.DBHOST,
    user:process.env.DBUSER,
    password:process.env.DBPASSWORD,
    database:process.env.DBNAME,
    connectionLimit:10
})

app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(express.json())
app.use(cookieParser())

async function verifyToken(req, res, next) {
    try {
        const header = req.headers["authorization"]
        const token = header && header.split(" ")[1]
        if (!token) return res.status(403).send("Nincs jogod a tartalom lekérdezéséhez!")
        jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
            if (err) return res.status(403).send("Nincs jogod a tartalom lekérdezéséhez!")
            req.email = decoded.email
            next()
        })
    } catch (error) {
        res.status(500).send("Szerver hiba!")
    }
}

app.get("/references", async(req, res) => {
    pool.query("SELECT * FROM `references`", (error, results, fields) => {
        if (error) return res.status(500).send("Hiba történt!")
        res.send(results)
    })
})

app.post("/register", async(req, res) => {
    const { username, companyname, firstname, lastname, phone, email, password } = req.body
    if (!firstname && !lastname && !email && !password) {
        return res.status(400).send("Hibás adatok!")
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    pool.query("INSERT INTO `users`(`Username`, `CompanyName`, `Firstname`, `Lastname`, `PhoneNumber`, `Email`, `Password`, `ProfilePicture`, `Rank`) VALUES ('"+username+"','"+companyname+"','"+firstname+"','"+lastname+"','"+phone+"','"+email+"','"+hashedPassword+"','dummy.png',1)", (error, results, fields) => {
        if (error) return res.status(500).send("Sikertelen regisztráció!")
        res.send("Sikeres regisztráció!")
    })
})

app.post("/login", async(req, res) => {
    const { email, password} = req.body
    if (!email && !password) {
        return res.status(400).send("Hibás adatok!")
    }

    pool.query("SELECT * FROM `users` WHERE Email = '"+email+"'", async (error, results, fields) => {
        if (error) return res.status(500).send("Sikertelen bejelentkezés!")
        const passMatch = await bcrypt.compare(password, results[0].Password)
        if (!passMatch) return res.status(400).send("Hibás jelszó!")
        const accessToken = jwt.sign({ email:results[0].Email }, process.env.ACCESS_SECRET, { expiresIn:"7d" })
        

        res.send({ msg:"Sikeres regisztráció!", token:accessToken })
    })

})

app.get("/userdata", verifyToken, async(req, res) => {
    pool.query("SELECT `ID`, `Username`, `CompanyName`, `Firstname`, `Lastname`, `PhoneNumber`, `Email`, `ProfilePicture`, `Rank` FROM `users` WHERE Email = '"+req.email+"'", (error, results, fields) => {
        if (error) return res.status(500).send("Hiba!")
        res.send(results[0])
    })
})

app.listen(port, (error) => {
    if (error) {
        throw console.error(error)
    }
    console.log("A szerver elindult!")
})