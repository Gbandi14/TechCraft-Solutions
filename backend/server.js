const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const rndstr = require("rndstr")
const multer = require("multer")
const path = require("path")
require("dotenv").config()

const avatarStorage = multer.diskStorage({ destination: 'avatars/', filename: function(req, file, cb) {
    cb(null, `${rndstr({ length: 32 })}-${Date.now()}${path.extname(file.originalname)}`);
}});

const uploadAvatar = multer({ storage: avatarStorage });

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
});


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

app.post("/register", (req, res) => {
    const { username, companyname, firstname, lastname, phone, email, password } = req.body
    if (!firstname && !lastname && !email && !password) {
        return res.status(400).send("Hibás adatok!")
    }
    if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g.test(email)) {
        return res.status(400).send("Hibás email formátum!")
    }

    pool.query("SELECT * FROM users WHERE Email='" + email + "'", async (error2, results2, fields2) => {
        if (results2.length > 0) return res.status(400).send("Az email cím foglalt!")

        const hashedPassword = await bcrypt.hash(password, 8)
        const verifyToken = rndstr({ length: 256 })

        pool.query("INSERT INTO `users`(`Username`, `CompanyName`, `Firstname`, `Lastname`, `PhoneNumber`, `Email`, `Password`, `ProfilePicture`, `Rank`, `VerifyToken`) VALUES ('"+username+"','"+companyname+"','"+firstname+"','"+lastname+"','"+phone+"','"+email+"','"+hashedPassword+"','https://i.postimg.cc/SK2TYrVV/Profilepic.png',1,'"+verifyToken+"')", async(error, results, fields) => {
            if (error) return res.status(500).send("Sikertelen regisztráció!")

            await transporter.sendMail({
                from: '"TechCraft Solutions" <' + process.env.EMAIL + '>',
                to: email,
                subject: "Sikeres regisztráció!",
                html: `
                    <h2>Üdvözlünk az oldalon!</h2>
                    <p>Utolsó lépésként kérlek hitelesítsd az email címedet!</p>
                    <a href="http://localhost:8000/verifytoken/${verifyToken}">Email cím megerősítése</a>
                `,
            });

            res.send("Sikeres regisztráció!")
        })
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

app.post("/userupdate", verifyToken, uploadAvatar.single("new-avatar"), async(req, res) => {
    const { username, companyname, firstname, lastname, phone, email } = req.body
    const file = req.file;

    if (!firstname && !lastname && !email) {
        return res.status(400).send("Hibás adatok!")
    }
    if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g.test(email)) {
        return res.status(400).send("Hibás email formátum!")
    }

    pool.query("SELECT Email FROM users WHERE Email='"+req.email+"'", (e, r, f) =>{
        if (e) return res.status(500).send("Hiba!")
        let token = false
        if (r[0].Email != email) {
            token = rndstr({ length: 256 })
        }

        pool.query("UPDATE `users` SET `Username`='"+username+"',`CompanyName`='"+companyname+"',`Firstname`='"+firstname+"',`Lastname`='"+lastname+"',`PhoneNumber`='"+phone+"',`Email`='"+email+"'"+ (token ? ",`VerifyToken`='"+token+"'" : "") + (file ? ",`ProfilePicture`='/avatars/" + file.filename + "'" : '')+" WHERE Email = '"+req.email+"';", async(error, results, fields) => {
            console.log(error)
            if (error) return res.status(500).send("Hiba!")

            if (token) {
                await transporter.sendMail({
                    from: '"TechCraft Solutions" <' + process.env.EMAIL + '>',
                    to: email,
                    subject: "Sikeres email módosítás!",
                    html: `
                        <h2>A ${username} felhasználó emailje módosítva lett erre a címre!</h2>
                        <p>Kérlek hitelesítsd az email címedet!</p>
                        <p>http://localhost:8000/verifytoken/${token}</p>
                    `,
                });
            }

            res.send("Sikeres profil módosítás!")
        })
    })
})

app.get("/verifytoken/:token", async(req, res) => {
    const { token } = req.params

    pool.query("SELECT * FROM users WHERE VerifyToken='"+token+"'", (error, results, fields) => {
        if (error) return res.status(500).send("Hiba!")
        if (results.length === 0)
        {
            return res.status(400).send(`
                <script src="https://cdn.tailwindcss.com"></script>
                <div class='text-white flex-col w-screen h-screen bg-[#2a3952] flex items-center justify-center'>
                    <p>Hibás token!</p>
                    <br>
                    <a href='http://localhost:3000' class='px-3 py-1.5 text-sm rounded-lg bg-[#0F1035]/100 hover:bg-[#0F1035]/75 transition-colors mt-3'>Főoldal megnyitása</a>
                </div>
            `)
        }

        pool.query("UPDATE users SET `VerifyToken`='' WHERE VerifyToken='"+token+"'", (error2, results2, fields2) => {
            if (error2) return res.status(500).send("Hiba!")
            res.send(`
                <script src="https://cdn.tailwindcss.com"></script>
                <div class='text-white flex-col w-screen h-screen bg-[#2a3952] flex items-center justify-center'>
                    <p>Sikeres email hitelesítés!</p>
                    <br>
                    <a href='http://localhost:3000' class='px-3 py-1.5 text-sm rounded-lg bg-[#0F1035]/100 hover:bg-[#0F1035]/75 transition-colors mt-3'>Főoldal megnyitása</a>
                </div>
            `)
        })
    })
})

app.get("/references", async(req, res) => {
    pool.query("SELECT * FROM `references`", (error, results, fields) => {
        if (error) return res.status(500).send("Hiba történt!")
        res.send(results)
    })
})

app.get("/reference-rating/:id", async(req, res) =>{
    pool.query("SELECT AVG(Score) as Score FROM `rating` WHERE ReferenceID = " + req.params.id, (error, results, fields) => {
        if (error) return res.status(500).send("Hiba!")
        res.send(results[0])
    })
})

app.post("/reference", verifyToken, async(req, res) => {
    const { image, title, text } = req.body

    pool.query("SELECT * FROM users WHERE Email='"+req.email+"'", (error2, results2, fields2) => {
        if (error2 || results2.length == 0) return res.status(500).send("Hiba!")
        if (results2[0].Rank < 2) return res.status(401).send("Nincs jogod ehhez!")

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
        if (results2[0].Rank < 2) return res.status(401).send("Nincs jogod ehhez!")

        pool.query("UPDATE `references` SET `Image`='"+image+"',`Title`='"+title+"',`Text`='"+text.replaceAll("'", '"')+"' WHERE ID='"+id+"'", (error, results, fields) => {
            if (error) return res.status(500).send("Hiba!")
            res.send("Sikeres referencia módosítás!")
        })
    })
})

app.delete("/reference/:id", verifyToken, async(req, res) => {
    pool.query("SELECT * FROM users WHERE Email='"+req.email+"'", (error2, results2, fields2) => {
        if (error2 || results2.length == 0) return res.status(500).send("Hiba!")
        if (results2[0].Rank < 2) return res.status(401).send("Nincs jogod ehhez!")

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

app.post("/services", verifyToken, async(req, res) => {
    const { title, description, categoryId } = req.body

    pool.query("SELECT * FROM users WHERE Email='"+req.email+"'", (error2, results2, fields2) => {
        if (error2 || results2.length == 0) return res.status(500).send("Hiba!")
        if (results2[0].Rank < 2) return res.status(401).send("Nincs jogod ehhez!")

        pool.query("INSERT INTO `services`(`Title`, `Description`, `CategoryID`) VALUES ('"+title+"','"+description+"','"+categoryId+"')", (error, results, fields) => {
            console.log(error)
            console.log(title, description, categoryId)
            if (error) return res.status(500).send("Hiba történt!")
            res.send("Sikeres kategória felvétel!")
        })
    
    })
})

app.patch("/services", verifyToken, async(req, res) => {
    const { id, title, description, categoryId } = req.body

    pool.query("SELECT * FROM users WHERE Email='"+req.email+"'", (error2, results2, fields2) => {
        if (error2 || results2.length == 0) return res.status(500).send("Hiba!")
        if (results2[0].Rank < 2) return res.status(401).send("Nincs jogod ehhez!")

        pool.query("UPDATE `services` SET `Title`='"+title+"',`Description`='"+description+"',`CategoryID`='"+categoryId+"' WHERE ID=" + id, (error, results, fields) => {
            if (error) return res.status(500).send("Hiba történt!")
            res.send("Sikeres kategória módosítás!")
        })

    })
})

app.delete("/services/:id", verifyToken, async(req, res) => {
    pool.query("SELECT * FROM users WHERE Email='"+req.email+"'", (error2, results2, fields2) => {
        if (error2 || results2.length == 0) return res.status(500).send("Hiba!")
        if (results2[0].Rank < 2) return res.status(401).send("Nincs jogod ehhez!")

        pool.query("DELETE FROM `services` WHERE ID='"+req.params.id+"'", (error, results, fields) => {
            if (error) return res.status(500).send("Hiba történt!")
            res.send("Sikeres kategória törlés!")
        })
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

app.get("/offers", verifyToken, async(req, res) => {
    pool.query("SELECT * FROM users WHERE Email='"+req.email+"'", (error2, results2, fields2) => {
        if (error2 || results2.length == 0) return res.status(500).send("Hiba!")
        if (results2[0].Rank < 2) return res.status(401).send("Nincs jogod ehhez!")

        pool.query("SELECT offer.UserID as `UserID`, offer.ServiceID as `ServiceID`, offer.Type as `Type`, offer.Description as `Description`, users.Username as `Username`, users.Firstname as `Firstname`, users.Lastname as `Lastname`, users.Email as `Email`, users.ProfilePicture as `ProfilePicture`, services.Title as `ServiceTitle`, categories.Title as `CategoryTitle` FROM `offer` INNER JOIN users ON users.ID = offer.UserID INNER JOIN services ON services.ID = offer.ServiceID INNER JOIN categories ON categories.ID = services.CategoryID", (error, results, fields) => {
            if (error) return res.status(500).send("Hiba!")
            res.send(results)
        })
    })
})

app.post("/sendoffer", verifyToken, async(req, res) => {
    const { id, comment } = req.body

    pool.query("SELECT ID FROM users WHERE Email = '"+req.email+"'", (error, results, fields) => {
        if (error || results.length == 0) return res.status(500).send("Hiba!")

        pool.query("INSERT INTO `offer`(`UserID`, `ServiceID`, `Description`, `Type`) VALUES ('"+results[0].ID+"','"+id+"','"+comment+"',1)", async (error2, results2, fields2) => {
            if (error2) return res.status(500).send("Hiba!")

            await transporter.sendMail({
                from: '"TechCraft Solutions" <' + process.env.EMAIL + '>',
                to: req.email,
                subject: "Sikeres rendelés",
                html: `
                    <h2>Sikeres rendelés</h2>
                    <p>Köszönjük, hogy minket választ! Hamarosan értesítjük emailben a további információkkal kapcsolatban!</p>
                `,
            });

            res.send("Ajánlatkérés elküldve! További információkat a megadott Email címén találja.")
        })
    })
})

app.get("/user-search/:name", verifyToken, async(req, res) => {
    pool.query("SELECT * FROM users WHERE Email='"+req.email+"'", (error2, results2, fields2) => {
        if (error2 || results2.length == 0) return res.status(500).send("Hiba!")
        if (results2[0].Rank < 2) return res.status(401).send("Nincs jogod ehhez!")

        pool.query("SELECT * FROM users WHERE Firstname='"+req.params.name.split(" ")[0]+"' AND Lastname='"+req.params.name.split(" ")[1]+"'", (error, results, fields) => {
            if (req.email == results[0].Email) return res.status(400).send("A saját adataidat nem módosíthatod!")
            if (error) return res.status(500).send("Hiba!")
            res.send(results[0])
        })
    })
})

app.patch("/user-data", verifyToken, async(req, res) => {
    const {id, rank, email} = req.body

    pool.query("SELECT * FROM users WHERE Email='"+req.email+"'", (error2, results2, fields2) => {
        if (error2 || results2.length == 0) return res.status(500).send("Hiba!")
        if (results2[0].Rank < 2) return res.status(401).send("Nincs jogod ehhez!")

        pool.query("SELECT * FROM users WHERE ID='"+id+"'", (error3, results3, fields3) => {
            if (error3) return res.status(500).send("Hiba!")
            if (rank != results3[0].Rank && results2[0].Rank != 3) return res.status(401).send("Felhasználó rang módosítás csak Rendszergazdai jogosultsággal elérhető!")

            pool.query("UPDATE `users` SET `Email`='"+email+"',`Rank`='"+rank+"' WHERE ID="+id, (error, results, fields) => {
                if (error) return res.status(500).send("Hiba!")
                res.send("Sikeres profil módosítás!")
            })
        })
    })
})

app.delete("/user-data/:id", verifyToken, async(req, res) => {
    pool.query("SELECT * FROM users WHERE Email='"+req.email+"'", (error2, results2, fields2) => {
        if (error2 || results2.length == 0) return res.status(500).send("Hiba!")
        if (results2[0].Rank < 2) return res.status(401).send("Nincs jogod ehhez!")

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
        if (results2[0].Rank < 2) return res.status(401).send("Nincs jogod ehhez!")

        pool.query("UPDATE `categories` SET `Title`='"+title+"',`Text`='"+text+"' WHERE ID='"+id+"'", (error, results, fields) => {
            if (error) return res.status(500).send("Hiba!")
            res.send("")
        })
    })
})

app.post("/offer-end", verifyToken, async(req, res) => {
    const { userId, serviceId, email, description } = req.body

    pool.query("SELECT * FROM users WHERE Email='"+req.email+"'", async(error2, results2, fields2) => {
        if (error2 || results2.length == 0) return res.status(500).send("Hiba!")
        if (results2[0].Rank < 2) return res.status(401).send("Nincs jogod ehhez!")

        await transporter.sendMail({
            from: '"TechCraft Solutions" <' + process.env.EMAIL + '>',
            to: email,
            subject: "Rendelését lezártuk",
            html: `
                <h2>Rendelését lezártuk</h2>
                <p>Köszönjük, hogy minket választott!</p>
                <p>Megjegyzés: ${description}</p>
            `,
        });

        pool.query("UPDATE `offer` SET `Type`=2 WHERE UserID='"+userId+"' AND ServiceID='"+serviceId+"'", (error, results, fields) => {
            console.log(email, description)
            res.send('Email elküldve a felhasználó email címére!')
        })
    })
})

app.get("/get-file/:fileName", async(req, res) => {
    res.sendFile(`${path.resolve()}/avatars/${req.params.fileName}`);
})

app.listen(port, (error) => {
    if (error) {
        throw console.error(error)
    }
    console.log("A szerver elindult!")
})





