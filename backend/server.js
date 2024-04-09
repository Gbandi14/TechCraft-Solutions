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

app.post("/register", async(req, res) => {
    const { username, companyname, firstname, lastname, phone, email, password } = req.body
    if (!firstname && !lastname && !email && !password) {
        return res.status(400).send("Hibás adatok!")
    }
    if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g.test(email)) {
        return res.status(400).send("Hibás email formátum!")
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    pool.query("INSERT INTO `users`(`Username`, `CompanyName`, `Firstname`, `Lastname`, `PhoneNumber`, `Email`, `Password`, `ProfilePicture`, `Rank`) VALUES ('"+username+"','"+companyname+"','"+firstname+"','"+lastname+"','"+phone+"','"+email+"','"+hashedPassword+"','https://i.postimg.cc/SK2TYrVV/Profilepic.png',1)", (error, results, fields) => {
        if (error) return res.status(500).send("Sikertelen regisztráció!")
        res.send("Sikeres regisztráció!")
    })
})

app.post("/login", async(req, res) => {
    const { email, password } = req.body
    if (!email && !password) {
        return res.status(400).send("Hibás adatok!")
    }

    pool.query("SELECT * FROM `users` WHERE Email = '"+email+"'", async (error, results, fields) => {
        if (error) return res.status(500).send("Sikertelen bejelentkezés!")
        if (results.length == 0) return res.status(400).send("Nem található felhasználó!")

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

app.post("/userupdate", verifyToken, async(req, res) => {
    const { username, companyname, firstname, lastname, phone, email } = req.body
    if (!firstname && !lastname && !email) {
        return res.status(400).send("Hibás adatok!")
    }
    if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g.test(email)) {
        return res.status(400).send("Hibás email formátum!")
    }

    pool.query("UPDATE `users` SET `Username`='"+username+"',`CompanyName`='"+companyname+"',`Firstname`='"+firstname+"',`Lastname`='"+lastname+"',`PhoneNumber`='"+phone+"',`Email`='"+email+"' WHERE email = '"+req.email+"';", (error, results, fields) => {
        if (error) return res.status(500).send("Hiba!")
        res.send("Sikeres profil módosítás!")
    })
})

app.get("/references", async(req, res) => {
    pool.query("SELECT * FROM `references`", (error, results, fields) => {
        if (error) return res.status(500).send("Hiba történt!")
        res.send(results)
    })
})

app.get("/reference-rating/:id", async(req, res) =>{
    pool.query("SELECT AVG(Score) as Score FROM `rating` WHERE ReferenceID = 1", (error, results, fields) => {
        if (error) return res.status(500).send("Hiba!")
        res.send(results[0])
    })
})

app.post("/reference", verifyToken, async(req, res) => {
    const { image, title, text } = req.body

    pool.query("SELECT * FROM users WHERE Email='"+req.email+"'", (error2, results2, fields2) => {
        if (error2 || results2.length == 0) return res.status(500).send("Hiba!")
        if (results2[0].Rank != 2) return res.status(401).send("Nincs jogod ehhez!")

        pool.query("INSERT INTO `references`(`Image`, `Title`, `Text`) VALUES ('"+image+"','"+title+"','"+text+"')", (error, results, fields) => {
            if (error) return res.status(500).send("Hiba!")
            res.send("Sikeres referencia felvétel!")
        })
    })
})

app.patch("/reference", verifyToken, async(req, res) => {
    const { image, title, text, id } = req.body

    pool.query("SELECT * FROM users WHERE Email='"+req.email+"'", (error2, results2, fields2) => {
        if (error2 || results2.length == 0) return res.status(500).send("Hiba!")
        if (results2[0].Rank != 2) return res.status(401).send("Nincs jogod ehhez!")

        pool.query("UPDATE `references` SET `Image`='"+image+"',`Title`='"+title+"',`Text`='"+text.replaceAll("'", '"')+"' WHERE ID='"+id+"'", (error, results, fields) => {
            if (error) return res.status(500).send("Hiba!")
            res.send("Sikeres referencia módosítás!")
        })
    })
})

app.delete("/reference/:id", verifyToken, async(req, res) => {
    pool.query("SELECT * FROM users WHERE Email='"+req.email+"'", (error2, results2, fields2) => {
        if (error2 || results2.length == 0) return res.status(500).send("Hiba!")
        if (results2[0].Rank != 2) return res.status(401).send("Nincs jogod ehhez!")

        pool.query("DELETE FROM `references` WHERE ID=" + req.params.id, (error, results, fields) => {
            if (error) return res.status(500).send("Hiba!")
            res.send("Sikeres referencia törlés!")
        })
    })
})

app.get("/services", verifyToken, async(req, res) => {
    pool.query("SELECT categories.ID as categoryId, categories.Title as categoryTitle, services.ID as serviceId, services.Title as serviceTitle, services.Description as serviceDescription  FROM `categories` INNER JOIN `services` ON `services`.`CategoryID` = `categories`.`ID`", (error, results, fields) => {
        if (error) return res.status(500).send("Hiba történt!")
        res.send(results)
    })
})

app.post("/sendrate", verifyToken, async(req, res) => {
    const { id, comment, star } = req.body

    pool.query("SELECT ID FROM users WHERE Email = '"+req.email+"'", (error, results, fields) => {
        if (error || results.length == 0) return res.status(500).send("Hiba!")

        pool.query("INSERT INTO `rating`(`UserID`, `ReferenceID`, `Score`, `Text`) VALUES ('"+results[0].ID+"','"+id+"','"+star+"','"+comment+"')", (error2, results2, fields2) => {
            if (error2) return res.status(500).send("Hiba!")
            res.send("Értékelés elküldve!")
        })
    })
})

app.post("/sendoffer", verifyToken, async(req, res) => {
    const { id, comment } = req.body

    pool.query("SELECT ID FROM users WHERE Email = '"+req.email+"'", (error, results, fields) => {
        if (error || results.length == 0) return res.status(500).send("Hiba!")

        pool.query("INSERT INTO `offer`(`UserID`, `ServiceID`, `Description`, `Type`) VALUES ('"+results[0].ID+"','"+id+"','"+comment+"',1)", (error2, results2, fields2) => {
            if (error2) return res.status(500).send("Hiba!")
            res.send("Ajánlatkérés elküldve!")
        })
    })
})

app.get("/user-search/:name", verifyToken, async(req, res) => {
    pool.query("SELECT * FROM users WHERE Email='"+req.email+"'", (error2, results2, fields2) => {
        if (error2 || results2.length == 0) return res.status(500).send("Hiba!")
        if (results2[0].Rank != 2) return res.status(401).send("Nincs jogod ehhez!")

        pool.query("SELECT * FROM users WHERE Firstname='"+req.params.name.split(" ")[0]+"' AND Lastname='"+req.params.name.split(" ")[1]+"'", (error, results, fields) => {
            if (error) return res.status(500).send("Hiba!")
            res.send(results[0])
        })
    })
})

app.patch("/user-data", verifyToken, async(req, res) => {
    const {id, rank, email} = req.body

    pool.query("SELECT * FROM users WHERE Email='"+req.email+"'", (error2, results2, fields2) => {
        if (error2 || results2.length == 0) return res.status(500).send("Hiba!")
        if (results2[0].Rank != 2) return res.status(401).send("Nincs jogod ehhez!")

        pool.query("UPDATE `users` SET `Email`='"+email+"',`Rank`='"+rank+"' WHERE ID="+id, (error, results, fields) => {
            if (error) return res.status(500).send("Hiba!")
            res.send("Sikeres profil módosítás!")
        })
    })
})

app.delete("/user-data/:id", verifyToken, async(req, res) => {
    pool.query("SELECT * FROM users WHERE Email='"+req.email+"'", (error2, results2, fields2) => {
        if (error2 || results2.length == 0) return res.status(500).send("Hiba!")
        if (results2[0].Rank != 2) return res.status(401).send("Nincs jogod ehhez!")

        pool.query("DELETE FROM `users` WHERE ID=" + req.params.id, (error, results, fields) => {
            if (error) return res.status(500).send("Hiba!")
            res.send("Sikeres profil törlés!")
        })
    })
})

app.get('/categories', async(req, res) => {
    pool.query("SELECT * FROM categories", (error, results, fields) => {
        if (error) return res.status(500).send("Hiba!")
        res.send(results)
    })
})

app.patch("/categories", verifyToken, async(req, res) => {
    const { id, title, text } = req.body
    pool.query("SELECT * FROM users WHERE Email='"+req.email+"'", (error2, results2, fields2) => {
        if (error2 || results2.length == 0) return res.status(500).send("Hiba!")
        if (results2[0].Rank != 2) return res.status(401).send("Nincs jogod ehhez!")

        pool.query("UPDATE `categories` SET `Title`='"+title+"',`Text`='"+text+"' WHERE ID='"+id+"'", (error, results, fields) => {
            if (error) return res.status(500).send("Hiba!")
            res.send("")
        })
    })
})

app.listen(port, (error) => {
    if (error) {
        throw console.error(error)
    }
    console.log("A szerver elindult!")
})