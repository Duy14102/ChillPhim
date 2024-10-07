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
const Movies = require("./models/Movies");                                  // Movies
const Accounts = require("./models/Accounts");                              // Accounts

// Create first admin account
Accounts.findOne({ username: "admin" }).catch(async () => {
    const hashPassword = await argon2.hash(process.env.REACT_APP_firstAdminPassword);
    const firstAdmin = new Accounts({
        username: "admin",
        password: hashPassword,
        role: 1
    })
    firstAdmin.save()
})

// Api
app.post("/api/v1/adminLogin", (req, res) => {
    Accounts.findOne({ username: req.body.username }).then(async (res1) => {
        const verifyPassword = await argon2.verify(res1.password, req.body.password)
        if (verifyPassword) {
            const token = jwt.sign(
                {
                    username: res1.username,
                    role: res1.role
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

app.post("/api/v1/changePassword", (req, res) => {
    Accounts.findOne({ username: req.body.username }).then(async (res1) => {
        const verifyPassword = await argon2.verify(res1.password, req.body.oldPassword)
        if (verifyPassword) {
            const hashPassword = await argon2.hash(req.body.newPassword);
            Accounts.updateOne({ username: req.body.username }, {
                password: hashPassword
            }).exec()
            res.status(201).send({ message: "Đổi mật khẩu thành công!" })
        } else {
            res.status(500).send({ message: "Mật khẩu cũ không trùng khớp!" })
        }
    })
})

app.post("/api/v1/addAccount", (req, res) => {
    Accounts.findOne({ username: req.body.username }).then(async (res1) => {
        if (res1) {
            res.status(500).send({ message: "Tài khoản đã tồn tại!" })
        } else {
            const hashPassword = await argon2.hash(req.body.password);
            const addAdmin = new Accounts({
                username: req.body.username,
                password: hashPassword,
                role: 2
            })
            addAdmin.save().then(() => {
                res.status(201).send({ message: "Thêm admin thành công!" })
            })
        }
    })
})

app.post("/api/v1/deleteAccount", (req, res) => {
    Accounts.deleteOne({ username: req.body.username }).then(() => {
        res.status(201).send({ message: "Xóa tài khoản thành công!" })
    }).catch(() => {
        res.status(500).send({ message: "Xóa tài khoản thất bại!" })
    })
})

app.get("/api/v1/getAccounts", async (req, res) => {
    await Accounts.find({ username: { $ne: "admin" } }).then((res1) => {
        res.status(201).send(res1)
    })
})