const express = require('express');
const http = require("http");
const app = express();
const server = http.createServer(app);
const argon2 = require('argon2');
const jwt = require("jsonwebtoken");
// Connect to MongoDB
const mongoose = require('mongoose');
require('dotenv').config({ path: "../.env" })
mongoose.connect(process.env.REACT_APP_mongoAtlas).then(() => console.log('Connected To MongoDB')).catch((err) => { console.error(err); });
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
const Categories = require("./models/Categories");                          // Categories

// Create first admin account
Accounts.findOne({ username: "admin" }).then(async (res1) => {
    if (!res1) {
        const hashPassword = await argon2.hash(process.env.REACT_APP_firstAdminPassword);
        const firstAdmin = new Accounts({
            username: "admin",
            password: hashPassword,
            role: 1
        })
        firstAdmin.save()
    }
})

// Api
// Accounts Api
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
    const res1 = await Accounts.find(req.query.search && req.query.search !== "" ? { username: { $in: new RegExp(req.query.search, 'i') } } : {}).sort({ createdAt: -1 })
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const start = (page - 1) * limit
    const end = page * limit

    const results = {}
    results.total = res1.length
    results.pageCount = Math.ceil(res1.length / limit)

    if (end < res1.length) {
        results.next = {
            page: page + 1
        }
    }
    if (start > 0) {
        results.prev = {
            page: page - 1
        }
    }

    results.result = res1.slice(start, end)
    res.status(201).send({ results });
})



// Categories Api
app.get("/api/v1/getCategories", async (req, res) => {
    const res1 = await Categories.find(req.query.search && req.query.search !== "" ? { title: new RegExp(req.query.search, 'i') } : {}).sort({ createdAt: -1 })
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const start = (page - 1) * limit
    const end = page * limit

    const results = {}
    results.total = res1.length
    results.pageCount = Math.ceil(res1.length / limit)

    if (end < res1.length) {
        results.next = {
            page: page + 1
        }
    }
    if (start > 0) {
        results.prev = {
            page: page - 1
        }
    }

    results.result = res1.slice(start, end)
    res.status(201).send({ results });
})

app.get("/api/v1/getAllCategories", async (req, res) => {
    await Categories.find({}).then((res1) => {
        res.status(201).send(res1)
    })
})

app.post("/api/v1/addCategories", (req, res) => {
    Categories.findOne({ title: req.body.title }).then(async (res1) => {
        if (res1) {
            res.status(500).send({ message: "Danh mục đã tồn tại!" })
        } else {
            const addCategories = new Categories({
                title: req.body.title,
                content: req.body.content
            })
            addCategories.save().then(() => {
                res.status(201).send({ message: "Tạo danh mục thành công!" })
            })
        }
    })
})

app.post("/api/v1/deleteCategories", (req, res) => {
    Categories.deleteOne({ title: req.body.title }).then(() => {
        res.status(201).send({ message: "Xóa danh mục thành công!" })
    }).catch(() => {
        res.status(500).send({ message: "Xóa danh mục thất bại!" })
    })
})



// Movies Api
app.post("/api/v1/addMovies", (req, res) => {
    const newMovies = new Movies({
        title: req.body.movie.title,
        subtitle: req.body.movie.original_title,
        content: req.body.movie.overview,
        "banner.vertical": `https://image.tmdb.org/t/p/original${req.body.movie.poster_path}`,
        "banner.horizontal": `https://image.tmdb.org/t/p/original${req.body.movie.backdrop_path}`,
        imdbScore: req.body.movie.vote_average.toFixed(1),
        time: req.body.movie.runtime,
        timeProduce: req.body.movie.release_date,
        "crew.directors": req.body.crew.director,
        "crew.stars": req.body.crew.stars,
        "crew.screenWriters": req.body.crew.screenWriters,
        trailerSource: req.body.trailerSource,
        filmSources: req.body.filmSources,
        totalEps: req.body.totalEps,
        ageRate: req.body.ageRate,
        note: req.body.note,
        category: req.body.category
    })
    newMovies.save().then(() => {
        res.status(201).send({ message: "Thêm phim thành công!" })
    }).catch(() => {
        res.status(500).send({ message: "Thêm phim thất bại!" })
    })
})

app.get("/api/v1/getMovies", async (req, res) => {
    const res1 = await Movies.find(req.query.search && req.query.search !== "" ? { title: new RegExp(req.query.search, 'i') } : {}).sort({ createdAt: -1 })
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const start = (page - 1) * limit
    const end = page * limit

    const results = {}
    results.total = res1.length
    results.pageCount = Math.ceil(res1.length / limit)

    if (end < res1.length) {
        results.next = {
            page: page + 1
        }
    }
    if (start > 0) {
        results.prev = {
            page: page - 1
        }
    }

    results.result = res1.slice(start, end)
    res.status(201).send({ results });
})

app.get("/api/v1/getMoviesHomepage", async (req, res) => {
    const heroBanner = await Movies.find({}).sort({ _id: -1 }).limit(6)
    const newFilm = await Movies.find({}).sort({ createdAt: -1 }).limit(10)
    const mostViewFilm = await Movies.find({}).sort({ view: -1 }).limit(10)
    const animeFilm = await Movies.find({ category: "Anime" }).limit(10)
    const tvShowFilm = await Movies.find({ category: "TV Show" }).limit(10)
    const upcomingFilm = await Movies.find({ category: "Upcoming" }).limit(10)
    res.status(201).send({ heroBanner, newFilm, mostViewFilm, animeFilm, tvShowFilm, upcomingFilm })
})

app.get("/api/v1/getMoviesIn4", async (req, res) => {
    const movies = await Movies.findOne({ subtitle: req.query.subtitle })
    const similarMovies = await Movies.find({ category: { $in: movies.category } }).limit(10)
    res.status(201).send({ movies, similarMovies })
})

app.post("/api/v1/deleteMovies", (req, res) => {
    Movies.deleteOne({ title: req.body.title }).then(() => {
        res.status(201).send({ message: "Xóa phim thành công!" })
    }).catch(() => {
        res.status(500).send({ message: "Xóa phim thất bại!" })
    })
})

app.post("/api/v1/updateMovies", (req, res) => {
    Movies.updateOne({ title: req.body.update.title }, {
        trailerSource: req.body.update.trailerSource,
        filmSources: req.body.update.filmSources,
        totalEps: req.body.update.totalEps,
        ageRate: req.body.update.ageRate,
        note: req.body.update.note,
        category: req.body.update.category
    }).then(() => {
        res.status(201).send({ message: "Cập nhật phim thành công!" })
    }).catch(() => {
        res.status(500).send({ message: "Cập nhật phim thất bại!" })
    })
})

app.post("/api/v1/countMoviesView", (req, res) => {
    Movies.updateOne({ subtitle: req.body.subtitle }, {
        $inc: { view: 1 }
    }).then(() => {
        res.status(201).send({ message: "View + 1" })
    })
})