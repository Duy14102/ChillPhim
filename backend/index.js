const express = require('express');
const http = require("http");
const app = express();
const server = http.createServer(app);
const argon2 = require('argon2');
const jwt = require("jsonwebtoken");
// Connect to MongoDB
const mongoose = require('mongoose');
require('dotenv').config({ path: "../.env" })
mongoose.connect(process.env.REACT_APP_mongoCompass).then(() => console.log('Connected To MongoDB')).catch((err) => { console.error(err); });
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(express.json());
app.use(cors());

server.listen(3000);

// Model
const Movies = require("./models/Movies");                             // Movies
const getMovies = mongoose.model("Movies");
const Accounts = require("./models/Accounts");
const getAccounts = mongoose.model("Accounts");                        // Accounts

// Create first admin account
getAccounts.findOne({ username: "admin" }).catch(async () => {
    const hashPassword = await argon2.hash(process.env.REACT_APP_firstAdminPassword);
    const firstAdmin = new Accounts({
        username: "admin",
        password: hashPassword
    })
    firstAdmin.save()
})

// Api
app.post("/api/v1/adminLogin", async (req, res) => {
    await getAccounts.findOne({ username: req.body.username }).then(async (res1) => {
        const verifyPassword = await argon2.verify(res1.password, req.body.password)
        if (verifyPassword) {
            const token = jwt.sign(
                {
                    id: res1._id,
                    username: res1.username
                },
                "RANDOM-TOKEN",
                { expiresIn: "24h" }
            )
            res.status(201).send({
                message: "Đăng nhập thành công!",
                token
            })
        } else {
            res.status(500).send({ message: "Mật khẩu không trùng khớp!" })
        }
    }).catch(() => {
        res.status(500).send({ message: "Tài khoản không tồn tại!" })
    })
})