const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const cookieParser = require("cookie-parser")
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

app.get("/references", async(req, res) => {
    pool.query("SELECT * FROM `references`", (error, results, fields) => {
        if (error) return res.status(500).send("Hiba történt!")
        res.send(results)
    })
})

app.listen(port, (error) => {
    if (error) {
        throw console.error(error)
    }
    console.log("A szerver elindult!")
})